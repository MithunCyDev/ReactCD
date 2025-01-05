import React from 'react';
import { ComponentProps } from '../../../../types/designer';

export function Heading({ styles, props }: ComponentProps) {
  return (
    <div className="relative group">
      <h1 
        style={styles}
        className="px-4 py-2 rounded hover:ring-1 hover:ring-blue-400"
      >
        {props.content || 'Heading'}
      </h1>
    </div>
  );
}