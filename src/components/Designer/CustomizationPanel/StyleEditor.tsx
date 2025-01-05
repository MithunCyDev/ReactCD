import React from 'react';
import { ColorInput } from './inputs/ColorInput';
import { SizeInput } from './inputs/SizeInput';
import { SpacingInput } from './inputs/SpacingInput';

interface StyleEditorProps {
  styles: Record<string, string>;
  onUpdate: (styles: Record<string, string>) => void;
}

export function StyleEditor({ styles, onUpdate }: StyleEditorProps) {
  const updateStyle = (property: string, value: string) => {
    onUpdate({ ...styles, [property]: value });
  };

  return (
    <div className="space-y-4">
      <h4 className="text-sm font-medium text-gray-400 uppercase">Appearance</h4>
      
      <ColorInput
        label="Background Color"
        value={styles.backgroundColor || '#1f2937'}
        onChange={(value) => updateStyle('backgroundColor', value)}
      />

      <ColorInput
        label="Text Color"
        value={styles.color || '#ffffff'}
        onChange={(value) => updateStyle('color', value)}
      />

      <SizeInput
        label="Width"
        value={styles.width || ''}
        onChange={(value) => updateStyle('width', value)}
      />

      <SizeInput
        label="Height"
        value={styles.height || ''}
        onChange={(value) => updateStyle('height', value)}
      />

      <SpacingInput
        label="Padding"
        value={styles.padding || '1rem'}
        onChange={(value) => updateStyle('padding', value)}
      />

      <SpacingInput
        label="Margin"
        value={styles.margin || '0'}
        onChange={(value) => updateStyle('margin', value)}
      />
    </div>
  );
}