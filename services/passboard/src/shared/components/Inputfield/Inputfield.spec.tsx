import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Inputfield } from './Inputfield'

describe('Inputfield', () => {
  it('기본 props가 올바르게 렌더링된다', () => {
    const { container } = render(
      <Inputfield
        placeholder='테스트'
        value=''
        topAddon={<Inputfield.Label>라벨</Inputfield.Label>}
        bottomAddon={<Inputfield.BottomText>도움말</Inputfield.BottomText>}
      />
    )

    const input = container.querySelector('input')
    const label = container.querySelector('label')
    const bottomText = container.querySelector('p')

    expect(input).toHaveAttribute('placeholder', '테스트')
    expect(label).toHaveTextContent('라벨')
    expect(bottomText).toHaveTextContent('도움말')
  })

  it('error prop이 올바르게 적용된다', () => {
    const { container } = render(
      <Inputfield
        placeholder='테스트'
        value=''
        error={true}
        topAddon={<Inputfield.Label>라벨</Inputfield.Label>}
        bottomAddon={<Inputfield.BottomText>에러</Inputfield.BottomText>}
      />
    )

    const input = container.querySelector('input')
    const classNames = input?.className.split(' ') || []
    expect(classNames.some((className) => className.includes('_error_true'))).toBe(true)
  })

  it('disabled prop이 올바르게 적용된다', () => {
    const { container } = render(
      <Inputfield
        placeholder='테스트'
        value=''
        disabled={true}
        topAddon={<Inputfield.Label>라벨</Inputfield.Label>}
        bottomAddon={<Inputfield.BottomText>비활성화</Inputfield.BottomText>}
      />
    )

    const input = container.querySelector('input')
    expect(input).toBeDisabled()
  })

  it('여러 prop이 조합되어 올바르게 적용된다', () => {
    const { container } = render(
      <Inputfield
        placeholder='테스트'
        value='입력된 값'
        error={true}
        disabled={true}
        topAddon={<Inputfield.Label>라벨</Inputfield.Label>}
        bottomAddon={<Inputfield.BottomText>에러 + 비활성화</Inputfield.BottomText>}
      />
    )

    const input = container.querySelector('input')
    const classNames = input?.className.split(' ') || []

    expect(input).toHaveValue('입력된 값')
    expect(input).toBeDisabled()
    expect(classNames.some((className) => className.includes('_error_true'))).toBe(true)
  })
})
