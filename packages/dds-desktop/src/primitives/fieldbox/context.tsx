import { FieldBoxSize } from './type'
import { createCtxProvider } from '../../utils/createCtxProvider'

type FieldboxContextType = {
  size: FieldBoxSize
  required: boolean
}

const [FieldboxContextProvider, useFieldboxContext] = createCtxProvider<FieldboxContextType>('Fieldbox', {
  size: 'medium',
  required: false
})

export { FieldboxContextProvider, useFieldboxContext }
