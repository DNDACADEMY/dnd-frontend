import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { SwitchCase } from './SwichCase'

describe('SwitchCase', () => {
  it('value와 일치하는 case를 렌더링한다', () => {
    const { container } = render(
      <SwitchCase
        value='A'
        cases={{
          A: <div>Case A</div>,
          B: <div>Case B</div>,
          C: <div>Case C</div>
        }}
      />
    )

    expect(container).toHaveTextContent('Case A')
    expect(container).not.toHaveTextContent('Case B')
  })

  it('value로 boolean 값과 문자열 둘다 받는다.', () => {
    const { container } = render(
      <SwitchCase
        value={true}
        cases={{ true: <div>Case A</div>, false: <div>Case B</div>, 0: <div>Case C</div> }}
      />
    )

    expect(container).toHaveTextContent('Case A')
  })

  it('일치하는 case가 없으면 defaultComponent를 렌더링한다', () => {
    const { container } = render(
      <SwitchCase
        value='D'
        cases={{
          A: <div>Case A</div>,
          B: <div>Case B</div>,
          C: <div>Case C</div>
        }}
        defaultComponent={<div>Default Case</div>}
      />
    )

    expect(container).toHaveTextContent('Default Case')
  })

  it('일치하는 case가 없고 defaultComponent도 없으면 null을 렌더링한다', () => {
    const { container } = render(
      <SwitchCase
        value='C'
        cases={{
          A: <div>Case A</div>,
          B: <div>Case B</div>
        }}
      />
    )

    expect(container).toBeEmptyDOMElement()
  })
})
