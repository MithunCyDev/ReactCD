import React from 'react';
import { ComponentProps } from '../../../../types/designer';

export function Button({ styles, props }: ComponentProps) {
  return (
    <div className="relative group">
      <button 
        style={styles}
        className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white transition-colors hover:ring-1 hover:ring-blue-400"
      >
        {props.text || 'Button'}
      </button>
    </div>
  );
}