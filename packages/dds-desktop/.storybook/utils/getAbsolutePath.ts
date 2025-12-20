import { dirname } from 'path'
import { fileURLToPath } from 'url'

export const getAbsolutePath = (value: string): string => {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)))
}
