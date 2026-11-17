import React from 'react';
import { useTasks } from '../../hooks/useTasks';

export default function TaskFilter() {
  const { activeFilter, setActiveFilter, stats } = useTasks();

  const filters = [
    { id: 'all', label: 'All Tasks', count: stats.total },
    { id: 'pending', label: 'Pending', count: stats.pending },
    { id: 'completed', label: 'Completed', count: stats.completed },
  ];

  return (
    <div className="task-filter-bar" role="tablist" aria-label="Filter tasks">
      {filters.map((filter) => {
        const isActive = activeFilter === filter.id;
        return (
          <button
            key={filter.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            className={`task-filter-btn ${isActive ? 'task-filter-btn--active' : ''}`}
            onClick={() => setActiveFilter(filter.id)}
          >
            <span>{filter.label}</span>
            <span className="task-filter-btn__count">{filter.count}</span>
          </button>
        );
      })}
    </div>
  );
}
