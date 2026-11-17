import React, { useState } from 'react';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';

/**
 * Reusable Neo-Brutalist Input & Textarea Component
 */
export default function Input({
  label,
  id,
  name,
  type = 'text',
  placeholder,
  value,
  defaultValue,
  onChange,
  error,
  helperText,
  required = false,
  disabled = false,
  multiline = false,
  rows = 3,
  leftIcon,
  className = '',
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);
  const inputId = id || name || Math.random().toString(36).substring(2, 9);
  const isPasswordType = type === 'password';
  const computedType = isPasswordType ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className={`neo-input-group ${error ? 'neo-input-group--error' : ''} ${className}`.trim()}>
      {label && (
        <label htmlFor={inputId} className="neo-input-label">
          {label}
          {required && <span className="neo-input-required">*</span>}
        </label>
      )}

      <div className="neo-input-wrapper">
        {leftIcon && <span className="neo-input-icon neo-input-icon--left">{leftIcon}</span>}

        {multiline ? (
          <textarea
            id={inputId}
            name={name}
            placeholder={placeholder}
            value={value}
            defaultValue={defaultValue}
            onChange={onChange}
            disabled={disabled}
            required={required}
            rows={rows}
            className={`neo-input neo-textarea ${leftIcon ? 'neo-input--has-left-icon' : ''}`}
            {...props}
          />
        ) : (
          <input
            id={inputId}
            name={name}
            type={computedType}
            placeholder={placeholder}
            value={value}
            defaultValue={defaultValue}
            onChange={onChange}
            disabled={disabled}
            required={required}
            className={`neo-input ${leftIcon ? 'neo-input--has-left-icon' : ''} ${
              isPasswordType ? 'neo-input--has-right-icon' : ''
            }`}
            {...props}
          />
        )}

        {isPasswordType && (
          <button
            type="button"
            className="neo-input-password-toggle"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>

      {error ? (
        <div className="neo-input-error" role="alert">
          <AlertCircle size={14} />
          <span>{error}</span>
        </div>
      ) : helperText ? (
        <p className="neo-input-helper">{helperText}</p>
      ) : null}
    </div>
  );
}
