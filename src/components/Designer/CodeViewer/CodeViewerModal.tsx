import React from 'react';
import { X, Copy, Check, Save } from 'lucide-react';
import { useState } from 'react';
import { CodeEditor } from './CodeEditor';

interface CodeViewerModalProps {
  jsxCode: string;
  onClose: () => void;
  onCopy: () => void;
  onCodeChange: (code: string) => void;
  onSave: () => void;
}

export function CodeViewerModal({ jsxCode, onClose, onCopy, onCodeChange, onSave }: CodeViewerModalProps) {
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleCopy = () => {
    onCopy();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    onSave();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg w-[1000px] max-w-[90vw] max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-purple-400/30">
          <h3 className="text-lg font-semibold">Editor</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={handleSave}
              className="flex items-center gap-1 px-3 py-1 rounded bg-purple-400 hover:bg-purple-300 text-white transition-colors"
            >
              {saved ? (
                <Check className="w-4 h-4" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              {saved ? 'Saved!' : 'Save'}
            </button>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 px-3 py-1 rounded bg-purple-400 hover:bg-purple-300 text-white transition-colors"
            >
              {copied ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
              {copied ? 'Copied!' : 'Copy'}
            </button>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-700 rounded transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-hidden p-4">
          <CodeEditor 
            code={jsxCode} 
            onChange={onCodeChange}
          />
        </div>
      </div>
    </div>
  );
}