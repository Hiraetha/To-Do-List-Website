import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTasks } from '../../hooks/useTasks';
import { useToast } from '../../context/ToastContext';
import Logo from '../common/Logo';
import {
  LayoutDashboard,
  CheckCircle2,
  Clock,
  ListTodo,
  LogOut,
  X,
} from 'lucide-react';

export default function Sidebar({ isOpen, onClose }) {
  const { user, logout } = useAuth();
  const { stats } = useTasks();
  const toast = useToast();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.info('You have logged out.');
      navigate('/login');
    } catch {
      toast.error('Logout failed.');
    }
  };

  const navLinks = [
    {
      to: '/dashboard',
      label: 'Dashboard',
      icon: <LayoutDashboard size={18} />,
      badge: stats.total,
      end: true,
    },
    {
      to: '/tasks',
      label: 'All Tasks',
      icon: <ListTodo size={18} />,
      badge: stats.total,
      end: true,
    },
    {
      to: '/tasks/pending',
      label: 'Pending Tasks',
      icon: <Clock size={18} />,
      badge: stats.pending,
      end: true,
    },
    {
      to: '/tasks/completed',
      label: 'Completed Tasks',
      icon: <CheckCircle2 size={18} />,
      badge: stats.completed,
      end: true,
    },
  ];

  return (
    <>
      <div
        className={`sidebar-backdrop ${isOpen ? 'sidebar-backdrop--open' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside className={`sidebar ${isOpen ? 'sidebar--open' : ''}`} aria-label="Main Navigation">
        <div className="sidebar__header">
          <Logo size="md" />
          <button
            type="button"
            className="sidebar__close-btn"
            onClick={onClose}
            aria-label="Close navigation sidebar"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="sidebar__nav">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              onClick={onClose}
              className={({ isActive }) =>
                `sidebar__nav-item ${isActive ? 'sidebar__nav-item--active' : ''}`
              }
            >
              <div className="sidebar__nav-item-content">
                {link.icon}
                <span>{link.label}</span>
              </div>
              <span className="sidebar__badge">{link.badge}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar__footer">
          {user && (
            <div className="sidebar__user-card">
              <div className="sidebar__user-avatar">
                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <div className="sidebar__user-info">
                <span className="sidebar__user-name" title={user.name}>
                  {user.name}
                </span>
                <span className="sidebar__user-email" title={user.email}>
                  {user.email}
                </span>
              </div>
            </div>
          )}

          <button
            type="button"
            className="neo-btn neo-btn--outline neo-btn--sm neo-btn--full"
            onClick={handleLogout}
          >
            <LogOut size={16} />
            <span>Log Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
