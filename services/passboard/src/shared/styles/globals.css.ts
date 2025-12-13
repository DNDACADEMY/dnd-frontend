import { globalStyle } from '@vanilla-extract/css'
import { vars } from './theme.css'
import * as layers from './layers.css'
import './reset.css'

globalStyle('html, body', {
  '@layer': {}
})

globalStyle('body', {
  '@layer': {
    [layers.utilities]: {
      minHeight: '100vh',
      color: vars.colors.white,
      lineHeight: '140%',
      backgroundColor: vars.colors.bgsecondary,
      fontFamily: vars.fontFamily.default,
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale'
    }
  }
})
globalStyle('*', {
  '@layer': {
    [layers.reset]: {
      listStyle: 'none',
      boxSizing: 'border-box',
      padding: 0,
      margin: 0
    }
  }
})

globalStyle('a', {
  '@layer': {
    [layers.utilities]: {
      color: 'inherit',
      textDecoration: 'none'
    }
  }
})

globalStyle('button', {
  '@layer': {
    [layers.utilities]: {
      border: 'none',
      background: 'none',
      cursor: 'pointer'
    }
  }
})

globalStyle('input', {
  '@layer': {
    [layers.utilities]: {
      border: 'none',
      background: 'none',
      cursor: 'pointer'
    }
  }
})

globalStyle('textarea', {
  '@layer': {
    [layers.utilities]: {
      border: 'none',
      background: 'none',
      cursor: 'pointer'
    }
  }
})

globalStyle('img, svg, video, canvas, audio, iframe, embed, object', {
  '@layer': {
    [layers.utilities]: {
      display: 'block'
    }
  }
})
