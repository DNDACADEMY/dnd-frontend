import { Icon, IconProps } from '../../icon'
import { useInputareaContext } from '../context'
import { InputareaSize } from '../type'

export type InputareaIconProps = IconProps

export const InputareaIcon = (props: InputareaIconProps) => {
  const { size: sizeFromProps, ...restProps } = props
  const { size: sizeFromCtx } = useInputareaContext('Inputarea.Icon')
  const size = sizeFromProps ?? IconSizeByInputareaSize[sizeFromCtx]

  return (
    <Icon
      size={size}
      {...restProps}
    />
  )
}

InputareaIcon.displayName = 'Inputarea.Icon'

const IconSizeByInputareaSize: Record<InputareaSize, number> = {
  medium: 16,
  large: 24
} as const
