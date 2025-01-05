import { ComponentData } from '../types/designer';

function styleObjectToString(styles: Record<string, string>): string {
  if (!Object.keys(styles).length) return '';
  const styleString = Object.entries(styles)
    .map(([key, value]) => `  ${key}: '${value}'`)
    .join(',\n');
  return `{\n${styleString}\n}`;
}

function generateProps(component: ComponentData): string {
  const props: string[] = [];
  
  if (Object.keys(component.styles).length) {
    props.push(`style={${styleObjectToString(component.styles)}}`);
  }
  
  if (component.props.className) {
    props.push(`className="${component.props.className}"`);
  }
  
  return props.length ? ` ${props.join(' ')}` : '';
}

function getComponentContent(component: ComponentData): string {
  if (component.props.content) return component.props.content;
  if (component.props.text) return component.props.text;
  return '';
}

function generateComponentJSX(component: ComponentData, indent: number = 0): string {
  const spaces = '  '.repeat(indent);
  const componentName = component.props.componentName || 'MyComponent';
  const props = generateProps(component);
  const content = getComponentContent(component);
  
  if (component.children.length === 0) {
    if (content) {
      return `${spaces}<div${props}>${content}</div>`;
    }
    return `${spaces}<div${props} />`;
  }

  const childrenJSX = component.children
    .map(child => generateComponentJSX(child, indent + 1))
    .join('\n');

  return `${spaces}<div${props}>\n${childrenJSX}\n${spaces}</div>`;
}

export function generateJSXCode(components: ComponentData[]): string {
  const imports = `import React from 'react';\n\n`;
  const componentName = components[0]?.props.componentName || 'MyComponent';
  const componentCode = components.map(comp => generateComponentJSX(comp)).join('\n');
  
  return `${imports}export default function ${componentName}() {\n  return (\n${componentCode}\n  );\n}`;
}