import { vars } from '@/shared/styles/theme.css'
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes'
import { style } from '@vanilla-extract/css'

const baseStyle = style({
  width: '100%',
  fontWeight: vars.fontWeight.regular,
  color: vars.colors.black,
  backgroundColor: vars.colors.mono000,
  borderRadius: vars.borderRadius.medium,
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: vars.colors.gray300,
  lineHeight: '140%',
  transition: 'border-color 0.2s ease-in-out',
  outline: 'none',
  selectors: {
    '&::placeholder': {
      color: vars.colors.gray300
    },
    '&:focus-within': {
      borderColor: vars.colors.cyan300
    },
    '&:disabled': {
      pointerEvents: 'none',
      backgroundColor: vars.colors.gray100,
      color: vars.colors.gray300,
      borderColor: vars.colors.gray300
    },
    '&:-webkit-autofill': {
      boxShadow: `0 0 0 1000px ${vars.colors.mono000} inset`,
      WebkitTextFillColor: vars.colors.black,
      transition: 'background-color 5000s ease-in-out 0s'
    },
    '&:-webkit-autofill:focus': {
      boxShadow: `0 0 0 1000px ${vars.colors.mono000} inset`,
      WebkitTextFillColor: vars.colors.black
    },
    '&:-webkit-autofill:hover': {
      boxShadow: `0 0 0 1000px ${vars.colors.mono000} inset`,
      WebkitTextFillColor: vars.colors.black
    }
  }
})

export const textfieldStyle = recipe({
  base: baseStyle,
  variants: {
    size: {
      medium: {
        fontSize: vars.fontSize.caption1,
        padding: '8px 16px'
      },
      large: {
        fontSize: vars.fontSize.caption1,
        padding: '12px 16px'
      },
      xlarge: {
        fontSize: vars.fontSize.body2,
        padding: '14px 16px'
      }
    },
    error: {
      true: {
        borderColor: vars.colors.side400
      }
    }
  }
})

export type TextfieldRecipeProps = RecipeVariants<typeof textfieldStyle>
