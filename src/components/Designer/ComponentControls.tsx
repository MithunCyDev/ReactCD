import React from 'react';
import { X, Move, Copy, Settings } from 'lucide-react';

interface ComponentControlsProps {
  onRemove: () => void;
  onDuplicate?: () => void;
  onSettings?: () => void;
}

export function ComponentControls({ onRemove, onDuplicate, onSettings }: ComponentControlsProps) {
  return (
    <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 bg-gray-800 rounded-md shadow-lg border border-gray-700 p-1">
      <button
        className="p-1 hover:bg-gray-700 text-gray-400 hover:text-gray-100 rounded"
        title="Move"
      >
        <Move className="w-4 h-4" />
      </button>
      {onDuplicate && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDuplicate();
          }}
          className="p-1 hover:bg-gray-700 text-gray-400 hover:text-gray-100 rounded"
          title="Duplicate"
        >
          <Copy className="w-4 h-4" />
        </button>
      )}
      {onSettings && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSettings();
          }}
          className="p-1 hover:bg-gray-700 text-gray-400 hover:text-gray-100 rounded"
          title="Settings"
        >
          <Settings className="w-4 h-4" />
        </button>
      )}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
        className="p-1 hover:bg-red-500 text-gray-400 hover:text-white rounded"
        title="Remove"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}