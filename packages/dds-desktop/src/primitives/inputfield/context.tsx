import { InputfieldSize } from './type'
import { createCtxProvider } from '../../utils/createCtxProvider'

type InputfieldContextType = {
  size: InputfieldSize
}

const [InputfieldContextProvider, useInputfieldContext] = createCtxProvider<InputfieldContextType>('Inputfield', {
  size: 'medium'
})

export { InputfieldContextProvider, useInputfieldContext }
