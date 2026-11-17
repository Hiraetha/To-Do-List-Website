import React from 'react';
import { formatDate, isTaskOverdue, isTaskDueToday } from '../../utils/dateUtils';
import { Check, Calendar, AlertCircle, Pencil, Trash2 } from 'lucide-react';

const CATEGORY_EMOJIS = {
  Design: '🎨',
  Dev: '⚡',
  Strategy: '💼',
  Life: '🌱',
};

export default function TaskCard({ task, onToggleStatus, onEdit, onDelete }) {
  const isCompleted = task.status === 'completed';
  const isOverdue = isTaskOverdue(task.due_date, task.status);
  const isDueToday = isTaskDueToday(task.due_date) && !isCompleted;

  const category = task.category || 'Design';
  const categoryEmoji = CATEGORY_EMOJIS[category] || '📌';
  const priority = task.priority || 'medium';

  return (
    <article
      className={`task-card ${isCompleted ? 'task-card--completed' : ''}`}
      aria-labelledby={`task-title-${task.id}`}
    >
      <div className="task-card__left">
        {/* Complete Task Checkbox Button */}
        <button
          type="button"
          className={`task-card__checkbox-btn ${
            isCompleted ? 'task-card__checkbox-btn--checked' : ''
          }`}
          onClick={() => onToggleStatus(task.id)}
          aria-label={isCompleted ? 'Mark task as pending' : 'Mark task as completed'}
        >
          {isCompleted && <Check size={16} strokeWidth={3.5} />}
        </button>

        <div className="task-card__content">
          <div className="task-card__header-row">
            <h3
              id={`task-title-${task.id}`}
              className={`task-card__title ${
                isCompleted ? 'task-card__title--completed' : ''
              }`}
            >
              {task.title}
            </h3>

            {/* Category Chip */}
            <span className="task-chip task-chip--category">
              {categoryEmoji} {category}
            </span>

            {/* Priority Chip */}
            <span
              className={`task-chip ${
                priority === 'high'
                  ? 'task-chip--priority-high'
                  : priority === 'low'
                  ? 'task-chip--priority-low'
                  : 'task-chip--priority-med'
              }`}
            >
              {priority === 'high' ? 'P1 · High' : priority === 'low' ? 'P3 · Low' : 'P2 · Med'}
            </span>

            {/* Status Chip */}
            {isCompleted && (
              <span className="task-chip" style={{ backgroundColor: 'var(--color-lime)' }}>
                DONE ✓
              </span>
            )}
          </div>

          {task.description && (
            <p className="task-card__description">{task.description}</p>
          )}

          <div className="task-card__meta">
            {task.due_date && (
              <span
                className={`task-chip task-chip--due ${
                  isOverdue
                    ? 'task-chip--overdue'
                    : isDueToday
                    ? 'task-chip--priority-med'
                    : ''
                }`}
                title={isOverdue ? 'This task is overdue' : isDueToday ? 'Due today' : ''}
              >
                {isOverdue ? <AlertCircle size={12} /> : <Calendar size={12} />}
                <span>
                  {isOverdue ? '🚨 ' : ''}
                  Due: {formatDate(task.due_date)}
                  {isOverdue && ' (Overdue)'}
                  {isDueToday && ' (Today)'}
                </span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Task Actions */}
      <div className="task-card__actions">
        <button
          type="button"
          className="task-action-btn task-action-btn--edit"
          onClick={() => onEdit(task)}
          aria-label={`Edit task: ${task.title}`}
          title="Edit task"
        >
          <Pencil size={15} />
        </button>

        <button
          type="button"
          className="task-action-btn task-action-btn--delete"
          onClick={() => onDelete(task)}
          aria-label={`Delete task: ${task.title}`}
          title="Delete task"
        >
          <Trash2 size={15} />
        </button>
      </div>
    </article>
  );
}
