import React from 'react';
import { ComponentProps } from '../../../../types/designer';

export function Text({ styles, props }: ComponentProps) {
  return (
    <div className="relative group">
      <p 
        style={styles}
        className="px-4 py-2 rounded hover:ring-1 hover:ring-blue-400"
      >
        {props.content || 'Text content'}
      </p>
    </div>
  );
}