import { FieldboxLabelProps } from '../../fieldbox'
import { Fieldbox } from '../../fieldbox'
import { useTextfieldContext } from '../context'

export type TextfieldLabelProps = Omit<FieldboxLabelProps, 'id'>

export const TextfieldLabel = (props: TextfieldLabelProps) => {
  const { children, ...restProps } = props
  const { id } = useTextfieldContext('Textfield.Label')

  return (
    <Fieldbox.Label
      id={id}
      {...restProps}>
      {children}
    </Fieldbox.Label>
  )
}

TextfieldLabel.displayName = 'Textfield.Label'
