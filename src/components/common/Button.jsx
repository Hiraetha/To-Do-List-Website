import React from 'react';
import { Loader2 } from 'lucide-react';

/**
 * Reusable Neo-Brutalist Button Component
 *
 * @param {'primary' | 'secondary' | 'accent' | 'danger' | 'outline' | 'ghost'} variant
 * @param {'sm' | 'md' | 'lg'} size
 * @param {boolean} fullWidth
 * @param {boolean} loading
 * @param {React.ReactNode} leftIcon
 * @param {React.ReactNode} rightIcon
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  className = '',
  type = 'button',
  onClick,
  ...props
}) {
  const baseClass = 'neo-btn';
  const variantClass = `neo-btn--${variant}`;
  const sizeClass = `neo-btn--${size}`;
  const widthClass = fullWidth ? 'neo-btn--full' : '';
  const loadingClass = loading ? 'neo-btn--loading' : '';

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseClass} ${variantClass} ${sizeClass} ${widthClass} ${loadingClass} ${className}`.trim()}
      {...props}
    >
      {loading ? (
        <Loader2 className="neo-btn__spinner" size={size === 'sm' ? 14 : size === 'lg' ? 20 : 18} />
      ) : (
        leftIcon && <span className="neo-btn__icon neo-btn__icon--left">{leftIcon}</span>
      )}
      <span className="neo-btn__text">{children}</span>
      {!loading && rightIcon && (
        <span className="neo-btn__icon neo-btn__icon--right">{rightIcon}</span>
      )}
    </button>
  );
}
