import { vars } from '@/shared/styles/theme.css'
import { style } from '@vanilla-extract/css'
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes'

export const labelStyle = style({
  color: vars.colors.mono900,
  fontSize: vars.fontSize.body2,
  lineHeight: '140%'
})

export const requiredStyle = style({
  marginLeft: '2px',
  fontSize: vars.fontSize.body2,
  color: vars.colors.side400,
  lineHeight: '140%'
})

export const bottomTextRecipe = recipe({
  base: {
    fontSize: vars.fontSize.caption1,
    lineHeight: '140%'
  },
  variants: {
    state: {
      default: {
        color: vars.colors.gray700
      },
      error: {
        color: vars.colors.side400
      },
      info: {
        color: vars.colors.cyan300
      }
    }
  }
})

export type BottomTextRecipeProps = RecipeVariants<typeof bottomTextRecipe>
