import { vars } from '@/shared/styles/theme.css'
import { style } from '@vanilla-extract/css'

export const textButtonStyle = style({
  color: vars.colors.cyan300,
  fontWeight: vars.fontWeight.bold,
  selectors: {
    '&:hover': {
      color: vars.colors.cyan800
    },
    '&:disabled': {
      color: vars.colors.gray700
    }
  }
})

export const textButtonLabelStyle = style({
  color: 'inherit',
  fontWeight: vars.fontWeight.bold
})
