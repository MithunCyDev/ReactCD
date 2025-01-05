import React, { useState } from 'react';
import { Layout } from 'lucide-react';
import { DndContext } from '@dnd-kit/core';
import { Canvas } from './components/Designer/Canvas';
import { CustomizationPanel } from './components/Designer/CustomizationPanel';
import { Sidebar } from './components/Designer/Sidebar/Sidebar';
import { LayoutSelector } from './components/Designer/LayoutOptions/LayoutSelector';
import { CodeViewer } from './components/Designer/CodeViewer/CodeViewer';
import { useComponentManager } from './hooks/useComponentManager';

export default function App() {
  const { 
    components,
    setComponents, 
    layoutSelector,
    handleDragEnd, 
    handleLayoutSelect,
    handleComponentUpdate,
    removeComponent,
    closeLayoutSelector 
  } = useComponentManager();

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedComponent = components.find(c => c.id === selectedId);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <header className="bg-gray-800 border-b border-purple-400/30">
        <div className="max-w-full mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center">
          <Layout className="w-6 h-6 mr-2 text-purple-400" />
          <h1 className="text-2xl font-bold text-gray-100">React Component Designer</h1>
        </div>
      </header>

      <div className="flex h-[calc(100vh-4rem)]">
        <DndContext onDragEnd={handleDragEnd}>
          <Sidebar />
          <main className="flex-1 h-full">
            <Canvas
              components={components}
              onSelect={setSelectedId}
              onUpdate={handleComponentUpdate}
              onRemove={removeComponent}
              selectedId={selectedId}
            />
          </main>
          <CustomizationPanel
            component={selectedComponent || null}
            onUpdate={(updates) => handleComponentUpdate(selectedId, updates)}
          />
        </DndContext>
      </div>

      <CodeViewer 
        components={components} 
        onUpdate={setComponents}
      />

      {layoutSelector && (
        <LayoutSelector
          componentId={layoutSelector.componentId}
          type={layoutSelector.type}
          onLayoutSelect={(layout) => handleLayoutSelect(layoutSelector.componentId, layout)}
          onClose={closeLayoutSelector}
        />
      )}
    </div>
  );
}