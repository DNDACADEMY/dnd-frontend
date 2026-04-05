import { recipe, type RecipeVariants } from '@vanilla-extract/recipes'

export const flexStyle = recipe({
  base: {
    display: 'flex'
  },
  variants: {
    direction: {
      row: {
        flexDirection: 'row'
      },
      column: {
        flexDirection: 'column'
      },
      rowReverse: {
        flexDirection: 'row-reverse'
      },
      columnReverse: {
        flexDirection: 'column-reverse'
      }
    },
    justify: {
      start: {
        justifyContent: 'flex-start'
      },
      end: {
        justifyContent: 'flex-end'
      },
      center: {
        justifyContent: 'center'
      },
      between: {
        justifyContent: 'space-between'
      },
      around: {
        justifyContent: 'space-around'
      }
    },
    align: {
      start: {
        alignItems: 'flex-start'
      },
      end: {
        alignItems: 'flex-end'
      },
      center: {
        alignItems: 'center'
      },
      baseline: {
        alignItems: 'baseline'
      },
      stretch: {
        alignItems: 'stretch'
      },
      auto: {
        alignItems: 'auto'
      },
      normal: {
        alignItems: 'normal'
      },
      inherit: {
        alignItems: 'inherit'
      },
      unset: {
        alignItems: 'unset'
      }
    },
    wrap: {
      nowrap: {
        flexWrap: 'nowrap'
      },
      wrap: {
        flexWrap: 'wrap'
      },
      wrapReverse: {
        flexWrap: 'wrap-reverse'
      }
    }
  }
})

export type FlexRecipeProps = RecipeVariants<typeof flexStyle>
