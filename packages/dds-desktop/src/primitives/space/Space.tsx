import { CSSProperties, HTMLAttributes } from 'react'

import { SpaceSize } from './types'
import { forwardRefWithAs } from '../../utils/forwardRefWithAs'

export interface SpaceProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * 세로 간격의 크기를 설정해요.
   *
   * @default 8
   */
  size?: SpaceSize
}

export const Space = forwardRefWithAs<'div', SpaceProps>((props) => {
  const { as = 'div', size = 8, style: styleFromProps, ...restProps } = props

  const Component = as

  const height = typeof size === 'number' ? size : spaceSizeMap[size]

  const style: CSSProperties = {
    height,
    ...styleFromProps
  }

  return (
    <Component
      style={style}
      {...restProps}
    />
  )
})

const spaceSizeMap: Record<SpaceSize, number> = {
  small: 10,
  medium: 20,
  large: 40
}
