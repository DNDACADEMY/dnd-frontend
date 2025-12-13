import { vars } from '@/shared/styles/theme.css'
import { style } from '@vanilla-extract/css'

export const container = style({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%'
})

export const backdrop = style({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.2)',
  zIndex: -1
})

export const contentWrapper = style({
  width: '270px',
  borderRadius: '14px',
  backgroundColor: 'rgba(255, 255, 255, 0.82)',
  backdropFilter: 'blur(50px)',
  WebkitBackdropFilter: 'blur(50px)'
})

export const content = style({
  padding: '20px 16px 17px 16px'
})

export const border = style({
  borderTop: '0.33px solid rgba(128,128,128,0.55)',
  width: '100%'
})

export const title = style({
  fontSize: '17px',
  fontWeight: vars.fontWeight.semibold,
  color: vars.colors.mono900,
  lineHeight: '22px',
  textAlign: 'center'
})

export const description = style({
  fontSize: '13px',
  fontWeight: vars.fontWeight.medium,
  color: vars.colors.mono900,
  lineHeight: '18px',
  textAlign: 'center',
  selectors: {
    '&:not(:first-of-type)': {
      marginTop: '2px'
    }
  }
})

export const subDescription = style({
  fontSize: '13px',
  fontWeight: vars.fontWeight.medium,
  color: vars.colors.gray600,
  lineHeight: '18px',
  textAlign: 'center'
})

export const bottomAddon = style({
  cursor: 'pointer',
  width: '100%',
  minHeight: '44px',
  borderRadius: '8px',
  padding: '12px 0px'
})

export const button = style({
  fontSize: '17px',
  fontWeight: vars.fontWeight.semibold,
  color: '#007AFF',
  lineHeight: '22px'
})
