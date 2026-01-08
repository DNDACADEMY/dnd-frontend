import { primitive } from '@dds/token'
import { CSSProperties, ElementType, HTMLAttributes } from 'react'

import { typographyCss } from './styles.css'
import { FontWeight, Typography } from './types'
import { cx } from '../../utils/cx'
import { forwardRefWithAs } from '../../utils/forwardRefWithAs'

export interface TxtProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * 텍스트 스타일을 설정해요.
   *
   * @default body1
   */
  typography: Typography

  /**
   * 텍스트 굵기를 설정해요.
   *
   * @default regular
   */
  fontWeight: FontWeight

  /**
   * 텍스트 색상을 설정해요.
   *
   * @default color.mono900
   */
  color: string
}
export const Txt = forwardRefWithAs<ElementType, TxtProps>((props) => {
  const {
    as = 'span',
    typography = 'body1',
    fontWeight = 'regular',
    children,
    color: colorFromProps = primitive.color.mono900,
    className: classNameFromProps,
    style: styleFromProps,
    ...restProps
  } = props

  const Component = as

  const style: CSSProperties = {
    fontWeight,
    color: colorFromProps,
    ...styleFromProps
  }

  return (
    <Component
      className={cx(typographyCss({ typography }), classNameFromProps)}
      style={style}
      {...restProps}>
      {children}
    </Component>
  )
})
