import { HTMLAttributes, ReactNode } from 'react'

import { SidebarCollapsible } from './Collapsible'
import { cx } from '../../../utils/cx'
import { Txt } from '../../txt'
import { groupLabelContainerStyle } from '../style.css'

export interface SidebarGroupProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * 그룹의 제목을 설정해요.
   */
  label?: ReactNode
}

export const SidebarGroup = (props: SidebarGroupProps) => {
  const { label, children, className: classNameFromProps, ...restProps } = props
  const hasLabel = label != null

  return (
    <div>
      <SidebarCollapsible>
        <div
          className={cx(groupLabelContainerStyle, classNameFromProps)}
          {...restProps}>
          {hasLabel ? (
            <Txt
              color='inherit'
              typography='body2'
              fontWeight='medium'>
              {label}
            </Txt>
          ) : null}
        </div>
      </SidebarCollapsible>
      {children}
    </div>
  )
}

SidebarGroup.displayName = 'Sidebar.Group'
