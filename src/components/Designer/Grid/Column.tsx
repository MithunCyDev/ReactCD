import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { ComponentData } from '../../../types/designer';

interface ColumnProps {
  id: string;
  children: React.ReactNode;
  styles: Record<string, string>;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export function Column({ id, children, styles, isSelected, onSelect }: ColumnProps) {
  const { setNodeRef } = useDroppable({
    id: `column-${id}`
  });

  return (
    <div
      ref={setNodeRef}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(id);
      }}
      className={`flex-1 ${isSelected ? 'ring-2 ring-blue-500' : 'border border-gray-700'}`}
      style={styles}
    >
      {children}
    </div>
  );
}