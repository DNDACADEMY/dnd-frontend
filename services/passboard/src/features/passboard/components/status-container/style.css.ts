import { vars } from '@/shared/styles/theme.css'
import { style } from '@vanilla-extract/css'

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

export const cardImage = style({
  borderRadius: vars.spacing['100'],
  overflow: 'hidden'
})

export const cardinalNumber = style({
  lineHeight: '140%',
  fontSize: vars.fontSize.body2,
  fontWeight: vars.fontWeight.bold,
  color: vars.colors.gray500
})

export const cardName = style({
  lineHeight: '140%',
  fontSize: 24,
  fontWeight: vars.fontWeight.bold,
  color: vars.colors.gray900
})

export const cardTitle = style({
  fontFamily: 'DOSIyagiBoldface',
  lineHeight: '140%',
  fontSize: 40,
  fontWeight: vars.fontWeight.medium,
  color: vars.colors.gray900
})

export const cardDescription = style({
  whiteSpace: 'pre-line',
  textAlign: 'center',
  lineHeight: '140%',
  fontSize: vars.fontSize.body2,
  fontWeight: vars.fontWeight.regular,
  color: vars.colors.gray700
})

export const resultTitleContainer = style({
  position: 'absolute',
  bottom: 'calc(100% + 24px)',
  left: '50%',
  transform: 'translateX(-50%)'
})

export const titleBox = style({
  height: '45px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
})

export const title = style({
  fontSize: vars.fontSize.h4,
  fontWeight: vars.fontWeight.bold,
  color: vars.colors.white
})
