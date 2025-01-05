import React, { useState } from 'react';
import { X } from 'lucide-react';
import { CodeEditor } from '../../CodeViewer/CodeEditor';
import { useCustomComponents } from '../../../../hooks/useCustomComponents';

interface CustomComponentEditorProps {
  componentId: string;
  onClose: () => void;
}

export function CustomComponentEditor({ componentId, onClose }: CustomComponentEditorProps) {
  const { getComponentCode, updateComponentCode } = useCustomComponents();
  const [code, setCode] = useState(getComponentCode(componentId));

  const handleSave = () => {
    updateComponentCode(componentId, code);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg w-[1000px] max-w-[90vw] max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-purple-400/30">
          <h3 className="text-lg font-semibold">Component Editor</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-700 rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 overflow-hidden p-4">
          <CodeEditor 
            code={code}
            onChange={setCode}
          />
        </div>
        <div className="p-4 border-t border-purple-400/30 flex justify-end gap-2">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-purple-400/20 hover:bg-purple-400/30 rounded"
          >
            Save Changes
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}