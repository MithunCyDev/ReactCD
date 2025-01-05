import { ComponentData } from '../types/designer';

// Generate clean imports
function generateImports(components: ComponentData[]): string {
  const imports = ['import React from "react"', 'import { useState } from "react"'];
  return imports.join(';\n') + ';\n';
}

// Convert styles object to CSS-in-JS format
function styleObjectToString(styles: Record<string, string>): string {
  if (!Object.keys(styles).length) return '';
  return Object.entries(styles)
    .map(([key, value]) => `  ${key}: '${value}'`)
    .join(',\n');
}

// Get component name from props or type
function getComponentName(component: ComponentData): string {
  return component.props.componentName || 
    (component.type.charAt(0).toUpperCase() + component.type.slice(1));
}

// Generate clean component code
function generateCleanComponent(component: ComponentData): string {
  const componentName = getComponentName(component);
  const styles = styleObjectToString(component.styles);
  
  return `
export function ${componentName}({ 
  children,
  className,
  style,
  ...props 
}) {
  const baseStyles = {
${styles}
  };

  return (
    <div 
      className={\`${component.props.className || ''} \${className || ''}\`}
      style={{ ...baseStyles, ...style }}
      {...props}
    >
      {children}
    </div>
  );
}

${componentName}.defaultProps = {
  className: '',
  style: {}
};`;
}

// Generate example usage with all common props
function generateExampleUsage(component: ComponentData): string {
  const componentName = getComponentName(component);
  
  return `
// Example usage:
function Example() {
  return (
    <${componentName}
      className="custom-class"
      style={{ /* Custom styles */ }}
      onClick={() => console.log('Clicked!')}
    >
      {/* Component content */}
    </${componentName}>
  );
}`;
}

// Generate TypeScript types for the component
function generateTypes(component: ComponentData): string {
  const componentName = getComponentName(component);
  
  return `
interface ${componentName}Props extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}`;
}

// Main code generation function
export function generateComponentCode(components: ComponentData[]): string {
  const imports = generateImports(components);
  
  const componentCode = components.map(component => {
    const types = generateTypes(component);
    const componentDefinition = generateCleanComponent(component);
    const exampleUsage = generateExampleUsage(component);
    
    return `${types}\n${componentDefinition}\n${exampleUsage}`;
  }).join('\n\n');

  return `${imports}\n${componentCode}\n`;
}