import { Txt } from '@dnd-lab/desktop'
import clsx from 'clsx'
import { type ReactNode, type ComponentProps } from 'react'

import * as styles from './style.css'

export type TextButtonProps = ComponentProps<'button'> & {
  leftAddon?: ReactNode
  rightAddon?: ReactNode
}

export const TextButton = (props: TextButtonProps) => {
  const { type = 'button', leftAddon, rightAddon, children, className, ...restProps } = props
  return (
    <button
      type={type}
      className={clsx(styles.textButtonStyle, className)}
      {...restProps}>
      {leftAddon}
      <Txt
        typography='body2'
        fontWeight='bold'
        color='inherit'>
        {children}
      </Txt>
      {rightAddon}
    </button>
  )
}
