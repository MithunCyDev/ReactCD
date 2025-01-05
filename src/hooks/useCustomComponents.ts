import { useState, useEffect, useCallback } from 'react';
import { Box } from 'lucide-react';
import { CustomComponent } from '../types/designer';
import { componentDB } from '../services/indexedDB';
import { v4 as uuidv4 } from 'uuid';

const DEFAULT_COMPONENT_CODE = `import React from 'react';

export default function CustomComponent(props) {
  return (
    <div {...props}>
      New Custom Component
    </div>
  );
}`;

export function useCustomComponents() {
  const [customComponents, setCustomComponents] = useState<CustomComponent[]>([]);
  const [activeComponentId, setActiveComponentId] = useState<string | null>(null);

  const loadComponents = useCallback(async () => {
    try {
      const components = await componentDB.getAll();
      setCustomComponents(components.map(c => ({
        id: c.id,
        label: c.name,
        icon: Box
      })));
    } catch (error) {
      console.error('Failed to load components:', error);
    }
  }, []);

  useEffect(() => {
    loadComponents();
  }, [loadComponents]);

  const addCustomComponent = async (name: string) => {
    const id = uuidv4();
    const newComponent = {
      id,
      name,
      code: DEFAULT_COMPONENT_CODE,
      lastModified: Date.now()
    };

    try {
      await componentDB.save(newComponent);
      setCustomComponents(prev => [...prev, {
        id,
        label: name,
        icon: Box
      }]);
    } catch (error) {
      console.error('Failed to add component:', error);
      throw error;
    }
  };

  const deleteComponent = async (id: string) => {
    try {
      setCustomComponents(prev => prev.filter(comp => comp.id !== id));
      await componentDB.delete(id);
      
      if (activeComponentId === id) {
        setActiveComponentId(null);
      }
    } catch (error) {
      console.error('Failed to delete component:', error);
      loadComponents();
      throw error;
    }
  };

  const getComponentCode = (id: string) => {
    // This should be implemented to fetch the component code from IndexedDB
    return DEFAULT_COMPONENT_CODE;
  };

  const updateComponentCode = async (id: string, code: string) => {
    try {
      const component = await componentDB.get(id);
      if (component) {
        await componentDB.save({
          ...component,
          code,
          lastModified: Date.now()
        });
      }
    } catch (error) {
      console.error('Failed to update component code:', error);
      throw error;
    }
  };

  return {
    customComponents,
    activeComponentId,
    setActiveComponentId,
    addCustomComponent,
    deleteComponent,
    getComponentCode,
    updateComponentCode,
  };
}