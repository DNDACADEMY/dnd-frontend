import { ChangeEventHandler, useCallback, useState } from 'react'

interface UseControlStableParams<T> {
  value?: T
  defaultValue?: T
  onChange?: ChangeEventHandler<HTMLInputElement>
}

export function useControllableState<T>(params: UseControlStableParams<T>) {
  const { value, defaultValue, onChange } = params

  const isControlled = value != null
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue ?? '')
  const currentValue = isControlled ? value! : uncontrolledValue

  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      const nextValue = event.target.value

      if (!isControlled) {
        setUncontrolledValue(nextValue)
      }

      onChange?.(event)
    },
    [isControlled, onChange]
  )

  return { value: currentValue, onChange: handleChange }
}
