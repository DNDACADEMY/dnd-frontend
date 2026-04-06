import { style } from '@vanilla-extract/css'

import { vars } from '../../styles/theme.css'

export const textButtonStyle = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing['050'],
  color: vars.colors.cyan300,
  selectors: {
    '&:hover': {
      color: vars.colors.cyan800
    },
    '&:disabled': {
      color: vars.colors.gray700
    }
  }
})
