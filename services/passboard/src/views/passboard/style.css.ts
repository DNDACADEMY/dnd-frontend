import { style } from '@vanilla-extract/css'

import { vars } from '../../styles/theme.css'

export const container = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  gap: vars.spacing['150'],
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
