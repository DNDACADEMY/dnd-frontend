import { ElementType } from 'react'

import { typographyCss } from './styles.css'
import { Typography } from './types'
import { cx } from '../../utils/cx'
import { forwardRefWithAs } from '../../utils/forwardRefWithAs'

export interface TxtProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * @default 'body1'
   * @description 텍스트 스타일
   */
  typography: Typography
}

export const Txt = forwardRefWithAs<ElementType, TxtProps>((props) => {
  const { as = 'span', typography = 'body1', classNameFromProps, children, ...restProps } = props
  const Component = as

  return (
    <Component
      className={cx(typographyCss({ typography }), classNameFromProps)}
      {...restProps}>
      {children}
    </Component>
  )
})
