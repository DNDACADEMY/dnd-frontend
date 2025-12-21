import { ElementType, type ReactNode } from 'react'

import { FontWeight, Typography } from './types'
import { cx } from '../../utils/cx'
import { forwardRefWithAs } from '../../utils/forwardRefWithAs'

export interface TxtProps {
  typography: Typography
  fontWeight: FontWeight
  className?: string
  children: ReactNode
}

export const Txt = forwardRefWithAs<ElementType, TxtProps>((props, ref) => {
  const { as, typography, fontWeight, className, children, ...restProps } = props
  const Component = as ?? 'span'

  return (
    <Component
      ref={ref}
      className={cx(typography, fontWeight, className)}
      {...restProps}>
      {children}
    </Component>
  )
})
