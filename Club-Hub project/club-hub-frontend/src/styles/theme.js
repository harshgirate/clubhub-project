export const theme = {
  colors: {
    primary: '#001f3f',      // Navy blue
    secondary: '#0056b3',    // Lighter blue
    accent: '#52ab98',       // Teal accent
    white: '#ffffff',
    gray: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
    }
  },
  shadows: {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
    '2xl': 'shadow-2xl',
  },
  gradients: {
    primary: 'bg-gradient-to-r from-[#001f3f] to-[#0056b3]',
    secondary: 'bg-gradient-to-r from-blue-600 to-blue-400',
    dark: 'bg-gradient-to-b from-[#001f3f] to-[#00152b]',
  },
  transitions: {
    default: 'transition-all duration-300',
    slow: 'transition-all duration-500',
    fast: 'transition-all duration-150',
  }
}; 