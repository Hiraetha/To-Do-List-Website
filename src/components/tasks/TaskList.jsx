import React from 'react';
import TaskCard from './TaskCard';
import Button from '../common/Button';
import { Plus, CheckSquare, SearchX } from 'lucide-react';

export default function TaskList({
  tasks = [],
  loading = false,
  searchQuery = '',
  onToggleStatus,
  onEdit,
  onDelete,
  onAddTask,
  onClearSearch,
}) {
  if (loading) {
    return (
      <div className="task-list" aria-busy="true" aria-label="Loading tasks">
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            className="task-card"
            style={{
              opacity: 0.7,
              pointerEvents: 'none',
              minHeight: '90px',
              backgroundColor: '#fff',
            }}
          >
            <div style={{ display: 'flex', gap: '1rem', width: '100%', alignItems: 'center' }}>
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  backgroundColor: '#ECEBE4',
                  borderRadius: '6px',
                }}
              />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
                <div
                  style={{
                    height: '16px',
                    width: '45%',
                    backgroundColor: '#ECEBE4',
                    borderRadius: '4px',
                  }}
                />
                <div
                  style={{
                    height: '12px',
                    width: '75%',
                    backgroundColor: '#F3F2ED',
                    borderRadius: '4px',
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (tasks.length === 0) {
    const isSearching = !!searchQuery.trim();

    return (
      <div className="task-empty-state">
        <div className="task-empty-state__icon-box">
          {isSearching ? <SearchX size={36} /> : <CheckSquare size={36} />}
        </div>
        <h3 className="task-empty-state__title">
          {isSearching ? 'No Matching Tasks Found' : 'No Tasks Yet!'}
        </h3>
        <p className="task-empty-state__text">
          {isSearching
            ? `We couldn't find any tasks matching "${searchQuery}". Try a different keyword or clear your search.`
            : 'You have no tasks in this view. Stay ahead of your goals by creating your first task!'}
        </p>

        {isSearching ? (
          <Button variant="outline" size="md" onClick={onClearSearch}>
            Clear Search Filter
          </Button>
        ) : (
          <Button
            variant="primary"
            size="md"
            onClick={onAddTask}
            leftIcon={<Plus size={18} />}
          >
            Add New Task
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onToggleStatus={onToggleStatus}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
