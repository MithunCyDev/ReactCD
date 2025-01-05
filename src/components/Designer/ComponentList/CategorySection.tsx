import React from 'react';
import { LucideIcon } from 'lucide-react';
import { DraggableComponent } from './DraggableComponent';

interface Component {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface CategorySectionProps {
  title: string;
  components: Component[];
  isCustom?: boolean;
}

export function CategorySection({ title, components, isCustom }: CategorySectionProps) {
  return (
    <div className="mb-4 backdrop-blur-sm bg-gray-800/10 rounded-lg p-4 border border-purple-400/20">
      <div className="flex items-center mb-4">
        <h4 className="text-sm font-medium text-gray-400 uppercase tracking-wider">
          {title}
        </h4>
        <div className="flex-1 ml-3 h-px bg-purple-400/20" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        {components.map((component) => (
          <DraggableComponent
            key={component.id}
            id={component.id}
            label={component.label}
            Icon={component.icon}
            isCustom={isCustom}
          />
        ))}
      </div>
    </div>
  );
}