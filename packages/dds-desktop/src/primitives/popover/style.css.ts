import { style, keyframes } from '@vanilla-extract/css'

export const popoverTriggerCss = style({
  all: 'unset',
  cursor: 'pointer'
})

const fadeIn = keyframes({
  from: {
    opacity: 0,
    transform: 'scale(0.95)'
  },
  to: {
    opacity: 1,
    transform: 'scale(1)'
  }
})

const fadeOut = keyframes({
  from: {
    opacity: 1,
    transform: 'scale(1)'
  },
  to: {
    opacity: 0,
    transform: 'scale(0.95)'
  }
})

export const popoverContentCss = style({
  zIndex: 9999,
  border: 'none',
  margin: 0,
  padding: 0,
  background: 'transparent',
  animation: `${fadeIn} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,

  selectors: {
    '&:popover-open': {
      animation: `${fadeIn} 150ms cubic-bezier(0.16, 1, 0.3, 1)`
    },
    '&:not(:popover-open)': {
      animation: `${fadeOut} 150ms cubic-bezier(0.16, 1, 0.3, 1)`
    }
  }
})
