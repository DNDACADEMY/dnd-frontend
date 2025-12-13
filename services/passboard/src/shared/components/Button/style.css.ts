import { vars } from '@/shared/styles/theme.css'
import { style } from '@vanilla-extract/css'
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes'

export const buttonStyle = style({
  width: '100%',
  color: vars.colors.gray900,
  fontSize: vars.fontSize.body2,
  fontWeight: vars.fontWeight.bold,
  lineHeight: '140%',
  backgroundColor: vars.colors.cyan300,
  borderRadius: vars.borderRadius.medium,
  border: 'none',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
  selectors: {
    '&:hover': {
      backgroundColor: vars.colors.cyan400
    },
    '&:pressed': {
      backgroundColor: vars.colors.cyan500
    },
    '&:disabled': {
      backgroundColor: vars.colors.gray400,
      color: vars.colors.gray500,
      cursor: 'not-allowed'
    }
  }
})

export const buttonRecipe = recipe({
  base: buttonStyle,
  variants: {
    size: {
      medium: {
        padding: '8px 16px'
      },
      large: {
        padding: '12px 16px'
      },
      xlarge: {
        padding: '14px 24px'
      }
    }
  }
})

export type ButtonRecipeProps = RecipeVariants<typeof buttonRecipe>
