import { useRef } from 'react'

import { Txt } from './Txt'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/Txt',
  component: Txt,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    typography: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'body1', 'body2', 'caption1', 'caption2']
    },
    fontWeight: {
      control: 'select',
      options: ['regular', 'medium', 'semibold', 'bold', 'extrabold']
    },
    as: {
      control: 'select',
      options: ['span', 'p', 'div', 'h1', 'h2', 'h3', 'button', 'a']
    },
    children: {
      control: 'text'
    }
  }
} satisfies Meta<typeof Txt>

export default meta
type Story = StoryObj<typeof meta>

// 기본 span
export const Default: Story = {
  args: {
    typography: 'body1',
    fontWeight: 'regular',
    children: '기본 텍스트입니다'
  }
}

// 제목들
export const Heading1: Story = {
  args: {
    as: 'h1',
    typography: 'h1',
    fontWeight: 'bold',
    children: 'Heading 1'
  }
}

export const Heading2: Story = {
  args: {
    as: 'h2',
    typography: 'h2',
    fontWeight: 'bold',
    children: 'Heading 2'
  }
}

export const Heading3: Story = {
  args: {
    as: 'h3',
    typography: 'h3',
    fontWeight: 'medium',
    children: 'Heading 3'
  }
}

// Paragraph
export const Paragraph: Story = {
  args: {
    as: 'p',
    typography: 'body1',
    fontWeight: 'regular',
    children: '이것은 문단 텍스트입니다. 여러 줄의 텍스트를 표시할 수 있습니다.'
  }
}

// Button으로 사용
export const AsButton: Story = {
  args: {
    as: 'button',
    typography: 'body1',
    fontWeight: 'bold',
    children: '클릭하세요',
    onClick: () => alert('버튼 클릭!')
  }
}

// Link로 사용
export const AsLink: Story = {
  args: {
    as: 'a',
    typography: 'body1',
    fontWeight: 'medium',
    children: '링크 텍스트',
    href: 'https://example.com',
    target: '_blank',
    rel: 'noopener noreferrer'
  }
}

// 폰트 웨이트 비교
export const FontWeights: Story = {
  args: {
    typography: 'body1',
    fontWeight: 'regular',
    children: 'Font Weights'
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Txt
        typography='body1'
        fontWeight='regular'>
        regular Weight
      </Txt>
      <Txt
        typography='body1'
        fontWeight='medium'>
        Medium Weight
      </Txt>
      <Txt
        typography='body1'
        fontWeight='bold'>
        Bold Weight
      </Txt>
    </div>
  )
}

// Typography 비교
export const Typographies: Story = {
  args: {
    typography: 'body1',
    fontWeight: 'regular',
    children: 'Typographies'
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Txt
        as='h1'
        typography='h1'
        fontWeight='bold'>
        Heading 1
      </Txt>
      <Txt
        as='h2'
        typography='h2'
        fontWeight='bold'>
        Heading 2
      </Txt>
      <Txt
        as='h3'
        typography='h3'
        fontWeight='medium'>
        Heading 3
      </Txt>
      <Txt
        typography='body1'
        fontWeight='regular'>
        Body Text
      </Txt>
      <Txt
        typography='caption1'
        fontWeight='regular'>
        Caption Text
      </Txt>
    </div>
  )
}

// Ref 테스트
export const WithRef: Story = {
  args: {
    typography: 'body1',
    fontWeight: 'regular',
    children: 'With Ref'
  },
  render: () => {
    const RefExample = () => {
      const buttonRef = useRef<HTMLButtonElement>(null)
      const linkRef = useRef<HTMLAnchorElement>(null)

      const focusButton = () => {
        buttonRef.current?.focus()
      }

      const scrollToLink = () => {
        linkRef.current?.scrollIntoView({ behavior: 'smooth' })
      }

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Txt
            as='button'
            ref={buttonRef}
            typography='body1'
            fontWeight='bold'
            onClick={() => alert('버튼 클릭!')}>
            Focus 가능한 버튼
          </Txt>

          <Txt
            as='button'
            typography='body1'
            fontWeight='regular'
            onClick={focusButton}>
            위 버튼에 포커스
          </Txt>

          <div style={{ height: '100vh' }} />

          <Txt
            as='a'
            ref={linkRef}
            href='#'
            typography='body1'
            fontWeight='medium'>
            스크롤 타겟 링크
          </Txt>

          <Txt
            as='button'
            typography='body1'
            fontWeight='regular'
            onClick={scrollToLink}
            style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
            링크로 스크롤
          </Txt>
        </div>
      )
    }

    return <RefExample />
  }
}

// 커스텀 클래스명
export const WithCustomClassName: Story = {
  args: {
    typography: 'body1',
    fontWeight: 'semibold',
    className: 'custom-text-class',
    children: '커스텀 클래스가 적용된 텍스트',
    style: { color: 'blue', textDecoration: 'underline' }
  }
}

// 인터랙티브 요소들
export const InteractiveElements: Story = {
  args: {
    typography: 'body1',
    fontWeight: 'medium',
    children: 'Interactive Elements'
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Txt
        as='button'
        typography='body1'
        fontWeight='bold'
        onClick={() => console.log('Primary clicked')}
        style={{ padding: '8px 16px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>
        Primary Button
      </Txt>

      <Txt
        as='button'
        typography='body1'
        fontWeight='medium'
        onClick={() => console.log('Secondary clicked')}
        disabled
        style={{ padding: '8px 16px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px' }}>
        Disabled Button
      </Txt>

      <Txt
        as='a'
        typography='body1'
        fontWeight='medium'
        href='https://react.dev'
        target='_blank'
        style={{ color: '#007bff', textDecoration: 'none' }}>
        External Link →
      </Txt>
    </div>
  )
}
