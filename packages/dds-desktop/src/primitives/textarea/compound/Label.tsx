import { FieldboxLabelProps } from '../../fieldbox'
import { Fieldbox } from '../../fieldbox'
import { useTextareaContext } from '../context'

export type TextareaLabelProps = Omit<FieldboxLabelProps, 'id'>

export const TextareaLabel = (props: TextareaLabelProps) => {
  const { children, ...restProps } = props
  const { id } = useTextareaContext('Textarea.Label')

  return (
    <Fieldbox.Label
      id={id}
      {...restProps}>
      {children}
    </Fieldbox.Label>
  )
}

TextareaLabel.displayName = 'Textarea.Label'
