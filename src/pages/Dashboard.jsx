import React, { useState } from 'react';
import { useTasks } from '../hooks/useTasks';
import { getHeaderCurrentDate } from '../utils/dateUtils';
import TaskStats from '../components/tasks/TaskStats';
import TaskFilter from '../components/tasks/TaskFilter';
import TaskList from '../components/tasks/TaskList';
import TaskForm from '../components/tasks/TaskForm';
import ConfirmDialog from '../components/common/ConfirmDialog';
import Button from '../components/common/Button';
import { Plus } from 'lucide-react';

export default function Dashboard() {
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

  const currentDate = getHeaderCurrentDate();

  // Modal & Dialog state
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

  const handleOpenDelete = (task) => {
    setDeletingTask(task);
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
      {/* 1. Stitch Hero Banner */}
      <section className="dashboard-hero" aria-label="Welcome Banner">
        <div className="dashboard-hero__accent-strip" />
        <div className="dashboard-hero__top-row">
          <div className="dashboard-hero__left">
            <div className="dashboard-hero__date-pill">
              <span>📅</span>
              <span>{currentDate.toUpperCase()}</span>
            </div>
            <h1 className="dashboard-hero__title">GET THINGS DONE!</h1>
            <p className="dashboard-hero__subtitle">
              Welcome back! Ready to organize and execute your daily tasks today?
            </p>
          </div>

          <Button
            variant="primary"
            size="lg"
            onClick={handleOpenAdd}
            leftIcon={<Plus size={20} />}
          >
            + Add New Task
          </Button>
        </div>
      </section>

      {/* 2. Statistics Cards */}
      <TaskStats onFilterSelect={setActiveFilter} />

      {/* 3. Task Management Section */}
      <section className="tasks-section" aria-label="Tasks Management">
        <div className="tasks-section__header">
          <div className="tasks-section__title-group">
            <h2 className="tasks-section__title">MY TASKS</h2>
            <span className="tasks-section__count-badge">
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

        {/* 4. Task List */}
        <TaskList
          tasks={filteredTasks}
          loading={loading}
          searchQuery={searchQuery}
          onToggleStatus={toggleTaskStatus}
          onEdit={handleOpenEdit}
          onDelete={handleOpenDelete}
          onAddTask={handleOpenAdd}
          onClearSearch={() => setSearchQuery('')}
        />
      </section>

      {/* Task Form Modal (Add & Edit) */}
      <TaskForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleFormSubmit}
        initialData={editingTask}
        loading={isSubmitting}
      />

      {/* Delete Confirmation Dialog */}
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
