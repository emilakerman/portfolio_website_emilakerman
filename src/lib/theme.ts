export const theme = {
  colors: {
    bg: '#0a0a0f',
    bgLight: '#12121a',
    bgCard: '#16161f',
    text: '#e4e4e7',
    textMuted: '#a1a1aa',
    textDim: '#71717a',
    accent: '#6366f1',
    accentLight: '#818cf8',
    border: '#27272a',
    borderLight: '#3f3f46',
  },
  fonts: {
    body: 'var(--font-inter)',
  },
  fontSize: {
    hero: '48px',
    h1: '36px',
    h2: '28px',
    h3: '24px',
    body: '16px',
    small: '14px',
    xs: '12px',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '48px',
    '3xl': '64px',
    '4xl': '96px',
  },
  breakpoints: {
    sm: '480px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
  radius: {
    sm: '6px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    full: '9999px',
  },
} as const;

export type Theme = typeof theme;
