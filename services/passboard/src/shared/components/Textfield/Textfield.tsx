import { forwardRef, useId, useState, type ComponentProps } from 'react'
import { textfieldStyle } from './style.css'
import { type TextfieldSize } from './type'
import { keyboardEvents } from '@/shared/utils/keyboardEvents'
import { composeHandler } from '@/shared/utils/composeHandler'
export type TextfieldProps = {
  defaultValue?: string
  disabled?: boolean
  error?: boolean
  size?: TextfieldSize
} & Omit<ComponentProps<'input'>, 'size'>

export const Textfield = forwardRef<HTMLInputElement, TextfieldProps>(
  (
    {
      type = 'text',
      defaultValue,
      disabled = false,
      error = false,
      size = 'medium',
      onChange: onChangeFromProps,
      onKeyDown: onKeyDownFromProps,
      ...restProps
    },
    ref
  ) => {
    const id = useId()
    const [value, setValue] = useState(defaultValue)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (keyboardEvents(e).isComposing) return
    }

    return (
      <input
        id={id}
        type={type}
        value={value}
        disabled={disabled}
        ref={ref}
        onKeyDown={composeHandler(onKeyDownFromProps, handleKeyDown)}
        onChange={composeHandler(onChangeFromProps, handleChange)}
        {...restProps}
        className={textfieldStyle({ size, error })}
      />
    )
  }
)

Textfield.displayName = 'Textfield'
