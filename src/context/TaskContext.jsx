import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { taskService } from '../services/taskService';
import { useToast } from './ToastContext';

const TaskContext = createContext(null);

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'pending' | 'completed'

  const toast = useToast();

  const loadTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await taskService.getTasks();
      setTasks(data || []);
    } catch (err) {
      console.error('Failed to load tasks:', err);
      const msg = err.message || 'Failed to load tasks.';
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  // Statistics calculation
  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.status === 'completed').length;
    const pending = total - completed;
    return { total, completed, pending };
  }, [tasks]);

  // Filter and search
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      // 1. Filter by status
      if (activeFilter === 'pending' && task.status !== 'pending') return false;
      if (activeFilter === 'completed' && task.status !== 'completed') return false;

      // 2. Filter by search query (title or description)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = task.title.toLowerCase().includes(query);
        const matchesDesc = (task.description || '').toLowerCase().includes(query);
        return matchesTitle || matchesDesc;
      }

      return true;
    });
  }, [tasks, activeFilter, searchQuery]);

  // CRUD Operations
  const addTask = async (taskData) => {
    try {
      const newTask = await taskService.createTask(taskData);
      setTasks((prev) => [newTask, ...prev]);
      toast.success('Task created successfully!');
      return newTask;
    } catch (err) {
      const msg = err.message || 'Could not create task.';
      toast.error(msg);
      throw err;
    }
  };

  const editTask = async (id, taskData) => {
    try {
      const updated = await taskService.updateTask(id, taskData);
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
      toast.success('Task updated successfully!');
      return updated;
    } catch (err) {
      const msg = err.message || 'Could not update task.';
      toast.error(msg);
      throw err;
    }
  };

  const removeTask = async (id) => {
    try {
      await taskService.deleteTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
      toast.success('Task deleted successfully.');
    } catch (err) {
      const msg = err.message || 'Could not delete task.';
      toast.error(msg);
      throw err;
    }
  };

  const toggleTaskStatus = async (id) => {
    const target = tasks.find((t) => t.id === id);
    if (!target) return;

    const nextStatus = target.status === 'completed' ? 'pending' : 'completed';

    // Optimistic UI update
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: nextStatus } : t))
    );

    try {
      await taskService.patchTaskStatus(id, nextStatus);
      if (nextStatus === 'completed') {
        toast.success('Task marked as completed! 🎉');
      } else {
        toast.info('Task moved back to pending.');
      }
    } catch (err) {
      // Revert on error
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, status: target.status } : t))
      );
      const msg = err.message || 'Could not update task status.';
      toast.error(msg);
    }
  };

  const value = {
    tasks,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    activeFilter,
    setActiveFilter,
    filteredTasks,
    stats,
    loadTasks,
    addTask,
    editTask,
    removeTask,
    toggleTaskStatus,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTasksContext() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasksContext must be used within a TaskProvider');
  }
  return context;
}
