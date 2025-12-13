import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta = {
  title: 'Shared/Button',
  component: Button,
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['medium', 'large', 'xlarge'],
      defaultValue: 'medium'
    }
  }
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: '버튼',
    size: 'medium'
  },
  render: (args) => {
    return (
      <div style={{ width: '300px' }}>
        <Button {...args} />
      </div>
    )
  }
}
