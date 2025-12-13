import { style } from '@vanilla-extract/css'

export const container = style({
  minHeight: '100vh',
  padding: '90px 0'
})

export const tryAgainTextButtonBox = style({
  position: 'relative',
  zIndex: 1001,
  marginTop: '24px',
  display: 'flex',
  justifyContent: 'center'
})
