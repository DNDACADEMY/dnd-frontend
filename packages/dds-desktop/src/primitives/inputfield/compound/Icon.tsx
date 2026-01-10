import { Icon, IconProps } from '../../icon'
import { useInputfieldContext } from '../context'
import { InputfieldSize } from '../type'

export type InputfieldIconProps = IconProps

export const InputfieldIcon = (props: InputfieldIconProps) => {
  const { size: sizeFromProps, ...restProps } = props
  const { size: sizeFromCtx } = useInputfieldContext('Inputfield.Icon')
  const size = sizeFromProps ?? IconSizeByInputfieldSize[sizeFromCtx]

  return (
    <Icon
      size={size}
      {...restProps}
    />
  )
}

InputfieldIcon.displayName = 'Inputfield.Icon'

const IconSizeByInputfieldSize: Record<InputfieldSize, number> = {
  small: 16,
  medium: 16,
  large: 24
} as const
