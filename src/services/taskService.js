import api from './api';
import { getStoredTasks, setStoredTasks, delay } from './mockData';
import { getTodayDateString } from '../utils/dateUtils';

const USE_MOCK = import.meta.env.VITE_USE_MOCK_DATA !== 'false';

export const taskService = {
  /**
   * Fetch all tasks for the current user
   */
  async getTasks() {
    if (USE_MOCK) {
      await delay(200);
      return getStoredTasks();
    }

    const response = await api.get('/tasks.php');
    return Array.isArray(response) ? response : response.tasks || [];
  },

  /**
   * Create a new task
   */
  async createTask(taskData) {
    if (USE_MOCK) {
      await delay(250);
      const currentTasks = getStoredTasks();
      const newTask = {
        id: Date.now(),
        user_id: 1,
        title: taskData.title.trim(),
        description: (taskData.description || '').trim(),
        due_date: taskData.due_date || '',
        status: 'pending',
        category: taskData.category || 'Design',
        priority: taskData.priority || 'medium',
        created_at: getTodayDateString(),
      };

      const updated = [newTask, ...currentTasks];
      setStoredTasks(updated);
      return newTask;
    }

    const response = await api.post('/tasks.php', taskData);
    return response.task || response;
  },

  /**
   * Update an existing task
   */
  async updateTask(id, taskData) {
    if (USE_MOCK) {
      await delay(200);
      const currentTasks = getStoredTasks();
      const index = currentTasks.findIndex((t) => String(t.id) === String(id));
      if (index === -1) {
        throw new Error('Task not found');
      }

      const updatedTask = {
        ...currentTasks[index],
        ...taskData,
        title: taskData.title ? taskData.title.trim() : currentTasks[index].title,
        description: taskData.description !== undefined ? taskData.description.trim() : currentTasks[index].description,
        category: taskData.category || currentTasks[index].category || 'Design',
        priority: taskData.priority || currentTasks[index].priority || 'medium',
      };

      currentTasks[index] = updatedTask;
      setStoredTasks([...currentTasks]);
      return updatedTask;
    }

    const response = await api.put(`/tasks.php?id=${id}`, taskData);
    return response.task || response;
  },

  /**
   * Delete a task
   */
  async deleteTask(id) {
    if (USE_MOCK) {
      await delay(200);
      const currentTasks = getStoredTasks();
      const filtered = currentTasks.filter((t) => String(t.id) !== String(id));
      setStoredTasks(filtered);
      return { success: true, id };
    }

    return await api.delete(`/tasks.php?id=${id}`);
  },

  /**
   * Toggle or update task status ('pending' <-> 'completed')
   */
  async patchTaskStatus(id, status) {
    if (USE_MOCK) {
      await delay(150);
      const currentTasks = getStoredTasks();
      const index = currentTasks.findIndex((t) => String(t.id) === String(id));
      if (index === -1) {
        throw new Error('Task not found');
      }

      currentTasks[index] = {
        ...currentTasks[index],
        status,
      };

      setStoredTasks([...currentTasks]);
      return currentTasks[index];
    }

    const response = await api.patch(`/tasks.php?id=${id}`, { status });
    return response.task || response;
  },
};
