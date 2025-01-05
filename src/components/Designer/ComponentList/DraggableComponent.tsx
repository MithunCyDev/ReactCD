import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { LucideIcon, Trash2 } from 'lucide-react';
import { useCustomComponents } from '../../../hooks/useCustomComponents';

interface DraggableComponentProps {
  id: string;
  label: string;
  Icon: LucideIcon;
  isCustom?: boolean;
}

export function DraggableComponent({ id, label, Icon, isCustom }: DraggableComponentProps) {
  const { deleteComponent, setActiveComponentId } = useCustomComponents();

  // Only use drag functionality for non-custom components
  const { attributes, listeners, setNodeRef } = !isCustom ? useDraggable({
    id: `new-${id}`,
    data: { type: id }
  }) : { attributes: {}, listeners: {}, setNodeRef: null };

  const handleClick = (e: React.MouseEvent) => {
    if (isCustom) {
      e.preventDefault();
      e.stopPropagation();
      setActiveComponentId(id);
    }
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isCustom) {
      try {
        await deleteComponent(id);
      } catch (error) {
        console.error('Failed to delete component:', error);
      }
    }
  };

  return (
    <div
      ref={!isCustom ? setNodeRef : undefined}
      {...(!isCustom ? { ...listeners, ...attributes } : {})}
      onClick={handleClick}
      className={`group relative flex flex-col items-center p-4 rounded-lg 
        backdrop-blur-sm bg-gray-800/20 hover:bg-gray-700/30
        border border-purple-400/20 hover:border-purple-400/40
        transition-all duration-200 ease-in-out
        hover:shadow-[0_0_15px_rgba(167,139,250,0.1)]
        ${isCustom ? 'cursor-pointer' : 'cursor-grab'}`}
    >
      <div className="relative">
        <Icon className="w-6 h-6 text-gray-400 group-hover:text-purple-400 transition-colors" />
        <div className="absolute inset-0 bg-purple-400/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <span className="mt-2 text-sm text-gray-300 group-hover:text-gray-100 text-center transition-colors">
        {label}
      </span>

      {isCustom && (
        <button
          onClick={handleDelete}
          className="absolute top-1 right-1 p-1 rounded-full bg-gray-700/50 
            opacity-0 group-hover:opacity-100 hover:bg-red-500/50 
            transition-all duration-200"
          title="Delete component"
        >
          <Trash2 className="w-3 h-3" />
        </button>
      )}
    </div>
  );
}