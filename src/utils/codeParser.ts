import { ComponentData } from '../types/designer';
import { v4 as uuidv4 } from 'uuid';

export function parseJSXCode(code: string): ComponentData[] {
  try {
    // Remove imports and exports
    const jsx = code
      .replace(/import.*?;\n/g, '')
      .replace(/export default.*?{\s*return\s*\(/s, '')
      .replace(/\s*\);\s*}/s, '')
      .trim();

    return parseJSXElement(jsx);
  } catch (error) {
    console.error('Failed to parse JSX:', error);
    return [];
  }
}

function parseJSXElement(jsx: string): ComponentData[] {
  const components: ComponentData[] = [];
  let currentElement = '';
  let depth = 0;

  for (let i = 0; i < jsx.length; i++) {
    const char = jsx[i];

    if (char === '<' && jsx[i + 1] !== '/') {
      depth++;
    } else if (char === '>' && jsx[i - 1] === '/') {
      depth--;
    } else if (char === '<' && jsx[i + 1] === '/') {
      depth--;
    }

    currentElement += char;

    if (depth === 0 && currentElement.trim()) {
      const component = parseComponent(currentElement.trim());
      if (component) {
        components.push(component);
      }
      currentElement = '';
    }
  }

  return components;
}

function parseComponent(jsx: string): ComponentData | null {
  const typeMatch = jsx.match(/<([A-Z][a-zA-Z]*)/);
  if (!typeMatch) return null;

  const type = typeMatch[1].toLowerCase();
  const styleMatch = jsx.match(/style={\s*{([^}]*)}\s*}/);
  const styles = styleMatch ? parseStyles(styleMatch[1]) : {};
  
  const contentMatch = jsx.match(/>([^<]*)</);
  const props = contentMatch ? { content: contentMatch[1].trim() } : {};

  const childrenMatch = jsx.match(/>(.+)</s);
  const children = childrenMatch ? parseJSXElement(childrenMatch[1]) : [];

  return {
    id: uuidv4(),
    type,
    props,
    styles,
    children
  };
}

function parseStyles(stylesStr: string): Record<string, string> {
  const styles: Record<string, string> = {};
  const styleEntries = stylesStr.split(',').map(s => s.trim());

  for (const entry of styleEntries) {
    const [key, value] = entry.split(':').map(s => s.trim());
    if (key && value) {
      styles[key] = value.replace(/'/g, '');
    }
  }

  return styles;
}
