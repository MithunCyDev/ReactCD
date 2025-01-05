import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Code, Plus } from 'lucide-react';
import { CustomComponentItem } from './CustomComponentItem';
import { useCustomComponents } from '../../../../hooks/useCustomComponents';

export function CustomComponentMenubar() {
  const [isExpanded, setIsExpanded] = useState(true);
  const { customComponents } = useCustomComponents();

  return (
    <div className="fixed top-20 right-4 w-64 backdrop-blur-md bg-gray-800/30 rounded-lg border border-purple-400/30">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-3 flex items-center justify-between text-gray-100 hover:bg-purple-400/10 rounded-t-lg"
      >
        <span className="font-medium">Custom Components</span>
        {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
      </button>

      {isExpanded && (
        <div className="p-2 space-y-2">
          {customComponents.length === 0 ? (
            <div className="text-center p-4 text-gray-400 text-sm">
              No custom components yet
            </div>
          ) : (
            customComponents.map(component => (
              <CustomComponentItem key={component.id} component={component} />
            ))
          )}
          
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('openCustomComponentCreator'))}
            className="w-full p-2 flex items-center justify-center gap-2 text-sm
              bg-purple-400/10 hover:bg-purple-400/20 rounded-md
              border border-purple-400/30 hover:border-purple-400/50
              transition-all duration-200"
          >
            <Plus className="w-4 h-4" />
            <span>New Component</span>
          </button>
        </div>
      )}
    </div>
  );
}