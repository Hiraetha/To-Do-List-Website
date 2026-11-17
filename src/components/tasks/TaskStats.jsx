import React from 'react';
import { useTasks } from '../../hooks/useTasks';
import { ClipboardList, CheckCircle2, Clock } from 'lucide-react';

export default function TaskStats({ onFilterSelect }) {
  const { stats } = useTasks();

  const completionRate = stats.total > 0
    ? Math.round((stats.completed / stats.total) * 100)
    : 0;

  return (
    <section className="stats-grid" aria-label="Task Statistics">
      {/* Total Tasks Card */}
      <div
        className="stat-card stat-card--total"
        onClick={() => onFilterSelect && onFilterSelect('all')}
        role={onFilterSelect ? 'button' : undefined}
        tabIndex={onFilterSelect ? 0 : undefined}
      >
        <div className="stat-card__header">
          <span className="stat-card__label">Total Tasks</span>
          <div className="stat-card__icon-box">
            <ClipboardList size={22} strokeWidth={2.5} />
          </div>
        </div>
        <div className="stat-card__bottom">
          <span className="stat-card__value">{stats.total}</span>
          <span className="stat-card__pill">+{stats.total} total</span>
        </div>
      </div>

      {/* Completed Tasks Card */}
      <div
        className="stat-card stat-card--completed"
        onClick={() => onFilterSelect && onFilterSelect('completed')}
        role={onFilterSelect ? 'button' : undefined}
        tabIndex={onFilterSelect ? 0 : undefined}
      >
        <div className="stat-card__header">
          <span className="stat-card__label">Completed Tasks</span>
          <div className="stat-card__icon-box">
            <CheckCircle2 size={22} strokeWidth={2.5} />
          </div>
        </div>
        <div className="stat-card__bottom">
          <span className="stat-card__value">{stats.completed}</span>
          <span className="stat-card__pill">{completionRate}% completed ⚡</span>
        </div>
      </div>

      {/* Pending Tasks Card */}
      <div
        className="stat-card stat-card--pending"
        onClick={() => onFilterSelect && onFilterSelect('pending')}
        role={onFilterSelect ? 'button' : undefined}
        tabIndex={onFilterSelect ? 0 : undefined}
      >
        <div className="stat-card__header">
          <span className="stat-card__label">Pending Tasks</span>
          <div className="stat-card__icon-box">
            <Clock size={22} strokeWidth={2.5} />
          </div>
        </div>
        <div className="stat-card__bottom">
          <span className="stat-card__value">{stats.pending}</span>
          <span className="stat-card__pill">
            {stats.pending === 1 ? '1 to do' : `${stats.pending} to do`}
          </span>
        </div>
      </div>
    </section>
  );
}
