import { primaryColors } from './primary-colors'
import { semanticColors } from './semantic-colors'

import type { PrimaryColors } from './primary-colors'
import type { SemanticColors } from './semantic-colors'

export const colors = {
  ...primaryColors,
  ...semanticColors
}

export type ColorTokens = PrimaryColors & SemanticColors
export { PrimaryColors, SemanticColors }
