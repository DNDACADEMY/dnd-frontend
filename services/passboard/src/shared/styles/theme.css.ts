import { createGlobalTheme } from '@vanilla-extract/css'

export const vars = createGlobalTheme(':root', {
  colors: {
    primary: '#00d3f2',
    secondary: '#9660ff',
    tertiary: '#ff6b61',
    bgprimary: '#eff1f4',
    bgsecondary: '#13161c',
    warning: '#ffb23e',
    warningDark: '#2b261f',
    success: '#67d330',
    successDark: '#1b291e',
    error: '#ff7878',
    errorDark: '#2b2025',
    info: '#00d3f2',
    infoDark: '#112931',
    white: '#fff',
    black: '#000',
    cyan050: '#DEF7FD',
    cyan100: '#ACECFA',
    cyan200: '#70DFF7',
    cyan300: '#00D3F2',
    cyan400: '#00CBEE',
    cyan500: '#00BEE8',
    cyan600: '#00AED4',
    cyan700: '#0099B8',
    cyan800: '#00859F',
    cyan900: '#006371',
    side400: '#FF6C61',
    gray100: '#EDEEF0',
    gray300: '#D3D4D6',
    gray400: '#C5C6C8',
    gray500: '#909192',
    gray600: '#5E6163',
    gray700: '#404246',
    gray800: '#292C31',
    gray900: '#13161C',
    mono000: '#FFFFFF',
    mono900: '#000000'
  },
  fontSize: {
    h1: '56px',
    h2: '48px',
    h2LetterSpacing: '-0.48px',
    h3: '44px',
    h3LetterSpacing: '-0.44px',
    h4: '32px',
    h5: '24px',
    h6: '20px',
    body1: '16px',
    body2: '14px',
    caption1: '12px',
    caption2: '10px'
  },
  spacing: {
    '000': '0px',
    '010': '1px',
    '020': '2px',
    '025': '4px',
    '050': '8px',
    '060': '10px',
    '075': '12px',
    '100': '16px',
    '125': '20px',
    '150': '24px',
    '200': '32px',
    '250': '40px',
    '300': '48px',
    '350': '56px',
    '450': '72px'
  },
  borderRadius: {
    none: '0px',
    xsmall: '1px',
    small: '2px',
    medium: '4px',
    large: '8px',
    xlarge: '12px',
    xxlarge: '16px',
    max: '1000px'
  },
  fontFamily: {
    default:
      "Pretendard, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif"
  },
  fontWeight: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800'
  }
})

export type Colors = typeof vars.colors
export type FontFamily = typeof vars.fontFamily
export type FontSize = typeof vars.fontSize
