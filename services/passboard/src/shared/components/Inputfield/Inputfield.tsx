import { type ComponentProps, forwardRef, type ReactNode, useId } from 'react'
import { Textfield } from '../Textfield'
import { Flex } from '../Flex'
import { BottomText, Label } from './compound'
import { InputfieldContextProvider } from './context'

export type InputfieldProps = {
  topAddon?: ReactNode
  bottomAddon?: ReactNode
} & ComponentProps<typeof Textfield>

const InputfieldComponent = forwardRef<HTMLInputElement, InputfieldProps>(
  ({ placeholder, value, topAddon, bottomAddon, ...restProps }, ref) => {
    const id = useId()

    return (
      <InputfieldContextProvider id={id}>
        <Flex
          direction='column'
          gap={4}>
          {topAddon}
          <Textfield
            id={id}
            size='large'
            placeholder={placeholder}
            value={value}
            ref={ref}
            {...restProps}
          />
          {bottomAddon}
        </Flex>
      </InputfieldContextProvider>
    )
  }
)

InputfieldComponent.displayName = 'Inputfield'

export const Inputfield = Object.assign(InputfieldComponent, {
  Label: Label,
  BottomText: BottomText
})
