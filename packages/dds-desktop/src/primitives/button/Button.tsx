import { HTMLAttributes, ReactNode } from 'react'

import { buttonCss, containerCss } from './style.css'
import { ButtonSize, ButtonVariant } from './type'
import { cx } from '../../utils/cx'
import { Txt } from '../txt'
import { ButtonIcon } from './compound'

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  leftAddon?: ReactNode
  rightAddon?: ReactNode
  size?: ButtonSize
  variant?: ButtonVariant
}

const ButtonImpl = (props: ButtonProps) => {
  const { children, leftAddon, rightAddon, size = 'medium', variant = 'primary', className, ...restProps } = props
  return (
    <button
      className={cx(buttonCss({ size, variant }), className)}
      {...restProps}>
      <div className={containerCss({ size })}>
        {leftAddon}
        <Txt
          color='inherit'
          typography='body2'
          fontWeight='bold'>
          {children}
        </Txt>
        {rightAddon}
      </div>
    </button>
  )
}

ButtonImpl.displayName = 'Button'

export const Button = Object.assign(ButtonImpl, {
  Icon: ButtonIcon
})
