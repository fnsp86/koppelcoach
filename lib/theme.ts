/**
 * Theme constants for the Samen app.
 * These mirror the Tailwind config so they can be used in style props
 * where NativeWind classes aren't practical.
 */

export const colors = {
  terracotta: {
    DEFAULT: '#C4704B',
    light: '#D4896A',
    dark: '#A85A38',
  },
  salie: {
    DEFAULT: '#7A9E7E',
    light: '#95B598',
    dark: '#5F8263',
  },
  goud: {
    DEFAULT: '#D4A843',
    light: '#E0BE6A',
    dark: '#B8902E',
  },
  oceaan: {
    DEFAULT: '#5B8FA8',
    light: '#7AAABE',
    dark: '#467A93',
  },
  zand: {
    DEFAULT: '#E8DDD3',
    light: '#F2EBE4',
    dark: '#D6C8BA',
  },
  warmwit: '#FBF9F6',
  nachtblauw: '#1B2838',
  leisteen: '#2A3444',
} as const;

export const textColors = {
  light: {
    primary: colors.nachtblauw,
    secondary: colors.leisteen,
    muted: '#6B7C8F',
    inverse: '#FFFFFF',
  },
  dark: {
    primary: '#F5F5F5',
    secondary: '#C8CDD3',
    muted: '#8896A4',
    inverse: colors.nachtblauw,
  },
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
} as const;

export const radii = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;

export const fontSizes = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 22,
  '2xl': 28,
  '3xl': 34,
} as const;
