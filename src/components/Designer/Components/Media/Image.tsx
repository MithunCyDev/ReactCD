import React from 'react';
import { ComponentProps } from '../../../../types/designer';

export function Image({ styles, props }: ComponentProps) {
  return (
    <div 
      style={styles} 
      className="relative group rounded overflow-hidden hover:ring-1 hover:ring-blue-400"
    >
      {props.src ? (
        <img 
          src={props.src} 
          alt={props.alt || ''} 
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full min-h-[100px] bg-gray-700 flex items-center justify-center">
          <span className="text-gray-400">Image Placeholder</span>
        </div>
      )}
    </div>
  );
}