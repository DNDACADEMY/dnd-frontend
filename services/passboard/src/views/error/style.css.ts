import { style } from '@vanilla-extract/css'

import { vars } from '../../styles/theme.css'
export const container = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: vars.spacing['100'],
  minHeight: '100vh',
  textAlign: 'center'
})

export const title = style({
  fontSize: vars.fontSize.h4,
  fontWeight: vars.fontWeight.bold,
  marginBottom: '16px'
})

export const description = style({
  fontSize: vars.fontSize.body1
})
