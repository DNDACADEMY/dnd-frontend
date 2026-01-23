import { ChangeEventHandler, useCallback, useState } from 'react'

interface UseControlStableParams<T, E extends HTMLInputElement | HTMLTextAreaElement = HTMLInputElement> {
  value?: T
  defaultValue?: T
  onChange?: ChangeEventHandler<E>
}

/**
 * 제어(Controlled) / 비제어(Uncontrolled) 입력 상태를 공통으로 다루는 훅입니다.
 * `value`가 있으면 제어 모드, 없으면 `defaultValue`를 기준으로 비제어 모드로 동작해요.
 * @param params - 제어(Controlled) / 비제어(Uncontrolled) 입력 상태를 관리하는 파라미터입니다.
 * @param params.value - 제어(Controlled) 모드에서 사용할 값입니다.
 * @param params.defaultValue - 비제어 모드(Uncontrolled)에서 사용할 초기값입니다.
 * @param params.onChange - 값이 변경될 때 호출되는 핸들러입니다.
 * @returns 현재 값과 `onChange` 핸들러를 담은 객체입니다.
 */
export function useControllableState<T, E extends HTMLInputElement | HTMLTextAreaElement = HTMLInputElement>(params: UseControlStableParams<T, E>) {
  const { value, defaultValue, onChange } = params

  const isControlled = value != null
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue ?? '')
  const currentValue = isControlled ? value! : uncontrolledValue

  const handleChange: ChangeEventHandler<E> = useCallback(
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
