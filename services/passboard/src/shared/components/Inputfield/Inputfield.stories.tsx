import type { Meta, StoryObj } from '@storybook/react'
import { Inputfield } from './Inputfield'

const meta = {
  title: 'Shared/Inputfield',
  component: Inputfield,
  parameters: {
    controls: {
      disabled: {
        control: 'boolean',
        defaultValue: false
      },
      error: {
        control: 'boolean',
        defaultValue: false
      }
    }
  }
} satisfies Meta<typeof Inputfield>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: '텍스트를 입력해주세요',
    defaultValue: '',
    topAddon: <Inputfield.Label required>라벨</Inputfield.Label>,
    bottomAddon: <Inputfield.BottomText>도움말 텍스트</Inputfield.BottomText>
  }
}

export const WithError: Story = {
  args: {
    placeholder: '텍스트를 입력해주세요',
    error: true,
    topAddon: <Inputfield.Label required>라벨</Inputfield.Label>,
    bottomAddon: <Inputfield.BottomText state='error'>에러 메시지</Inputfield.BottomText>
  }
}

export const Disabled: Story = {
  args: {
    placeholder: '텍스트를 입력해주세요',
    disabled: true,
    topAddon: <Inputfield.Label>라벨</Inputfield.Label>,
    bottomAddon: <Inputfield.BottomText>비활성화 상태</Inputfield.BottomText>
  }
}
