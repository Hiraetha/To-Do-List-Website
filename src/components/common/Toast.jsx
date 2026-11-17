import React from 'react';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export default function Toast({ id, message, type = 'success', onClose }) {
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle2 size={18} />;
      case 'error':
        return <AlertCircle size={18} />;
      case 'warning':
        return <AlertTriangle size={18} />;
      case 'info':
      default:
        return <Info size={18} />;
    }
  };

  return (
    <div className={`neo-toast neo-toast--${type}`} role="status">
      <span className="neo-toast__icon">{getIcon()}</span>
      <span className="neo-toast__message">{message}</span>
      <button
        type="button"
        className="neo-toast__close"
        onClick={onClose}
        aria-label="Close notification"
      >
        <X size={14} />
      </button>
    </div>
  );
}
