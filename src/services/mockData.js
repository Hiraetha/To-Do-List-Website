const STORAGE_KEY_TASKS = 'taskly_mock_tasks';
const STORAGE_KEY_USER = 'taskly_mock_user';

export const INITIAL_MOCK_USER = {
  id: 1,
  name: 'Alex Rivera',
  email: 'alex.designer@taskly.io',
};

export const INITIAL_MOCK_TASKS = [
  {
    id: 1,
    user_id: 1,
    title: 'Finalize Neo-Brutalist Design System Tokens',
    description: 'Audit color contrast, export CSS custom properties, and finalize button states for product launch.',
    due_date: '2026-11-20',
    status: 'pending',
    category: 'Design',
    priority: 'high',
    created_at: '2026-11-17',
  },
  {
    id: 2,
    user_id: 1,
    title: 'Prepare Q4 SaaS Product Roadmap Deck',
    description: 'Synthesize customer feedback interviews and outline sprint milestones for engineering team.',
    due_date: '2026-11-18',
    status: 'pending',
    category: 'Strategy',
    priority: 'medium',
    created_at: '2026-11-16',
  },
  {
    id: 3,
    user_id: 1,
    title: 'Configure Stripe Billing & Webhook Endpoints',
    description: 'Implement subscription webhooks for invoice.payment_succeeded and test downgrade edge cases.',
    due_date: '2026-11-26',
    status: 'pending',
    category: 'Dev',
    priority: 'high',
    created_at: '2026-11-17',
  },
  {
    id: 4,
    user_id: 1,
    title: 'Migrate PostgreSQL Database to Production Cluster',
    description: 'Completed without downtime. Verified replica replication lag is under 15ms.',
    due_date: '2026-11-16',
    status: 'completed',
    category: 'Dev',
    priority: 'high',
    created_at: '2026-11-15',
  },
  {
    id: 5,
    user_id: 1,
    title: 'Conduct 5 User Usability Testing Sessions',
    description: 'Recorded feedback on task batching and keyboard shortcuts navigation flow.',
    due_date: '2026-11-14',
    status: 'completed',
    category: 'Design',
    priority: 'medium',
    created_at: '2026-11-13',
  },
];

export const delay = (ms = 250) => new Promise((resolve) => setTimeout(resolve, ms));

export function getStoredUser() {
  try {
    const data = localStorage.getItem(STORAGE_KEY_USER);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('Failed reading user from storage:', e);
  }
  localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(INITIAL_MOCK_USER));
  return INITIAL_MOCK_USER;
}

export function setStoredUser(user) {
  if (user) {
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
  } else {
    localStorage.removeItem(STORAGE_KEY_USER);
  }
}

export function getStoredTasks() {
  try {
    const data = localStorage.getItem(STORAGE_KEY_TASKS);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('Failed reading tasks from storage:', e);
  }
  localStorage.setItem(STORAGE_KEY_TASKS, JSON.stringify(INITIAL_MOCK_TASKS));
  return INITIAL_MOCK_TASKS;
}

export function setStoredTasks(tasks) {
  localStorage.setItem(STORAGE_KEY_TASKS, JSON.stringify(tasks));
}

export function resetMockData() {
  localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(INITIAL_MOCK_USER));
  localStorage.setItem(STORAGE_KEY_TASKS, JSON.stringify(INITIAL_MOCK_TASKS));
}
