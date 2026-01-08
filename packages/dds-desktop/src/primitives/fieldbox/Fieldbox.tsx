import { ElementType, HTMLAttributes, ReactNode } from 'react'

import { FieldboxBottomTxt, FieldboxLabel } from './compound'
import { fieldboxContainerCss, fieldboxContentCss } from './styles.css'
import { cx } from '../../utils/cx'
import { forwardRefWithAs } from '../../utils/forwardRefWithAs'

export interface FieldboxProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * 상단에 배치할 컴포넌트 영역이에요.
   */
  topAddon?: ReactNode
  /**
   * 하단에 배치할 컴포넌트 영역이에요.
   */
  bottomAddon?: ReactNode
  /**
   * 컴포넌트 내부에 왼쪽에 배치할 컴포넌트 영역이에요.
   */
  leftAddon?: ReactNode
  /**
   * 컴포넌트 내부에 오른쪽에 배치할 컴포넌트 영역이에요.
   */
  rightAddon?: ReactNode
}

const FieldboxImpl = forwardRefWithAs<ElementType, FieldboxProps>((props) => {
  const { topAddon, bottomAddon, leftAddon, rightAddon, children, className: classNameFromProps, ...restProps } = props

  return (
    <div
      className={cx(fieldboxContainerCss, classNameFromProps)}
      {...restProps}>
      {topAddon}
      <div className={fieldboxContentCss}>
        {leftAddon}
        {children}
        {rightAddon}
      </div>
      {bottomAddon}
    </div>
  )
})

export const Fieldbox = Object.assign(FieldboxImpl, {
  Label: FieldboxLabel,
  BottomTxt: FieldboxBottomTxt
})
