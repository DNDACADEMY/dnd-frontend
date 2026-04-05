import { Slot } from '@radix-ui/react-slot'
import clsx from 'clsx'
import { ComponentProps } from 'react'

import { flexStyle } from './style.css'
import { type FlexRecipeProps } from './style.css'
import { getGapSizeFromNumber } from './utils'

export type FlexProps = FlexRecipeProps &
  ComponentProps<'div'> & {
    gap?: number
    asChild?: boolean
    as?: 'section' | 'div'
  }

export const Flex = (props: FlexProps) => {
  const { direction, align, justify, wrap, asChild, as, gap, children, className: classNameFromProps, style: styleFromProps, ...restProps } = props
  const Component = asChild ? Slot : (as ?? 'div')
  return (
    <Component
      style={{ gap: gap ? getGapSizeFromNumber(gap) : undefined, ...styleFromProps }}
      className={clsx(flexStyle({ direction, align, justify, wrap }), classNameFromProps)}
      {...restProps}>
      {children}
    </Component>
  )
}
