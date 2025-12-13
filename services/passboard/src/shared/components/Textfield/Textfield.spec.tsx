import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Textfield } from './Textfield'

describe('Textfield', () => {
  it('기본 props가 올바르게 렌더링된다', () => {
    const { container } = render(
      <Textfield
        defaultValue='테스트 값'
        data-testid='textfield'
      />
    )

    const input = container.querySelector('input')
    expect(input).toHaveValue('테스트 값')
    expect(input).toHaveAttribute('type', 'text')
  })

  it('size prop이 올바르게 적용된다', () => {
    const { container } = render(
      <Textfield
        defaultValue=''
        size='large'
      />
    )

    const input = container.querySelector('input')
    const classNames = input?.className.split(' ') || []
    expect(classNames.some((className) => className.includes('_size_large'))).toBe(true)
  })

  it('error prop이 올바르게 적용된다', () => {
    const { container } = render(
      <Textfield
        defaultValue=''
        error={true}
      />
    )

    const input = container.querySelector('input')
    const classNames = input?.className.split(' ') || []
    expect(classNames.some((className) => className.includes('_error_true'))).toBe(true)
  })

  it('disabled prop이 올바르게 적용된다', () => {
    const { container } = render(
      <Textfield
        defaultValue=''
        disabled={true}
      />
    )

    const input = container.querySelector('input')
    expect(input).toBeDisabled()
  })

  it('여러 prop이 조합되어 올바르게 적용된다', () => {
    const { container } = render(
      <Textfield
        defaultValue='테스트 값'
        size='xlarge'
        error={true}
        disabled={true}
      />
    )

    const input = container.querySelector('input')
    const classNames = input?.className.split(' ') || []

    expect(input).toHaveValue('테스트 값')
    expect(input).toBeDisabled()
    expect(classNames.some((className) => className.includes('_size_xlarge'))).toBe(true)
    expect(classNames.some((className) => className.includes('_error_true'))).toBe(true)
  })
})
