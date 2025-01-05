import React from 'react';
import { TextInput } from './inputs/TextInput';

interface ContentEditorProps {
  type: string;
  props: Record<string, any>;
  onUpdate: (props: Record<string, any>) => void;
}

export function ContentEditor({ type, props, onUpdate }: ContentEditorProps) {
  return (
    <div className="space-y-4 mb-6">
      <h4 className="text-sm font-medium text-gray-400 uppercase">Content</h4>
      
      {['heading', 'text'].includes(type) && (
        <TextInput
          label="Text Content"
          value={props.content || ''}
          onChange={(value) => onUpdate({ ...props, content: value })}
        />
      )}

      {type === 'button' && (
        <TextInput
          label="Button Text"
          value={props.text || ''}
          onChange={(value) => onUpdate({ ...props, text: value })}
        />
      )}
    </div>
  );
}