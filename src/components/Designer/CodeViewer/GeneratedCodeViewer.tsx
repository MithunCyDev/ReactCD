import React, { useState, useEffect } from 'react';
import { Code, Copy, Check, Download } from 'lucide-react';
import { ComponentData } from '../../../types/designer';
import { generateComponentCode } from '../../../utils/componentCodeGenerator';
import { CodeEditor } from './CodeEditor';

interface GeneratedCodeViewerProps {
  components: ComponentData[];
}

export function GeneratedCodeViewer({ components }: GeneratedCodeViewerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [code, setCode] = useState('');

  useEffect(() => {
    if (isOpen) {
      const generatedCode = generateComponentCode(components);
      setCode(generatedCode);
    }
  }, [components, isOpen]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'GeneratedComponent.jsx';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-purple-500 hover:bg-purple-600 
          text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg
          transition-colors duration-200"
      >
        <Code className="w-4 h-4" />
        View Code
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg w-[1000px] max-w-[90vw] max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-purple-400/30">
              <h3 className="text-lg font-semibold text-gray-100">Generated Component Code</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-1 px-3 py-1 rounded 
                    bg-purple-500 hover:bg-purple-600 text-white transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 px-3 py-1 rounded 
                    bg-purple-500 hover:bg-purple-600 text-white transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy
                    </>
                  )}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-3 py-1 rounded bg-gray-700 hover:bg-gray-600 text-white 
                    transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-hidden p-4">
              <CodeEditor 
                code={code}
                readOnly
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}