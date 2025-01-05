import React from 'react';
import { PropertyEditorProps } from '../../types/designer';
import { ColorPicker } from './PropertyEditorFields/ColorPicker';
import { SizeInput } from './PropertyEditorFields/SizeInput';
import { TextInput } from './PropertyEditorFields/TextInput';

export function PropertyEditor({ component, onUpdate }: PropertyEditorProps) {
  const handleStyleChange = (property: string, value: string) => {
    onUpdate({
      styles: { ...component.styles, [property]: value }
    });
  };

  return (
    <div className="h-full bg-gray-800 p-4 overflow-y-auto">
      <h3 className="text-lg font-semibold mb-4 text-gray-100">Properties</h3>
      
      <div className="space-y-4">
        <SizeInput
          label="Width"
          value={component.styles.width || ''}
          onChange={(value) => handleStyleChange('width', value)}
        />

        <SizeInput
          label="Height"
          value={component.styles.height || ''}
          onChange={(value) => handleStyleChange('height', value)}
        />

        <ColorPicker
          label="Background Color"
          value={component.styles.backgroundColor || '#1f2937'}
          onChange={(value) => handleStyleChange('backgroundColor', value)}
        />

        <ColorPicker
          label="Text Color"
          value={component.styles.color || '#ffffff'}
          onChange={(value) => handleStyleChange('color', value)}
        />

        {(component.type === 'text' || component.type === 'heading') && (
          <TextInput
            label="Content"
            value={component.props.content || ''}
            onChange={(value) => onUpdate({ props: { ...component.props, content: value } })}
          />
        )}

        {component.type === 'button' && (
          <TextInput
            label="Button Text"
            value={component.props.text || ''}
            onChange={(value) => onUpdate({ props: { ...component.props, text: value } })}
          />
        )}
      </div>
    </div>
  );
}