import React, { useEffect } from 'react';
import { X } from 'lucide-react';

/**
 * Reusable Neo-Brutalist Modal Component
 */
export default function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  footer,
  maxWidth = '520px',
  closeOnBackdrop = true,
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="neo-modal-backdrop" onClick={closeOnBackdrop ? onClose : undefined}>
      <div
        className="neo-modal"
        style={{ maxWidth }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="neo-modal__header">
          <div className="neo-modal__titles">
            <h3 id="modal-title" className="neo-modal__title">{title}</h3>
            {subtitle && <p className="neo-modal__subtitle">{subtitle}</p>}
          </div>
          <button
            type="button"
            className="neo-modal__close-btn"
            onClick={onClose}
            aria-label="Close dialog"
          >
            <X size={20} />
          </button>
        </div>

        <div className="neo-modal__body">
          {children}
        </div>

        {footer && (
          <div className="neo-modal__footer">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
