import React from 'react';
import { ComponentData } from '../../types/designer';
import { DroppableContainer } from './DroppableContainer';
import { ComponentControls } from './ComponentControls';
import { Heading } from './Components/Content/Heading';
import { EditableText } from './Components/Content/EditableText';
import { Image } from './Components/Media/Image';
import { Button } from './Components/Interactive/Button';
import { Input } from './Components/Interactive/Input';
import { useCustomComponents } from '../../hooks/useCustomComponents';

interface ComponentRendererProps {
  component: ComponentData;
  onSelect: (id: string) => void;
  onUpdate: (id: string, updates: Partial<ComponentData>) => void;
  onRemove: (id: string) => void;
}

export function ComponentRenderer({ component, onSelect, onUpdate, onRemove }: ComponentRendererProps) {
  const { id, type, styles, props, children } = component;
  const { getComponentCode } = useCustomComponents();

  const renderWithControls = (content: React.ReactNode) => (
    <div className="relative group pt-8">
      <ComponentControls 
        onRemove={() => onRemove(id)}
        onDuplicate={() => {/* TODO: Implement duplicate */}}
        onSettings={() => onSelect(id)}
      />
      {content}
    </div>
  );

  // Handle custom components
  if (type === 'custom') {
    const CustomComponent = eval(getComponentCode(id));
    return renderWithControls(
      <div onClick={() => onSelect(id)}>
        <CustomComponent {...props} style={styles} />
      </div>
    );
  }

  // Layout components
  if (['container', 'grid', 'flex'].includes(type)) {
    return renderWithControls(
      <DroppableContainer 
        id={id}
        style={styles}
        minHeight="100px"
        onSelect={() => onSelect(id)}
      >
        {children.map((child) => (
          <ComponentRenderer
            key={child.id}
            component={child}
            onSelect={onSelect}
            onUpdate={onUpdate}
            onRemove={onRemove}
          />
        ))}
      </DroppableContainer>
    );
  }

  // Rest of the component rendering logic...
  const componentMap = {
    heading: Heading,
    text: EditableText,
    image: Image,
    button: Button,
    input: Input,
  };

  const Component = componentMap[type as keyof typeof componentMap];
  if (Component) {
    return renderWithControls(
      <div onClick={() => onSelect(id)}>
        <Component 
          styles={styles} 
          props={props}
          onUpdate={(updates) => onUpdate(id, updates)}
        />
      </div>
    );
  }

  return null;
}