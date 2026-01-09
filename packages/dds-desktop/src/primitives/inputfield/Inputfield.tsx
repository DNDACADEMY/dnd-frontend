import { semantic } from '@dds/token'
import { HTMLAttributes, ReactNode } from 'react'

import { Fieldbox } from '../fieldbox'
import { InputfieldIcon } from './compound'
import { InputfieldContextProvider } from './context'
import { InputfieldCss } from './style.css'
import { InputfieldSize } from './type'
import { cx } from '../../utils/cx'
import { Txt } from '../txt'
import { Typography } from '../txt/types'

export interface InputfieldProps extends HTMLAttributes<HTMLInputElement> {
  /**
   * 상단에 배치할 컴포넌트 영역이에요.
   * 레이블을 사용할 때 주로 사용해요.
   */
  topAddon?: ReactNode
  /**
   * 하단에 배치할 컴포넌트 영역이에요.
   * 주로 `Inputfield.BottomText`처럼 검증 메시지나 보조 설명을 노출할 때 사용해요.
   */
  bottomAddon?: ReactNode
  /**
   * 입력 영역의 왼쪽에 배치할 컴포넌트 영역이에요.
   * 아이콘, prefix 텍스트 등을 배치할 때 사용해요.
   */
  leftAddon?: ReactNode
  /**
   * 입력 영역의 오른쪽에 배치할 컴포넌트 영역이에요.
   * 토글 버트, suffix 텍스트 등 보조 액션을 배치할 때 사용해요.
   */
  rightAddon?: ReactNode
  /**
   * 컴포넌트 크기를 설정해요.
   * 높이와 내부 여백, 간격이 함께 조절돼요.
   *
   * @default medium
   */
  size?: InputfieldSize
  /**
   * 컴포넌트 비활성화 여부를 설정해요.
   * 비활성화 시 상호작용이 불가능한 상태를 시각적으로 표현해요.
   *
   * @default false
   */
  disabled?: boolean
  /**
   * 컴포넌트 에러 여부를 설정해요.
   * 에러 상태일 때 테두리 색상 등을 통해 시각적으로 강조해요.
   *
   * @default false
   */
  error?: boolean
  /**
   * 필수 필드 여부를 설정해요.
   * `Inputfield.Label`과 함께 사용할 경우 라벨에 * 표시를 추가하는 데 활용돼요.
   *
   * @default false
   */
  required?: boolean
  /**
   * 입력 영역을 읽기 전용 상태로 설정해요.
   * 값을 변경할 수 없는 읽기 전용 필드를 표시할 때 사용해요.
   *
   * @default false
   */
  readOnly?: boolean
  /**
   * 입력 필드에 표시할 placeholder 텍스트를 설정해요.
   */
  placeholder?: string
}

export const InputfieldImpl = (props: InputfieldProps) => {
  const {
    topAddon,
    bottomAddon,
    leftAddon,
    rightAddon,
    size = 'medium',
    disabled = false,
    error = false,
    required = false,
    readOnly = false,
    className: classNameFromProps,
    ...restProps
  } = props

  return (
    <InputfieldContextProvider size={size}>
      <Fieldbox
        topAddon={topAddon}
        bottomAddon={bottomAddon}
        disabled={disabled}
        error={error}
        required={required}
        readonly={readOnly}>
        <Fieldbox.Content
          leftAddon={leftAddon}
          rightAddon={rightAddon}>
          <Txt
            as='input'
            className={cx(InputfieldCss({ size }), classNameFromProps)}
            typography={typographyBySize[size]}
            color={semantic.color.labelTitle}
            {...restProps}
          />
        </Fieldbox.Content>
      </Fieldbox>
    </InputfieldContextProvider>
  )
}

const typographyBySize: Record<InputfieldSize, Typography> = {
  small: 'caption1',
  medium: 'body2',
  large: 'body2'
}

export const Inputfield = Object.assign(InputfieldImpl, {
  Label: Fieldbox.Label,
  BottomText: Fieldbox.BottomTxt,
  Icon: InputfieldIcon
})
