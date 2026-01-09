import { semantic } from '@dds/token'

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
        component:
          'Inputfield 컴포넌트는 라벨, 아이콘, 입력 영역, 보조 텍스트를 하나의 필드 단위로 묶어서 사용할 때 사용하는 입력 필드 프리미티브예요.'
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
