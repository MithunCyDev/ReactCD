import React, { useState, useRef, useEffect } from 'react';
import { ComponentProps } from '../../../../types/designer';

interface EditableTextProps extends ComponentProps {
  onUpdate?: (updates: Partial<ComponentProps>) => void;
}

export function EditableText({ styles, props, onUpdate }: EditableTextProps) {
  const [isEditing, setIsEditing] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isEditing && textRef.current) {
      textRef.current.focus();
      // Place cursor at the end
      const range = document.createRange();
      const selection = window.getSelection();
      const node = textRef.current.firstChild || textRef.current;
      range.setStart(node, node.textContent?.length || 0);
      range.collapse(true);
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
  }, [isEditing]);

  const handleBlur = () => {
    if (!textRef.current) return;
    
    const newContent = textRef.current.textContent || '';
    setIsEditing(false);
    
    if (onUpdate && newContent !== props.content) {
      onUpdate({ props: { ...props, content: newContent } });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      textRef.current?.blur();
    }
    e.stopPropagation();
  };

  return (
    <div 
      className="relative group"
      onClick={(e) => {
        e.stopPropagation();
        if (!isEditing) {
          setIsEditing(true);
        }
      }}
    >
      <div
        ref={textRef}
        contentEditable={isEditing}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        style={{ 
          ...styles,
          cursor: isEditing ? 'text' : 'pointer',
          minWidth: '1em',
          outline: 'none'
        }}
        className={`px-4 py-2 rounded min-h-[1em] whitespace-pre-wrap ${
          isEditing 
            ? 'ring-2 ring-blue-400' 
            : 'hover:ring-1 hover:ring-blue-400'
        }`}
        suppressContentEditableWarning
      >
        {props.content || 'Text content'}
      </div>
    </div>
  );
}