import { semantic } from '@dds/token'
import { HTMLAttributes, ReactNode } from 'react'

import { cx } from '../../../utils/cx'
import { Txt } from '../../txt'
import { bottomTxtCss } from '../styles.css'

export interface FieldboxBottomTxtProps extends HTMLAttributes<HTMLParagraphElement> {
  /**
   * 하단 텍스트 내용을 설정해요.
   */
  children: ReactNode
}

export const FieldboxBottomTxt = (props: FieldboxBottomTxtProps) => {
  const { children, className: classNameFromProps, ...restProps } = props
  return (
    <Txt
      as='p'
      typography='caption1'
      color={semantic.color.labelSubtitle}
      className={cx(bottomTxtCss, classNameFromProps)}
      {...restProps}>
      {children}
    </Txt>
  )
}

FieldboxBottomTxt.displayName = 'Fieldbox.BottomTxt'
