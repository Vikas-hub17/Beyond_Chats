// src/theme.js
export const theme = {
  borderRadius: {
    xl: '16px',
    lg: '12px',
    md: '8px',
    sm: '4px'
  },
  colors: {
    success: '#4CAF50',
    successLight: '#e8f5e9',
    errorLight: '#ffebee',
    primaryDark: '#1565c0',
    primary: '#2196F3',
    white: '#ffffff',
    background: '#ffffff',
    backgroundSecondary: '#f8f9fa',
    textPrimary: '#1a1a1a',
    textSecondary: '#666666',
    border: '#e0e0e0',
    gray: {
      300: '#e0e0e0'
    }
  },
  spacing: {
    xl: '2rem',
    lg: '1.5rem',
    md: '1rem',
    sm: '0.5rem'
  },
  breakpoints: {
    mobile: '768px'
  },
  shadow: {
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
  },
  button: {
    primary: `
      background: #2196F3;
      color: white;
      border: none;
      border-radius: 8px;
      padding: 0.75rem 1.5rem;
    `,
    disabled: `
      background: #e0e0e0;
      color: #666666;
      cursor: not-allowed;
    `
  },
  alert: {
    error: `
      padding: 1rem;
      background: #ffebee;
      color: #c62828;
      border-radius: 4px;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    `
  }
};