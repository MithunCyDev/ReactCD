import { useState, useCallback } from 'react';
import { ComponentData } from '../../../types/designer';
import { generateJSXCode } from '../../../utils/codeGenerator';
import { parseJSXCode } from '../../../utils/codeParser';

export function useCodeViewer(
  components: ComponentData[], 
  onUpdate: (components: ComponentData[]) => void
) {
  const [isOpen, setIsOpen] = useState(false);
  const [localComponents, setLocalComponents] = useState(components);
  
  const openModal = useCallback(() => {
    setLocalComponents(components);
    setIsOpen(true);
  }, [components]);

  const closeModal = useCallback(() => setIsOpen(false), []);
  
  const jsxCode = generateJSXCode(localComponents);
  
  const copyCode = useCallback(() => {
    navigator.clipboard.writeText(jsxCode);
  }, [jsxCode]);

  const handleCodeChange = useCallback((newCode: string) => {
    try {
      const parsedComponents = parseJSXCode(newCode);
      setLocalComponents(parsedComponents);
    } catch (error) {
      console.error('Failed to parse JSX:', error);
    }
  }, []);

  const handleSave = useCallback(() => {
    onUpdate(localComponents);
  }, [localComponents, onUpdate]);

  return {
    isOpen,
    jsxCode,
    openModal,
    closeModal,
    copyCode,
    handleCodeChange,
    handleSave,
    localComponents
  };
}