import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

import { vars } from '../../../../styles/theme.css'

export const wrapper = style({
  position: 'relative',
  width: '100%',
  paddingLeft: vars.spacing['050'],
  paddingRight: vars.spacing['050'],
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
})

export const container = style({
  width: '100%',
  maxWidth: '340px',
  padding: vars.spacing['150'],
  borderRadius: vars.spacing['125'],
  backgroundColor: vars.colors.white,
  overflow: 'hidden'
})

export const cardWrapper = style({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  gap: vars.spacing['125']
})

export const cardTextGroup = style({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  gap: vars.spacing['025']
})

export const formContainer = style({
  overflow: 'hidden'
})

export const formContent = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing['200']
})

export const cardImage = style({
  borderRadius: vars.spacing['100'],
  overflow: 'hidden'
})

export const cardTitle = style({
  fontFamily: 'DOSIyagiBoldface',
  lineHeight: '140%',
  fontSize: 40,
  fontWeight: vars.fontWeight.medium,
  color: vars.colors.gray900
})

export const lineHeight140 = style({ lineHeight: '140%' })

export const cardDescription = style({
  whiteSpace: 'pre-line',
  textAlign: 'center',
  lineHeight: '140%'
})

export const resultTitleContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: vars.spacing['050'],
  position: 'absolute',
  bottom: 'calc(100% + 24px)',
  left: '50%',
  transform: 'translateX(-50%)'
})

export const logoBox = recipe({
  base: {
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    aspectRatio: '32 / 36'
  },
  variants: {
    hasEvent: {
      true: {
        height: 24,
        width: 24 * (32 / 36)
      },
      false: {
        height: 36,
        width: 32
      }
    }
  }
})

export const titleBox = style({
  height: '45px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
})

export const logoImage = style({
  width: '100%',
  height: '100%',
  objectFit: 'contain',
  display: 'block'
})

export const firecracker = style({
  position: 'fixed',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
  zIndex: 1000
})

export const tryAgainTextButtonBox = style({
  position: 'relative',
  zIndex: 1001,
  marginTop: '24px',
  display: 'flex',
  justifyContent: 'center'
})
