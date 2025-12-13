import type { Meta, StoryObj } from '@storybook/react'
import { Textfield } from './Textfield'

const meta = {
  title: 'Shared/Textfield',
  component: Textfield,
  parameters: {
    controls: {
      disabled: {
        control: 'boolean',
        defaultValue: false
      },
      error: {
        control: 'boolean',
        defaultValue: false
      },
      size: {
        control: 'inline-radio',
        options: ['medium', 'large', 'xlarge']
      }
    }
  }
} satisfies Meta<typeof Textfield>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <div style={{ width: '300px' }}>
      <Textfield
        {...args}
        placeholder='텍스트를 입력해주세요'
      />
    </div>
  )
}
