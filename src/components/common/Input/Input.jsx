import React from 'react';

export function Input({
  label,
  error,
  type = 'text',
  fullWidth = false,
  className = '',
  ...props
}) {
  const baseStyles = 'rounded-md border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-500';
  const errorStyles = error ? 'border-red-500 focus:ring-red-500' : 'focus:border-purple-500 focus:ring-purple-500';
  const widthStyles = fullWidth ? 'w-full' : '';
  
  return (
    <div className={fullWidth ? 'w-full' : ''}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        type={type}
        className={`
          ${baseStyles}
          ${errorStyles}
          ${widthStyles}
          ${className}
          focus:outline-none focus:ring-2 focus:ring-opacity-50
        `}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}