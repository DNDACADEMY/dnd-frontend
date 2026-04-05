import { type ReactNode, type ComponentProps } from 'react'

import * as styles from './style.css'
export type TextButtonProps = ComponentProps<'button'> & {
  leftAddon?: ReactNode
  rightAddon?: ReactNode
}

export const TextButton = (props: TextButtonProps) => {
  const { type = 'button', leftAddon, rightAddon, ...restProps } = props
  return (
    <div className={styles.textButtonStyle}>
      {leftAddon}
      <button
        type={type}
        {...restProps}
        className={styles.textButtonLabelStyle}
      />
      {rightAddon}
    </div>
  )
}
