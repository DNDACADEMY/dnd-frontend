import { CSSProperties, ComponentPropsWithRef } from 'react'

import { SpaceSize } from './types'

export interface SpaceProps extends ComponentPropsWithRef<'div'> {
  /**
   * 세로 간격의 크기를 설정해요.
   *
   * @default 8
   */
  size?: SpaceSize
}

export const Space = ({ size = 8, style: styleFromProps, ...restProps }: SpaceProps) => {
  const height = typeof size === 'number' ? size : spaceSizeMap[size]

  const style: CSSProperties = {
    height,
    ...styleFromProps
  }

  return (
    <div
      style={style}
      {...restProps}
    />
  )
}

const spaceSizeMap: Record<SpaceSize, number> = {
  small: 10,
  medium: 20,
  large: 40
}
