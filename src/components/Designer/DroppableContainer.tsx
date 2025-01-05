import React from 'react';
import { useDroppable } from '@dnd-kit/core';

interface DroppableContainerProps {
  id: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
  minHeight?: string;
  placeholder?: string;
  onSelect?: () => void;
}

export function DroppableContainer({ 
  id, 
  children, 
  style, 
  minHeight = '100px',
  placeholder = 'Drop components here',
  onSelect
}: DroppableContainerProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: `droppable-${id}`
  });

  return (
    <div 
      ref={setNodeRef}
      style={style} 
      className={`relative p-4 ${isOver ? 'ring-2 ring-blue-400' : 'hover:ring-1 hover:ring-blue-400'}`}
      onClick={(e) => {
        e.stopPropagation();
        onSelect?.();
      }}
    >
      {children}
      {React.Children.count(children) === 0 && (
        <div 
          className="flex items-center justify-center border-2 border-dashed border-gray-600 rounded"
          style={{ minHeight }}
        >
          <span className="text-gray-500">{placeholder}</span>
        </div>
      )}
    </div>
  );
}