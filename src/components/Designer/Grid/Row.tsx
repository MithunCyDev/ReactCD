import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { ComponentData } from '../../../types/designer';

interface RowProps {
  id: string;
  children: React.ReactNode;
  styles: Record<string, string>;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export function Row({ id, children, styles, isSelected, onSelect }: RowProps) {
  const { setNodeRef } = useDroppable({
    id: `row-${id}`
  });

  return (
    <div
      ref={setNodeRef}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(id);
      }}
      className={`flex gap-4 ${isSelected ? 'ring-2 ring-blue-500' : 'border border-gray-700'}`}
      style={styles}
    >
      {children}
    </div>
  );
}