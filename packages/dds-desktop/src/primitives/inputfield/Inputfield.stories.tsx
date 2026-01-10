import { semantic } from '@dds/token'
import { useState } from 'react'

import { Inputfield } from './Inputfield'

import type { InputfieldProps } from './Inputfield'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Primitives/Inputfield',
  component: Inputfield,
  parameters: {
    layout: 'centered',
    controls: {
      exclude: ['ref', 'topAddon', 'bottomAddon', 'leftAddon', 'rightAddon', 'children']
    },
    docs: {
      description: {
        component: 'Inputfield 컴포넌트는 입력 필드를 표시할 때 사용하는 컴포넌트예요.'
      }
    }
  },
  tags: ['autodocs'],
  subcomponents: {
    Label: Inputfield.Label,
    BottomText: Inputfield.BottomText,
    Icon: Inputfield.Icon
  },
  args: {
    size: 'medium',
    disabled: false,
    error: false,
    required: true,
    readOnly: false
  },
  argTypes: {
    size: {
      description: '입력 필드의 크기를 설정해요.',
      control: 'inline-radio',
      options: ['small', 'medium', 'large']
    },
    disabled: {
      description: '입력 필드를 비활성화할지 여부를 설정해요.',
      control: 'boolean'
    },
    error: {
      description: '에러 상태 여부를 설정해요.',
      control: 'boolean'
    },
    required: {
      description: '필수 입력 여부를 설정해요.',
      control: 'boolean'
    },
    readOnly: {
      description: '읽기 전용 모드로 사용할지 여부를 설정해요.',
      control: 'boolean'
    }
  }
} satisfies Meta<typeof Inputfield>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: {
    size: 'medium',
    disabled: false,
    error: false,
    required: true,
    readOnly: false
  },
  render: (args) => {
    const { size = 'medium', ...rest } = args
    const inputId = 'inputfield-email'
    const bottomText = args.error ? '이메일 형식이 올바르지 않아요.' : '로그인에 사용할 이메일 주소를 입력해 주세요.'

    return (
      <Inputfield
        size={size}
        id={inputId}
        topAddon={<Inputfield.Label id={inputId}>이메일 주소</Inputfield.Label>}
        bottomAddon={<Inputfield.BottomText>{bottomText}</Inputfield.BottomText>}
        placeholder='이메일을 입력해주세요.'
        {...rest}
      />
    )
  }
}

export const Sizes: Story = {
  name: 'Size variants',
  args: {
    disabled: false,
    error: false,
    required: true,
    readOnly: false
  },
  parameters: {
    controls: {
      // NOTE:사이즈는 화면에서 직접 비교하므로 컨트롤에서는 숨겨요.
      exclude: ['size']
    }
  },
  render: (args) => {
    const inputIdBase = 'inputfield-size'
    const sizes: NonNullable<InputfieldProps['size']>[] = ['small', 'medium', 'large']

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 360 }}>
        {sizes.map((size) => {
          const id = `${inputIdBase}-${size}`

          return (
            <Inputfield
              key={size}
              {...args}
              size={size}
              id={id}
              placeholder={`Inputfield Size: ${size}`}
              topAddon={<Inputfield.Label id={id}>{`이메일 주소 (${size})`}</Inputfield.Label>}
              bottomAddon={<Inputfield.BottomText>로그인에 사용할 이메일 주소를 입력해 주세요.</Inputfield.BottomText>}
              leftAddon={
                <Inputfield.Icon
                  name='mail'
                  color={semantic.color.labelSubtitle}
                  aria-hidden
                />
              }
            />
          )
        })}
      </div>
    )
  }
}

export const ControlledWithExternalState: Story = {
  name: 'Controlled (value / onChange)',
  args: {
    disabled: false,
    error: false,
    required: true,
    readOnly: false
  },
  parameters: {
    docs: {
      description: {
        story:
          '외부 상태로 `value`와 `onChange`를 관리하는 **완전 제어(Controlled)** Inputfield 예시예요. 내부에서는 `useControlStable`을 통해 controlled 모드로 동작해요.'
      }
    }
  },
  render: (args) => {
    const [value, setValue] = useState('dnd@dnd.ac')
    const inputId = 'inputfield-controlled'

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 360 }}>
        <Inputfield
          {...args}
          id={inputId}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder='이메일을 입력해주세요.'
          topAddon={<Inputfield.Label id={inputId}>이메일 주소</Inputfield.Label>}
          bottomAddon={<Inputfield.BottomText>스토리북에서 외부 상태로 제어되는 controlled Inputfield 예시예요.</Inputfield.BottomText>}
          leftAddon={
            <Inputfield.Icon
              name='mail'
              color={semantic.color.labelSubtitle}
              aria-hidden
            />
          }
        />
        <span style={{ fontSize: 12, color: '#6b7280' }}>현재 값: {value}</span>
      </div>
    )
  }
}

export const UncontrolledWithDefaultValue: Story = {
  name: 'Uncontrolled (defaultValue)',
  args: {
    disabled: false,
    error: false,
    required: false,
    readOnly: false
  },
  parameters: {
    docs: {
      description: {
        story:
          '`defaultValue`만 전달해서 **비제어(Uncontrolled)** 로 사용하는 예시예요. `useControlStable`이 내부에서 초기값을 기반으로 상태를 관리해요.'
      }
    }
  },
  render: (args) => {
    const inputId = 'inputfield-uncontrolled'

    return (
      <Inputfield
        {...args}
        id={inputId}
        defaultValue='uncontrolled@dnd.ac'
        placeholder='이메일을 입력해주세요.'
        topAddon={<Inputfield.Label id={inputId}>이메일 주소</Inputfield.Label>}
        bottomAddon={
          <Inputfield.BottomText>defaultValue로 초기화된 이후에는 Inputfield 내부에서 값을 관리하는 uncontrolled 예시예요.</Inputfield.BottomText>
        }
        leftAddon={
          <Inputfield.Icon
            name='mail'
            color={semantic.color.labelSubtitle}
            aria-hidden
          />
        }
      />
    )
  }
}
