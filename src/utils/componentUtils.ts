import { ComponentData } from '../types/designer';

export function createCustomComponent(name: string): ComponentData {
  return {
    id: `custom-${name.toLowerCase()}`,
    type: 'custom',
    props: {
      componentName: name
    },
    children: [],
    styles: {
      padding: '1rem',
      minHeight: '50px',
      backgroundColor: '#1f2937',
      border: '1px dashed #4b5563'
    }
  };
}