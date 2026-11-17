import api from './api';
import { getStoredUser, setStoredUser, delay } from './mockData';

const USE_MOCK = import.meta.env.VITE_USE_MOCK_DATA !== 'false';

export const authService = {
  /**
   * Login user
   * @param {string} email
   * @param {string} password
   */
  async login(email, password) {
    if (USE_MOCK) {
      await delay(350);

      // Simple mock credential validation
      if (!email || !password) {
        throw new Error('Email and password are required.');
      }

      // Allow login with test credentials or any valid format in mock mode
      let user = getStoredUser();
      if (!user || user.email !== email) {
        user = {
          id: 1,
          name: email.split('@')[0].replace(/[^a-zA-Z]/g, ' ') || 'Alex Morgan',
          email,
        };
      }

      setStoredUser(user);
      localStorage.setItem('taskly_token', 'mock_jwt_token_' + Date.now());

      return {
        success: true,
        user,
        token: 'mock_jwt_token_' + Date.now(),
        message: 'Logged in successfully',
      };
    }

    // Real API mode (PHP Backend)
    const response = await api.post('/login.php', { email, password });
    if (response.token) {
      localStorage.setItem('taskly_token', response.token);
    }
    return response;
  },

  /**
   * Register a new user
   * @param {string} name
   * @param {string} email
   * @param {string} password
   */
  async register(name, email, password) {
    if (USE_MOCK) {
      await delay(400);

      if (!name || !email || !password) {
        throw new Error('All fields are required.');
      }

      const newUser = {
        id: Date.now(),
        name,
        email,
      };

      setStoredUser(newUser);
      localStorage.setItem('taskly_token', 'mock_jwt_token_' + Date.now());

      return {
        success: true,
        user: newUser,
        token: 'mock_jwt_token_' + Date.now(),
        message: 'Registered successfully',
      };
    }

    // Real API mode (PHP Backend)
    const response = await api.post('/register.php', { name, email, password });
    if (response.token) {
      localStorage.setItem('taskly_token', response.token);
    }
    return response;
  },

  /**
   * Logout user
   */
  async logout() {
    if (USE_MOCK) {
      await delay(150);
      setStoredUser(null);
      localStorage.removeItem('taskly_token');
      return { success: true };
    }

    try {
      await api.post('/logout.php');
    } finally {
      localStorage.removeItem('taskly_token');
    }
  },

  /**
   * Get current authenticated user
   */
  async getCurrentUser() {
    if (USE_MOCK) {
      await delay(100);
      const token = localStorage.getItem('taskly_token');
      // If token exists, return stored user
      if (token) {
        return getStoredUser();
      }
      return null;
    }

    const token = localStorage.getItem('taskly_token');
    if (!token) return null;

    try {
      const response = await api.get('/user.php');
      return response.user || response;
    } catch {
      localStorage.removeItem('taskly_token');
      return null;
    }
  },
};
