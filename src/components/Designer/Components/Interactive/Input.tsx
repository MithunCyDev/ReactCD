import React from 'react';
import { ComponentProps } from '../../../../types/designer';

export function Input({ styles, props }: ComponentProps) {
  return (
    <div className="relative group">
      <input
        type={props.type || 'text'}
        placeholder={props.placeholder || 'Enter text...'}
        style={styles}
        className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 text-white placeholder-gray-400 hover:ring-1 hover:ring-blue-400"
      />
    </div>
  );
}