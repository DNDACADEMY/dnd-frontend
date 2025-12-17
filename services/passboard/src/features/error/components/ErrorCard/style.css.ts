import { style } from '@vanilla-extract/css'

import { vars } from '@/shared/styles/theme.css'

export const container = style({
  position: 'relative',
  width: '100%',
  maxWidth: '340px',
  margin: '0 18px',
  borderRadius: 20,
  overflow: 'hidden'
})

export const text = style({
  position: 'absolute',
  left: 0,
  bottom: 36,
  width: '100%',
  textAlign: 'center',
  fontSize: vars.fontSize.body1,
  fontWeight: vars.fontWeight.regular,
  color: vars.colors.gray800,
  whiteSpace: 'pre-line'
})
