import { type ReactNode } from 'react'
import { bottomTextRecipe, type BottomTextRecipeProps } from '../style.css'

export type BottomTextProps = {
  children: ReactNode
} & BottomTextRecipeProps

export const BottomText = ({ children, state = 'default' }: BottomTextProps) => {
  return <p className={bottomTextRecipe({ state })}>{children}</p>
}
