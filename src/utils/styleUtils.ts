export function createDefaultStyles(type: string): Record<string, string> {
  const baseStyles = {
    padding: '1rem',
    minHeight: '50px',
  };

  switch (type) {
    case 'container':
    case 'grid':
    case 'flex':
      return {
        ...baseStyles,
        width: '100%',
        backgroundColor: '#1f2937',
        border: '1px dashed #4b5563',
      };
    case 'column':
      return {
        ...baseStyles,
        flex: '1',
        backgroundColor: '#1f2937',
        border: '1px dashed #4b5563',
      };
    case 'heading':
      return {
        ...baseStyles,
        color: '#e5e7eb',
        fontSize: '2rem',
        fontWeight: 'bold',
      };
    // ... other component types remain the same
    default:
      return baseStyles;
  }
}

export function createLayoutStyles(layoutType: string): Record<string, string> {
  const baseStyles = createDefaultStyles('container');
  
  if (layoutType.includes('columns')) {
    const columns = parseInt(layoutType);
    return {
      ...baseStyles,
      display: 'grid',
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      gap: '1rem',
    };
  }
  
  if (layoutType === 'row') {
    return {
      ...baseStyles,
      display: 'flex',
      flexDirection: 'row',
      gap: '1rem',
    };
  }
  
  if (layoutType === 'column') {
    return {
      ...baseStyles,
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
    };
  }
  
  if (layoutType === 'space-between') {
    return {
      ...baseStyles,
      display: 'flex',
      justifyContent: 'space-between',
      gap: '1rem',
    };
  }
  
  return baseStyles;
}