import { style } from '@vanilla-extract/css'


export const container = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
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
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: '20px 16px 17px 16px'
})

export const border = style({
  borderTop: '0.33px solid rgba(128,128,128,0.55)',
  width: '100%'
})

export const title = style({
  lineHeight: '22px',
  textAlign: 'center'
})

export const description = style({
  lineHeight: '18px',
  textAlign: 'center',
  selectors: {
    '&:not(:first-of-type)': {
      marginTop: '2px'
    }
  }
})

export const subDescription = style({
  lineHeight: '18px',
  textAlign: 'center'
})

export const bottomAddon = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  width: '100%',
  minHeight: '44px',
  borderRadius: '8px',
  padding: '12px 0px'
})
