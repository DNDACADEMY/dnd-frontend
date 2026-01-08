import { semantic } from '@dds/token'

import { Txt } from '../txt'
import { Fieldbox } from './Fieldbox'

import type { FieldboxProps } from './Fieldbox'
import type { Meta, StoryObj } from '@storybook/react-vite'

interface FieldboxStoryProps extends FieldboxProps {
  /**
   * 상단 라벨(topAddon) 영역 노출 여부를 설정해요.
   */
  showTopAddon: boolean
  /**
   * 하단 텍스트(bottomAddon) 영역 노출 여부를 설정해요.
   */
  showBottomAddon: boolean
  /**
   * 상단 라벨에 필수(required) 표시를 할지 여부를 설정해요.
   */
  isRequiredLabel: boolean
}

const meta = {
  title: 'Primitives/Fieldbox',
  component: Fieldbox,
  parameters: {
    layout: 'centered',
    controls: {
      exclude: ['ref', 'topAddon', 'bottomAddon', 'leftAddon', 'rightAddon', 'as']
    },
    docs: {
      description: {
        component:
          'Fieldbox 컴포넌트는 라벨, 입력 영역, 보조 텍스트를 하나의 필드 블록 형태로 묶어서 배치할 때 사용하는 내부 전용 레이아웃 컴포넌트예요.'
      }
    }
  },
  tags: ['autodocs'],
  subcomponents: {
    Label: Fieldbox.Label,
    BottomTxt: Fieldbox.BottomTxt
  }
} satisfies Meta<FieldboxStoryProps>

export default meta

type Story = StoryObj<typeof meta>

const CustomInput = ({ id }: { id?: string }) => (
  <Txt
    as='input'
    id={id}
    typography='body2'
    fontWeight='regular'
    color={semantic.color.labelSubtitle}
    placeholder='example@dnd.com'
    style={{ flex: 1, padding: 0, border: 'none', outline: 'none', backgroundColor: 'transparent', height: 22 }}
  />
)

export const Basic: Story = {
  args: {
    showTopAddon: true,
    showBottomAddon: true,
    isRequiredLabel: false
  },
  render: (args) => {
    const { showTopAddon, showBottomAddon, isRequiredLabel, ...fieldboxProps } = args

    return (
      <Fieldbox
        {...fieldboxProps}
        topAddon={
          showTopAddon ? (
            <Fieldbox.Label
              id='fieldbox-default'
              required={isRequiredLabel}>
              이메일 주소
            </Fieldbox.Label>
          ) : undefined
        }
        bottomAddon={showBottomAddon ? <Fieldbox.BottomTxt>이메일 주소를 입력해 주세요.</Fieldbox.BottomTxt> : undefined}>
        <CustomInput />
      </Fieldbox>
    )
  }
}

export const Label: Story = {
  args: {
    showTopAddon: true,
    isRequiredLabel: false
  },
  render: (args) => {
    const { showTopAddon, isRequiredLabel, ...fieldboxProps } = args

    return (
      <Fieldbox
        {...fieldboxProps}
        topAddon={
          showTopAddon ? (
            <Fieldbox.Label
              id='fieldbox-default'
              required={isRequiredLabel}>
              이메일 주소
            </Fieldbox.Label>
          ) : undefined
        }>
        <CustomInput id='fieldbox-default' />
      </Fieldbox>
    )
  }
}

export const BottomTxt: Story = {
  args: {
    showBottomAddon: true
  },
  render: (args) => {
    const { showBottomAddon, ...fieldboxProps } = args

    return (
      <Fieldbox
        {...fieldboxProps}
        bottomAddon={showBottomAddon ? <Fieldbox.BottomTxt>입력란 하단에 노출되는 설명 텍스트 예시예요.</Fieldbox.BottomTxt> : undefined}>
        <CustomInput id='fieldbox-default' />
      </Fieldbox>
    )
  }
}
