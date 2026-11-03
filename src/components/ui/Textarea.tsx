import React from 'react';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  helper?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helper, id, className = '', ...props }, ref) => {
    const inputId = id || props.name || Math.random().toString(36).substring(2, 9);
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    return (
      <div className="w-full flex flex-col gap-1.5 text-left">
        <label htmlFor={inputId} className="text-sm font-medium text-[var(--color-text)]">
          {label}
        </label>
        <textarea
          ref={ref}
          id={inputId}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : helper ? helperId : undefined}
          className={`min-h-[7rem] p-3 rounded-[var(--radius-sm)] border bg-[var(--color-surface)] text-[var(--color-text)] transition-colors placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-brand-700)] focus:ring-2 focus:ring-[var(--color-accent-500)]/30 disabled:opacity-60 disabled:cursor-not-allowed resize-y ${
            error ? 'border-[var(--color-error)] ring-1 ring-[var(--color-error)]/30' : 'border-[var(--color-border)]'
          } ${className}`}
          {...props}
        />
        {error ? (
          <p id={errorId} className="text-xs text-[var(--color-error)] font-medium">
            {error}
          </p>
        ) : helper ? (
          <p id={helperId} className="text-xs text-[var(--color-text-muted)]">
            {helper}
          </p>
        ) : null}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
