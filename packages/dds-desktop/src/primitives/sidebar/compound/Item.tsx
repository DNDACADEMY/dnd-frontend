import { ElementType, HTMLAttributes, KeyboardEvent } from 'react'

import { cx } from '../../../utils/cx'
import { forwardRefWithAs } from '../../../utils/forwardRefWithAs'
import { Icon, IconName } from '../../icon'
import { Txt } from '../../txt'
import { useSidebarContext } from '../context'
import { itemStyle, itemTextStyle } from '../style.css'

export interface SidebarItemProps extends HTMLAttributes<HTMLElement> {
  /**
   * 아이템의 아이콘 이름을 설정해요.
   *
   * @example
   * <SidebarItem iconName="home" />
   */
  iconName?: IconName
  /**
   * 아이템의 활성 상태를 설정해요.
   * 활성 상태일 때 아이템의 스타일을 변경해요.
   */
  isActive?: boolean
}

export const SidebarItem = forwardRefWithAs<ElementType, SidebarItemProps>((props, ref) => {
  const { children, iconName, isActive, as = 'li', className: classNameFromProps, onClick, onKeyDown, tabIndex, role, ...restProps } = props

  const { open } = useSidebarContext('Sidebar.Item')

  const hasIcon = iconName != null

  const Component = as

  const isIntrinsicComponent = typeof Component === 'string'
  const isNativeInteractive = isIntrinsicComponent && ['button', 'a', 'input', 'select', 'textarea', 'summary', 'details'].includes(Component)
  const enableKeyboardActivation = onClick != null && !isNativeInteractive

  const handleKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    onKeyDown?.(e)
    if (e.defaultPrevented || !enableKeyboardActivation) return

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      e.currentTarget.click()
    }
  }

  return (
    <Component
      ref={ref}
      className={cx(itemStyle({ isActive, open, hasIcon }), classNameFromProps)}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role={enableKeyboardActivation ? (role ?? 'button') : role}
      tabIndex={enableKeyboardActivation ? (tabIndex ?? 0) : tabIndex}
      {...restProps}>
      {iconName ? (
        <Icon
          name={iconName}
          size={18}
        />
      ) : null}
      <Txt
        color='inherit'
        typography={open ? 'body2' : 'caption1'}
        fontWeight='medium'
        className={itemTextStyle}>
        {children}
      </Txt>
    </Component>
  )
})

SidebarItem.displayName = 'Sidebar.Item'
