export function calculateColumnWidth(span: number, totalColumns: number = 12): string {
  return `${(span / totalColumns) * 100}%`;
}

export function createGridStyles(type: 'container' | 'row' | 'column'): Record<string, string> {
  const baseStyles = {
    padding: '1rem',
    minHeight: '50px',
  };

  switch (type) {
    case 'container':
      return {
        ...baseStyles,
        width: '100%',
        backgroundColor: '#1f2937',
      };
    case 'row':
      return {
        ...baseStyles,
        display: 'flex',
        gap: '1rem',
        backgroundColor: '#1f2937',
      };
    case 'column':
      return {
        ...baseStyles,
        flex: '1',
        backgroundColor: '#1f2937',
      };
    default:
      return baseStyles;
  }
}