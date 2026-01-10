import { semantic } from '@dds/token'
import { HTMLAttributes, ReactNode } from 'react'

import { Txt } from '../txt'
import { ChipIcon } from './compound'
import { ChipContextProvider } from './context'
import { containerCss } from './style.css'
import { ChipStatus } from './type'

export interface ChipProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * 칩의 왼쪽 영역을 설정해요.
   * 보통 아이콘을 배치할 때 사용해요.
   *
   * @default undefined
   */
  leftAddon?: ReactNode

  /**
   * 칩의 오른쪽 영역을 설정해요.
   * 보통 아이콘을 배치할 때 사용해요.
   *
   * @default undefined
   */
  rightAddon?: ReactNode

  /**
   * 칩의 타입을 설정해요.
   *
   * @default default
   */
  status?: ChipStatus
}

export const ChipImpl = (props: ChipProps) => {
  const { children, leftAddon, rightAddon, status = 'default', ...restProps } = props

  return (
    <ChipContextProvider status={status}>
      <div className={containerCss({ status })}>
        {leftAddon}
        <Txt
          typography='body2'
          fontWeight='bold'
          color={colorByStatusMap[status]}
          {...restProps}>
          {children}
        </Txt>
        {rightAddon}
      </div>
    </ChipContextProvider>
  )
}

const colorByStatusMap: Record<ChipStatus, string> = {
  default: semantic.color.labelSubtitle,
  selected: semantic.color.labelInverse
}

export const Chip = Object.assign(ChipImpl, {
  Icon: ChipIcon
})
