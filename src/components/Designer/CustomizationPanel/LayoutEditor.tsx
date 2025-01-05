import React from 'react';
import { Select } from './inputs/Select';
import { SpacingInput } from './inputs/SpacingInput';
import { TextInput } from './inputs/TextInput';

interface LayoutEditorProps {
  type: string;
  styles: Record<string, string>;
  onUpdate: (styles: Record<string, string>) => void;
}

export function LayoutEditor({ type, styles, onUpdate }: LayoutEditorProps) {
  const updateStyle = (property: string, value: string) => {
    onUpdate({ ...styles, [property]: value });
  };

  return (
    <div className="space-y-4 mb-6">
      <h4 className="text-sm font-medium text-gray-400 uppercase">Layout</h4>
      
      {type === 'flex' && (
        <>
          <Select
            label="Direction"
            value={styles.flexDirection || 'row'}
            options={[
              { value: 'row', label: 'Row' },
              { value: 'column', label: 'Column' },
            ]}
            onChange={(value) => updateStyle('flexDirection', value)}
          />

          <Select
            label="Justify Content"
            value={styles.justifyContent || 'flex-start'}
            options={[
              { value: 'flex-start', label: 'Start' },
              { value: 'center', label: 'Center' },
              { value: 'flex-end', label: 'End' },
              { value: 'space-between', label: 'Space Between' },
              { value: 'space-around', label: 'Space Around' },
            ]}
            onChange={(value) => updateStyle('justifyContent', value)}
          />

          <Select
            label="Align Items"
            value={styles.alignItems || 'stretch'}
            options={[
              { value: 'stretch', label: 'Stretch' },
              { value: 'flex-start', label: 'Start' },
              { value: 'center', label: 'Center' },
              { value: 'flex-end', label: 'End' },
            ]}
            onChange={(value) => updateStyle('alignItems', value)}
          />
        </>
      )}

      {type === 'grid' && (
        <>
          <TextInput
            label="Grid Template Columns"
            value={styles.gridTemplateColumns || ''}
            placeholder="e.g., 1fr 1fr"
            onChange={(value) => updateStyle('gridTemplateColumns', value)}
          />

          <TextInput
            label="Grid Template Rows"
            value={styles.gridTemplateRows || ''}
            placeholder="e.g., auto auto"
            onChange={(value) => updateStyle('gridTemplateRows', value)}
          />
        </>
      )}

      <SpacingInput
        label="Gap"
        value={styles.gap || '1rem'}
        onChange={(value) => updateStyle('gap', value)}
      />
    </div>
  );
}