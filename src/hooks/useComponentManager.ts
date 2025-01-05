import { useState } from 'react';
import { DragEndEvent } from '@dnd-kit/core';
import { v4 as uuidv4 } from 'uuid';
import { ComponentData } from '../types/designer';
import { createDefaultStyles, createLayoutStyles } from '../utils/styleUtils';

export function useComponentManager() {
  const [components, setComponents] = useState<ComponentData[]>([]);
  const [layoutSelector, setLayoutSelector] = useState<{
    componentId: string;
    type: 'grid' | 'flex';
  } | null>(null);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!active || !over) return;

    const isNewComponent = active.id.toString().startsWith('new-');
    const targetId = over.id.toString().replace(/^droppable-/, '');
    
    if (isNewComponent) {
      const componentType = active.data?.current?.type;
      if (!componentType) return;
      
      const newComponent: ComponentData = {
        id: uuidv4(),
        type: componentType,
        props: {},
        children: [],
        styles: createDefaultStyles(componentType)
      };

      if (over.id === 'canvas') {
        setComponents([...components, newComponent]);
        
        if (componentType === 'grid' || componentType === 'flex') {
          setLayoutSelector({
            componentId: newComponent.id,
            type: componentType
          });
        }
      } else {
        setComponents(updateComponentDeep(components, targetId, (comp) => ({
          ...comp,
          children: [...comp.children, newComponent]
        })));
      }
    }
  };

  const duplicateComponent = (componentId: string) => {
    const findAndDuplicate = (comps: ComponentData[]): [ComponentData[], ComponentData | null] => {
      for (const comp of comps) {
        if (comp.id === componentId) {
          const duplicate = {
            ...JSON.parse(JSON.stringify(comp)),
            id: uuidv4(),
            children: comp.children.map(child => ({
              ...child,
              id: uuidv4()
            }))
          };
          return [[...comps, duplicate], duplicate];
        }
        if (comp.children.length > 0) {
          const [newChildren, duplicated] = findAndDuplicate(comp.children);
          if (duplicated) {
            return [
              comps.map(c => c.id === comp.id ? { ...c, children: newChildren } : c),
              duplicated
            ];
          }
        }
      }
      return [comps, null];
    };

    const [newComponents, duplicated] = findAndDuplicate(components);
    if (duplicated) {
      setComponents(newComponents);
    }
  };

  const removeComponent = (componentId: string) => {
    const removeComponentDeep = (comps: ComponentData[]): ComponentData[] => {
      return comps.filter(comp => {
        if (comp.id === componentId) return false;
        if (comp.children.length > 0) {
          comp.children = removeComponentDeep(comp.children);
        }
        return true;
      });
    };

    setComponents(removeComponentDeep(components));
  };

  const handleLayoutSelect = (componentId: string, layoutType: string) => {
    setComponents(components.map(comp => {
      if (comp.id === componentId) {
        return {
          ...comp,
          styles: createLayoutStyles(layoutType),
          children: Array(layoutType.includes('columns') ? parseInt(layoutType) : 0)
            .fill(null)
            .map(() => ({
              id: uuidv4(),
              type: 'column',
              props: {},
              children: [],
              styles: createDefaultStyles('column')
            }))
        };
      }
      return comp;
    }));
    setLayoutSelector(null);
  };

  return {
    components,
    layoutSelector,
    handleDragEnd,
    handleLayoutSelect,
    removeComponent,
    duplicateComponent,
    handleComponentUpdate: (componentId: string | null, updates: Partial<ComponentData>) => {
      if (!componentId) return;
      setComponents(prevComponents => 
        updateComponentDeep(prevComponents, componentId, comp => ({ ...comp, ...updates }))
      );
    },
    closeLayoutSelector: () => setLayoutSelector(null)
  };
}

function updateComponentDeep(
  components: ComponentData[], 
  targetId: string, 
  updateFn: (comp: ComponentData) => ComponentData
): ComponentData[] {
  return components.map(comp => {
    if (comp.id === targetId) {
      return updateFn(comp);
    }
    if (comp.children.length > 0) {
      return {
        ...comp,
        children: updateComponentDeep(comp.children, targetId, updateFn)
      };
    }
    return comp;
  });
}