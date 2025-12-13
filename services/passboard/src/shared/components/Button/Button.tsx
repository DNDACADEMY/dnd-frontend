import { type ComponentProps } from 'react'
import * as styles from './style.css'

export type ButtonProps = ComponentProps<'button'> & styles.ButtonRecipeProps

export const Button = ({ type = 'button', children, size = 'medium', ...props }: ButtonProps) => {
  return (
    <button
      type={type}
      className={styles.buttonRecipe({ size })}
      {...props}>
      {children}
    </button>
  )
}
