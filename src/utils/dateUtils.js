/**
 * Formats a date string (YYYY-MM-DD) into a human-readable format.
 * Example: '2026-11-20' -> 'Nov 20, 2026'
 */
export function formatDate(dateString) {
  if (!dateString) return 'No due date';
  
  try {
    // Append T00:00:00 to avoid timezone shifts
    const date = new Date(dateString.includes('T') ? dateString : `${dateString}T00:00:00`);
    if (isNaN(date.getTime())) return dateString;

    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return dateString;
  }
}

/**
 * Returns formatted header date: "Tuesday, November 17, 2026"
 */
export function getHeaderCurrentDate() {
  const now = new Date();
  return now.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

/**
 * Returns today's date formatted as YYYY-MM-DD
 */
export function getTodayDateString() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Checks if a due date is overdue compared to today.
 * Completed tasks are not considered overdue.
 */
export function isTaskOverdue(dueDateString, status) {
  if (!dueDateString || status === 'completed') return false;
  
  const today = getTodayDateString();
  return dueDateString < today;
}

/**
 * Checks if a task is due today
 */
export function isTaskDueToday(dueDateString) {
  if (!dueDateString) return false;
  const today = getTodayDateString();
  return dueDateString.startsWith(today);
}
