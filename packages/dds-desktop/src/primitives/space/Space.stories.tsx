import { primitive } from '@dds/token'

import { Space } from './Space'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Primitives/Space',
  component: Space,
  parameters: {
    layout: 'centered',
    controls: {
      exclude: ['ref']
    },
    docs: {
      description: {
        component: 'Space 컴포넌트는 세로 간격을 제공해요.'
      }
    }
  },
  tags: ['autodocs'],
  args: {
    size: 8
  },
  argTypes: {
    size: {
      description: '세로 간격의 크기를 설정해요.',
      control: 'number'
    }
  }
} satisfies Meta<typeof Space>

export default meta
type Story = StoryObj<typeof meta>

// 가장 기본적인 플레이그라운드
export const Playground: Story = {
  args: {
    size: 16
  },
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: 8, backgroundColor: primitive.color.mono900 }}>위 요소</div>
      <Space {...args} />
      <div style={{ padding: 8, backgroundColor: primitive.color.mono900 }}>아래 요소</div>
    </div>
  )
}

// 다양한 크기의 간격 보기
export const Sizes: Story = {
  parameters: {
    controls: {
      exclude: ['size']
    }
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {[4, 8, 12, 16, 24, 32].map((size) => (
        <div
          key={size}
          style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 12, color: primitive.color.mono900, marginBottom: 4 }}>size: {size}px</div>
          <div style={{ padding: 8, backgroundColor: primitive.color.mono900 }}>위 요소</div>
          <Space size={size} />
          <div style={{ padding: 8, backgroundColor: primitive.color.mono900 }}>아래 요소</div>
        </div>
      ))}
    </div>
  )
}
