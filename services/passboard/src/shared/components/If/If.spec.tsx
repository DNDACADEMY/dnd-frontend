import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { If } from './If'

describe('If', () => {
  it('condition이 true일 때 children을 렌더링한다', () => {
    const { container } = render(
      <If condition={true}>
        <div>참일 때</div>
      </If>
    )

    expect(container).toHaveTextContent('참일 때')
  })

  it('condition이 false일 때 fallback을 렌더링한다', () => {
    const { container } = render(
      <If
        condition={false}
        fallback={<div>거짓일 때</div>}>
        <div>참일 때</div>
      </If>
    )

    expect(container).toHaveTextContent('거짓일 때')
    expect(container).not.toHaveTextContent('참일 때')
  })

  it('condition이 false이고 fallback이 없을 때 null을 렌더링한다', () => {
    const { container } = render(
      <If condition={false}>
        <div>참일 때</div>
      </If>
    )

    expect(container).toBeEmptyDOMElement()
  })
})
