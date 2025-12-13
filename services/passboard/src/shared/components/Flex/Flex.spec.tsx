import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Flex } from './Flex'

describe('Flex', () => {
  it('자식 요소들이 올바르게 렌더링된다', () => {
    const { container } = render(
      <Flex data-testid='flex-container'>
        <div>첫 번째</div>
        <div>두 번째</div>
      </Flex>
    )

    const flexContainer = container.querySelector('[data-testid="flex-container"]')
    const children = flexContainer?.children

    expect(children).toHaveLength(2)
    expect(children?.[0]).toHaveTextContent('첫 번째')
    expect(children?.[1]).toHaveTextContent('두 번째')
  })

  it('direction prop이 올바르게 적용된다', () => {
    const { container } = render(
      <Flex direction='column'>
        <div>아이템</div>
      </Flex>
    )

    const flex = container.firstChild as HTMLElement
    const classNames = flex?.className.split(' ') || []

    expect(classNames.some((className) => className.includes('_direction_column'))).toBe(true)
  })

  it('align prop이 올바르게 적용된다', () => {
    const { container } = render(
      <Flex align='center'>
        <div>아이템</div>
      </Flex>
    )

    const flex = container.firstChild as HTMLElement
    const classNames = flex?.className.split(' ') || []

    expect(classNames.some((className) => className.includes('_align_center'))).toBe(true)
  })

  it('justify prop이 올바르게 적용된다', () => {
    const { container } = render(
      <Flex justify='between'>
        <div>아이템</div>
      </Flex>
    )

    const flex = container.firstChild as HTMLElement
    const classNames = flex?.className.split(' ') || []

    expect(classNames.some((className) => className.includes('_justify_between'))).toBe(true)
  })

  it('gap prop이 올바르게 적용된다', () => {
    const { container } = render(
      <Flex gap={4}>
        <div>아이템</div>
      </Flex>
    )

    const flex = container.firstChild as HTMLElement
    expect(flex.style.gap).toBe('0.25rem') // gap이 16일 때 16px이 적용된다고 가정
  })

  it('style prop이 올바르게 적용된다', () => {
    const { container } = render(
      <Flex style={{ padding: '20px' }}>
        <div>아이템</div>
      </Flex>
    )

    const flex = container.firstChild as HTMLElement
    expect(flex.style.padding).toBe('20px')
  })

  it('여러 prop이 조합되어 올바르게 적용된다', () => {
    const { container } = render(
      <Flex
        direction='column'
        align='center'
        justify='between'
        gap={16}>
        <div>아이템</div>
      </Flex>
    )

    const flex = container.firstChild as HTMLElement
    const classNames = flex.className.split(' ')

    expect(classNames.some((className) => className.includes('_direction_column'))).toBe(true)
    expect(classNames.some((className) => className.includes('_align_center'))).toBe(true)
    expect(classNames.some((className) => className.includes('_justify_between'))).toBe(true)
    expect((flex as HTMLElement).style.gap).toBe('1rem')
  })
})
