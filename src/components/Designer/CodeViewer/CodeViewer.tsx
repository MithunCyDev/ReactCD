import React from 'react';
import { Code } from 'lucide-react';
import { useCodeViewer } from './useCodeViewer';
import { CodeViewerModal } from './CodeViewerModal';
import { ComponentData } from '../../../types/designer';

interface CodeViewerProps {
  components: ComponentData[];
  onUpdate: (components: ComponentData[]) => void;
}

export function CodeViewer({ components, onUpdate }: CodeViewerProps) {
  const { 
    isOpen, 
    jsxCode, 
    openModal, 
    closeModal, 
    copyCode,
    handleCodeChange,
    handleSave,
    localComponents
  } = useCodeViewer(components, onUpdate);

  return (
    <>
      <button
        onClick={openModal}
        className="fixed bottom-4 right-4 bg-purple-400 hover:bg-purple-300 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg"
      >
        <Code className="w-4 h-4" />
        Editor
      </button>

      {isOpen && (
        <CodeViewerModal
          jsxCode={jsxCode}
          onClose={closeModal}
          onCopy={copyCode}
          onCodeChange={handleCodeChange}
          onSave={handleSave}
        />
      )}
    </>
  );
}