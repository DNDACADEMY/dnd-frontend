import { primitive, semantic } from '@dds/token'
import { style } from '@vanilla-extract/css'

export const fieldboxContainerCss = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px'
})

export const fieldboxContentCss = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '8px',
  padding: '13px 16px',

  borderRadius: 6,
  backgroundColor: primitive.color.mono000,
  boxShadow: `0px 0px 0px 1px ${semantic.color.borderStrong}`
})

export const bottomTxtCss = style({
  margin: 0
})

export const requiredStyleCss = style({
  marginLeft: '2px',
  color: semantic.color.badgeRed
})
