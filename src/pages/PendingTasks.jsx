import React, { useEffect, useState } from 'react';
import { useTasks } from '../hooks/useTasks';
import TaskFilter from '../components/tasks/TaskFilter';
import TaskList from '../components/tasks/TaskList';
import TaskForm from '../components/tasks/TaskForm';
import ConfirmDialog from '../components/common/ConfirmDialog';
import Button from '../components/common/Button';
import { Plus } from 'lucide-react';

export default function PendingTasks() {
  const {
    filteredTasks,
    loading,
    searchQuery,
    setSearchQuery,
    setActiveFilter,
    addTask,
    editTask,
    removeTask,
    toggleTaskStatus,
  } = useTasks();

  useEffect(() => {
    setActiveFilter('pending');
  }, [setActiveFilter]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [deletingTask, setDeletingTask] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOpenAdd = () => {
    setEditingTask(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingTask(null);
  };

  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      if (editingTask) {
        await editTask(editingTask.id, formData);
      } else {
        await addTask(formData);
      }
      handleCloseForm();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deletingTask) return;
    setIsSubmitting(true);
    try {
      await removeTask(deletingTask.id);
      setDeletingTask(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section className="tasks-section" aria-label="Pending Tasks">
        <div className="tasks-section__header">
          <div className="tasks-section__title-group">
            <h2 className="tasks-section__title">PENDING TASKS</h2>
            <span className="tasks-section__count-badge" style={{ backgroundColor: 'var(--color-purple)' }}>
              {filteredTasks.length} {filteredTasks.length === 1 ? 'task' : 'tasks'}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexWrap: 'wrap' }}>
            <TaskFilter />
            <Button
              variant="primary"
              size="md"
              onClick={handleOpenAdd}
              leftIcon={<Plus size={18} />}
            >
              Add Task
            </Button>
          </div>
        </div>

        <TaskList
          tasks={filteredTasks}
          loading={loading}
          searchQuery={searchQuery}
          onToggleStatus={toggleTaskStatus}
          onEdit={handleOpenEdit}
          onDelete={(task) => setDeletingTask(task)}
          onAddTask={handleOpenAdd}
          onClearSearch={() => setSearchQuery('')}
        />
      </section>

      <TaskForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleFormSubmit}
        initialData={editingTask}
        loading={isSubmitting}
      />

      <ConfirmDialog
        isOpen={!!deletingTask}
        onClose={() => setDeletingTask(null)}
        onConfirm={handleConfirmDelete}
        title="DELETE TASK"
        message={`Are you sure you want to delete "${deletingTask?.title}"? This action cannot be reversed.`}
        confirmText="Yes, Delete Task"
        cancelText="Cancel"
        variant="danger"
        loading={isSubmitting}
      />
    </>
  );
}
