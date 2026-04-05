import { style } from '@vanilla-extract/css'

import { vars } from '../../../../styles/theme.css'

export const container = style({
  width: '100%',
  maxWidth: '340px',
  borderRadius: vars.spacing[125],
  overflow: 'hidden',
  backgroundColor: vars.colors.white
})

export const content = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: vars.spacing['050'],
  height: 105
})

export const date = style({
  fontSize: vars.fontSize.body2,
  color: vars.colors.black
})

export const description = style({
  fontSize: vars.fontSize.h6,
  fontWeight: vars.fontWeight.bold,
  color: vars.colors.black
})
