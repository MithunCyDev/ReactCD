import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { Plus } from 'lucide-react';

interface ContainerProps {
  id: string;
  children: React.ReactNode;
  styles: Record<string, string>;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export function Container({ id, children, styles, isSelected, onSelect }: ContainerProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: `container-${id}`
  });

  return (
    <div
      ref={setNodeRef}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(id);
      }}
      className={`relative min-h-[100px] ${
        isSelected ? 'ring-2 ring-blue-500' : 'border border-gray-700'
      } ${isOver ? 'bg-gray-700/50' : ''}`}
      style={styles}
    >
      {children}
      {children.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center border-2 border-dashed border-gray-600">
          <div className="flex flex-col items-center text-gray-500">
            <Plus className="w-8 h-8 mb-2" />
            <span>Drop components here</span>
          </div>
        </div>
      )}
    </div>
  );
}