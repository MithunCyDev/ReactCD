import React from 'react';
import { ComponentData } from '../../../types/designer';
import { StyleEditor } from './StyleEditor';
import { ContentEditor } from './ContentEditor';
import { LayoutEditor } from './LayoutEditor';

interface CustomizationPanelProps {
  component: ComponentData | null;
  onUpdate: (updates: Partial<ComponentData>) => void;
}

export function CustomizationPanel({ component, onUpdate }: CustomizationPanelProps) {
  if (!component) return null;

  return (
    <div className="w-72 bg-gray-800 border-l border-gray-700 h-full overflow-y-auto">
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-4 text-gray-100">
          Customize {component.type}
        </h3>
        
        {/* Layout settings for container components */}
        {['container', 'grid', 'flex'].includes(component.type) && (
          <LayoutEditor 
            type={component.type} 
            styles={component.styles}
            onUpdate={(styles) => onUpdate({ styles })}
          />
        )}

        {/* Content settings for text-based components */}
        {['heading', 'text', 'button'].includes(component.type) && (
          <ContentEditor 
            type={component.type}
            props={component.props}
            onUpdate={(props) => onUpdate({ props })}
          />
        )}

        {/* Common style settings for all components */}
        <StyleEditor 
          styles={component.styles}
          onUpdate={(styles) => onUpdate({ styles })}
        />
      </div>
    </div>
  );
}