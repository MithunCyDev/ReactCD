import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ComponentList } from '../ComponentList';

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="relative h-full">
      <div 
        className={`h-full backdrop-blur-md bg-gray-800/30 border-r border-purple-400/30 
          transition-all duration-300 ${
          isCollapsed ? 'w-0 overflow-hidden' : 'w-72'
        }`}
      >
        <ComponentList />
      </div>
      
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-4 top-1/2 -translate-y-1/2 backdrop-blur-md bg-gray-800/30 
          border border-purple-400/30 rounded-full p-1 z-10 
          hover:bg-gray-700/50 hover:border-purple-300"
      >
        {isCollapsed ? (
          <ChevronRight className="w-4 h-4" />
        ) : (
          <ChevronLeft className="w-4 h-4" />
        )}
      </button>
    </div>
  );
}