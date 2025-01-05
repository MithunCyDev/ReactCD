import React, { useState } from 'react';
import { Code, Settings, Trash2 } from 'lucide-react';
import { CustomComponent } from '../../../../types/designer';

interface CustomComponentItemProps {
  component: CustomComponent;
}

export function CustomComponentItem({ component }: CustomComponentItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative p-2 rounded-md backdrop-blur-sm 
        bg-purple-400/5 hover:bg-purple-400/10 
        border border-purple-400/20 hover:border-purple-400/30
        transition-all duration-200"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between">
        <span className="text-gray-100">{component.label}</span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('openComponentCode', { 
              detail: { componentId: component.id } 
            }))}
            className="p-1 text-gray-400 hover:text-purple-400 rounded"
            title="View Code"
          >
            <Code className="w-4 h-4" />
          </button>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('openComponentEditor', { 
              detail: { componentId: component.id } 
            }))}
            className="p-1 text-gray-400 hover:text-purple-400 rounded"
            title="Edit Component"
          >
            <Settings className="w-4 h-4" />
          </button>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('deleteComponent', { 
              detail: { componentId: component.id } 
            }))}
            className="p-1 text-gray-400 hover:text-red-400 rounded"
            title="Delete Component"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}