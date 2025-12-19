/* eslint-disable no-undef */
import { register } from '@tokens-studio/sd-transforms'
import StyleDictionary from 'style-dictionary'

register(StyleDictionary)

// JavaScript 포맷
StyleDictionary.registerFormat({
  name: 'javascript/nested-object',
  format: ({ dictionary }) => {
    const result = {}

    dictionary.allTokens.forEach((token) => {
      const path = token.path
      const category = path[0].toLowerCase()

      if (!result[category]) {
        result[category] = {}
      }

      const key = path
        .slice(1)
        .map((part, index) => {
          if (index === 0) {
            return part.toLowerCase()
          }
          return part
        })
        .join('')

      result[category][key] = token.$value || token.value
    })

    const exports = Object.entries(result)
      .map(([key, value]) => `export const ${key} = ${JSON.stringify(value, null, 2)};`)
      .join('\n\n')

    return `/**
 * Do not edit directly, this file was auto-generated.
 */

${exports}
`
  }
})

// TypeScript 타입 정의 포맷
StyleDictionary.registerFormat({
  name: 'typescript/nested-declarations',
  format: ({ dictionary }) => {
    const result = {}

    dictionary.allTokens.forEach((token) => {
      const path = token.path
      const category = path[0].toLowerCase()

      if (!result[category]) {
        result[category] = {}
      }

      const key = path
        .slice(1)
        .map((part, index) => {
          if (index === 0) {
            return part.toLowerCase()
          }
          return part
        })
        .join('')

      result[category][key] = token.$value || token.value
    })

    const declarations = Object.entries(result)
      .map(([key, value]) => {
        const type = typeof Object.values(value)[0] === 'number' ? 'number' : 'string'
        const keys = Object.keys(value)
          .map((k) => `  ${k}: ${type};`)
          .join('\n')
        return `export declare const ${key}: {\n${keys}\n};`
      })
      .join('\n\n')

    return `/**
 * Do not edit directly, this file was auto-generated.
 */

${declarations}
`
  }
})

const sd = new StyleDictionary({
  source: ['tokens/**/*.json'],
  preprocessors: ['tokens-studio'],
  platforms: {
    css: {
      transformGroup: 'tokens-studio',
      transforms: ['name/kebab'],
      buildPath: 'dist/',
      files: [
        {
          destination: 'variables.css',
          format: 'css/variables'
        }
      ]
    },
    js: {
      transformGroup: 'tokens-studio',
      buildPath: 'dist/',
      files: [
        {
          destination: 'tokens.js',
          format: 'javascript/nested-object'
        }
      ]
    },
    ts: {
      transformGroup: 'tokens-studio',
      buildPath: 'dist/',
      files: [
        {
          destination: 'tokens.d.ts',
          format: 'typescript/nested-declarations'
        }
      ]
    }
  }
})

await sd.cleanAllPlatforms()
await sd.buildAllPlatforms()

console.log('✅ Token build complete!')
