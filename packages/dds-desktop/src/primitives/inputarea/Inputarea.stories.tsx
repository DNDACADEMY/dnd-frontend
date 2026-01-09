import { semantic } from '@dds/token'
import { useState } from 'react'

import { Inputarea } from './Inputarea'

import type { InputareaProps } from './Inputarea'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Primitives/Inputarea',
  component: Inputarea,
  parameters: {
    layout: 'centered',
    controls: {
      exclude: ['ref', 'topAddon', 'bottomAddon', 'leftAddon', 'rightAddon', 'children']
    },
    docs: {
      description: {
        component: 'Inputarea 컴포넌트는 여러 줄 텍스트 입력 영역을 표시할 때 사용하는 컴포넌트예요.'
      }
    }
  },
  tags: ['autodocs'],
  subcomponents: {
    Label: Inputarea.Label,
    BottomText: Inputarea.BottomText,
    Icon: Inputarea.Icon
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
      description: '입력 영역의 크기를 설정해요.',
      control: 'inline-radio',
      options: ['medium', 'large']
    },
    disabled: {
      description: '입력 영역을 비활성화할지 여부를 설정해요.',
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
    },
    rows: {
      description: 'textarea의 행(row) 수를 설정해요.',
      control: 'number'
    }
  }
} satisfies Meta<typeof Inputarea>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: {
    size: 'medium',
    disabled: false,
    error: false,
    required: true,
    readOnly: false,
    rows: 4
  },
  render: (args) => {
    const { size = 'medium', ...rest } = args
    const inputId = 'inputarea-description'
    const bottomText = args.error ? '설명이 너무 짧아요. 최소 10자 이상 입력해 주세요.' : '프로젝트에 대한 설명을 입력해 주세요.'

    return (
      <Inputarea
        size={size}
        id={inputId}
        style={{ resize: 'none' }}
        topAddon={<Inputarea.Label id={inputId}>프로젝트 설명</Inputarea.Label>}
        bottomAddon={<Inputarea.BottomText>{bottomText}</Inputarea.BottomText>}
        placeholder='프로젝트에 대한 자세한 설명을 입력해주세요.'
        {...rest}
        leftAddon={
          <Inputarea.Icon
            name='edit'
            color={semantic.color.labelSubtitle}
            aria-hidden
          />
        }
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
    readOnly: false,
    rows: 4
  },
  parameters: {
    controls: {
      exclude: ['size']
    }
  },
  render: (args) => {
    const inputIdBase = 'inputarea-size'
    const sizes: NonNullable<InputareaProps['size']>[] = ['medium', 'large']

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 360 }}>
        {sizes.map((size) => {
          const id = `${inputIdBase}-${size}`

          return (
            <Inputarea
              key={size}
              {...args}
              size={size}
              id={id}
              style={{ resize: 'none' }}
              placeholder={`Inputarea Size: ${size}`}
              topAddon={<Inputarea.Label id={id}>{`프로젝트 설명 (${size})`}</Inputarea.Label>}
              bottomAddon={<Inputarea.BottomText>프로젝트에 대한 설명을 입력해 주세요.</Inputarea.BottomText>}
              leftAddon={
                <Inputarea.Icon
                  name='edit'
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
    readOnly: false,
    rows: 4
  },
  parameters: {
    docs: {
      description: {
        story:
          '외부 상태로 `value`와 `onChange`를 관리하는 **완전 제어(Controlled)** Inputarea 예시예요. 내부에서는 `useControllableState`를 통해 controlled 모드로 동작해요.'
      }
    }
  },
  render: (args) => {
    const [value, setValue] = useState('DND는 개발자와 디자이너가 함께 성장하는 커뮤니티입니다.')
    const inputId = 'inputarea-controlled'

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 360 }}>
        <Inputarea
          {...args}
          id={inputId}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          style={{ resize: 'none' }}
          placeholder='프로젝트에 대한 설명을 입력해주세요.'
          topAddon={<Inputarea.Label id={inputId}>프로젝트 설명</Inputarea.Label>}
          bottomAddon={<Inputarea.BottomText>스토리북에서 외부 상태로 제어되는 controlled Inputarea 예시예요.</Inputarea.BottomText>}
          leftAddon={
            <Inputarea.Icon
              name='edit'
              color={semantic.color.labelSubtitle}
              aria-hidden
            />
          }
        />
        <span style={{ fontSize: 12, color: '#6b7280' }}>현재 글자 수: {value.length}</span>
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
    readOnly: false,
    rows: 4
  },
  parameters: {
    docs: {
      description: {
        story:
          '`defaultValue`만 전달해서 **비제어(Uncontrolled)** 로 사용하는 예시예요. `useControllableState`이 내부에서 초기값을 기반으로 상태를 관리해요.'
      }
    }
  },
  render: (args) => {
    const inputId = 'inputarea-uncontrolled'

    return (
      <Inputarea
        {...args}
        id={inputId}
        style={{ resize: 'none' }}
        defaultValue='DND는 사이드 프로젝트를 통해 실무 경험을 쌓고, 서로의 성장을 응원하는 IT 동아리입니다.'
        placeholder='프로젝트에 대한 설명을 입력해주세요.'
        topAddon={<Inputarea.Label id={inputId}>프로젝트 설명</Inputarea.Label>}
        bottomAddon={
          <Inputarea.BottomText>defaultValue로 초기화된 이후에는 Inputarea 내부에서 값을 관리하는 uncontrolled 예시예요.</Inputarea.BottomText>
        }
        leftAddon={
          <Inputarea.Icon
            name='edit'
            color={semantic.color.labelSubtitle}
            aria-hidden
          />
        }
      />
    )
  }
}
