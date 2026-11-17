import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTasks } from '../../hooks/useTasks';
import { getHeaderCurrentDate } from '../../utils/dateUtils';
import { Menu, Search, X } from 'lucide-react';

export default function Header({ onOpenSidebar }) {
  const { user } = useAuth();
  const { searchQuery, setSearchQuery } = useTasks();

  const currentDate = getHeaderCurrentDate();
  const firstName = user?.name ? user.name.split(' ')[0] : 'there';

  return (
    <header className="header">
      <div className="header__top-row">
        <div className="header__left">
          <button
            type="button"
            className="header__menu-btn"
            onClick={onOpenSidebar}
            aria-label="Open navigation menu"
          >
            <Menu size={22} />
          </button>

          <div className="header__greetings">
            <h2 className="header__title">HELLO, {firstName.toUpperCase()}! 👋</h2>
            <p className="header__date">{currentDate}</p>
          </div>
        </div>
      </div>

      <div className="header__right">
        <div className="header__search-wrapper">
          <Search className="header__search-icon" size={18} />
          <input
            type="text"
            className="header__search-input"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search tasks"
          />
          {searchQuery && (
            <button
              type="button"
              className="header__search-clear"
              onClick={() => setSearchQuery('')}
              aria-label="Clear search query"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
