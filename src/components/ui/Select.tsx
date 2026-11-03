import React from 'react';

export interface SelectOption {
  value: string | number;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: SelectOption[];
  error?: string;
  helper?: string;
  placeholder?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, error, helper, placeholder, id, className = '', ...props }, ref) => {
    const selectId = id || props.name || Math.random().toString(36).substring(2, 9);
    const errorId = `${selectId}-error`;
    const helperId = `${selectId}-helper`;

    return (
      <div className="w-full flex flex-col gap-1.5 text-left">
        <label htmlFor={selectId} className="text-sm font-medium text-[var(--color-text)]">
          {label}
        </label>
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? errorId : helper ? helperId : undefined}
            className={`w-full h-11 px-3.5 pr-8 rounded-[var(--radius-sm)] border bg-[var(--color-surface)] text-[var(--color-text)] transition-colors focus:outline-none focus:border-[var(--color-brand-700)] focus:ring-2 focus:ring-[var(--color-accent-500)]/30 disabled:opacity-60 disabled:cursor-not-allowed appearance-none cursor-pointer ${
              error ? 'border-[var(--color-error)] ring-1 ring-[var(--color-error)]/30' : 'border-[var(--color-border)]'
            } ${className}`}
            {...props}
          >
            {placeholder && <option value="">{placeholder}</option>}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[var(--color-text-muted)]">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
        </div>
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

Select.displayName = 'Select';
