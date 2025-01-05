import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { ComponentData } from '../../types/designer';
import { ComponentRenderer } from './ComponentRenderer';

interface CanvasProps {
  components: ComponentData[];
  onSelect: (id: string) => void;
  onUpdate: (id: string, updates: Partial<ComponentData>) => void;
  onRemove: (id: string) => void;
  selectedId: string | null;
}

export function Canvas({ components, onSelect, onUpdate, onRemove, selectedId }: CanvasProps) {
  const { setNodeRef } = useDroppable({
    id: 'canvas'
  });

  return (
    <div 
      ref={setNodeRef}
      className="w-full h-full bg-gray-800"
    >
      {components.map((component) => (
        <div
          key={component.id}
          className={`relative ${
            selectedId === component.id ? 'ring-2 ring-purple-400' : ''
          }`}
        >
          <ComponentRenderer
            component={component}
            onSelect={onSelect}
            onUpdate={onUpdate}
            onRemove={onRemove}
          />
        </div>
      ))}
      {components.length === 0 && (
        <div className="h-full flex items-center justify-center text-gray-500">
          <p>Drag components here to start designing</p>
        </div>
      )}
    </div>
  );
}