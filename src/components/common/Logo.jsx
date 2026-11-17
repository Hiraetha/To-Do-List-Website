import React from 'react';
import { CheckSquare } from 'lucide-react';

export default function Logo({ size = 'md', className = '' }) {
  const sizeClasses = {
    sm: 'neo-logo--sm',
    md: 'neo-logo--md',
    lg: 'neo-logo--lg',
  };

  return (
    <div className={`neo-logo ${sizeClasses[size] || ''} ${className}`.trim()}>
      <div className="neo-logo__icon-box">
        <CheckSquare className="neo-logo__icon" />
      </div>
      <span className="neo-logo__text">TASKLY</span>
    </div>
  );
}
