import { primaryColors } from './primary-colors'

export const semanticColors = {
  primary: primaryColors.cyan300,
  secondary: '#9660ff',
  tertiary: '#ff6b61',
  bgPrimary: '#eff1f4',
  bgSecondary: '#13161c',
  warning: '#ffb23e',
  warningDark: '#2b261f',
  success: '#67d330',
  successDark: '#1b291e',
  error: '#ff7878',
  errorDark: '#2b2025',
  info: '#00d3f2',
  infoDark: '#112931'
} as const

export type SemanticColors = typeof semanticColors
