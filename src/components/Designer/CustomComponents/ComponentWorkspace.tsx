import React from 'react';
import { useCustomComponents } from '../../../hooks/useCustomComponents';
import { Canvas } from '../Canvas';
import { ComponentList } from '../ComponentList';
import { CustomComponentMenubar } from './Menubar/CustomComponentMenubar';
import { CustomComponentEditor } from './Editor/CustomComponentEditor';

export function ComponentWorkspace() {
  const { 
    activeComponentId,
    setActiveComponentId,
    customComponents
  } = useCustomComponents();

  const activeComponent = customComponents.find(c => c.id === activeComponentId);

  return (
    <div className="flex h-full">
      <ComponentList />
      
      <main className="flex-1 relative">
        {activeComponent ? (
          <Canvas
            key={activeComponent.id}
            componentId={activeComponent.id}
          />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-400">
            Select a component to start editing
          </div>
        )}
      </main>

      <CustomComponentMenubar
        onSelectComponent={setActiveComponentId}
      />

      {activeComponentId && (
        <CustomComponentEditor
          componentId={activeComponentId}
          onClose={() => setActiveComponentId(null)}
        />
      )}
    </div>
  );
}