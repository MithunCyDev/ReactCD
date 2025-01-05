import React from 'react';
import { Grid2X2, Columns, Rows, Grid3X3, AlignHorizontalSpaceBetween } from 'lucide-react';
import { ComponentData } from '../../../types/designer';

interface LayoutSelectorProps {
  componentId: string;
  type: 'grid' | 'flex';
  onLayoutSelect: (layout: string) => void;
  onClose: () => void;
}

export function LayoutSelector({ componentId, type, onLayoutSelect, onClose }: LayoutSelectorProps) {
  const layouts = type === 'grid' ? [
    { id: '2-columns', icon: Grid2X2, label: '2 Columns' },
    { id: '3-columns', icon: Grid3X3, label: '3 Columns' },
    { id: '4-columns', icon: Grid2X2, label: '4 Columns' },
  ] : [
    { id: 'row', icon: Rows, label: 'Row' },
    { id: 'column', icon: Columns, label: 'Column' },
    { id: 'space-between', icon: AlignHorizontalSpaceBetween, label: 'Space Between' },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-96">
        <h3 className="text-lg font-semibold mb-4">Select Layout Type</h3>
        <div className="grid grid-cols-3 gap-4">
          {layouts.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => {
                onLayoutSelect(id);
                onClose();
              }}
              className="flex flex-col items-center p-4 rounded-lg border border-gray-700 
                hover:border-blue-500 hover:bg-gray-700 transition-colors"
            >
              <Icon className="w-8 h-8 mb-2" />
              <span className="text-sm">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}