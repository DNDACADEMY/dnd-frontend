import { Icon, IconProps } from '../../icon'

export type ButtonIconProps = IconProps

export const ButtonIcon = (props: ButtonIconProps) => {
  const { size = 12, ...restProps } = props

  return (
    <Icon
      size={size}
      {...restProps}
    />
  )
}

ButtonIcon.displayName = 'Button.Icon'
