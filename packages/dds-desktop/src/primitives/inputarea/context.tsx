import { InputareaSize } from './type'
import { createCtxProvider } from '../../utils/createCtxProvider'

type InputareaContextType = {
  size: InputareaSize
}

const [InputareaContextProvider, useInputareaContext] = createCtxProvider<InputareaContextType>('Inputarea', {
  size: 'medium'
})

export { InputareaContextProvider, useInputareaContext }
