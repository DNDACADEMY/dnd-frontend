import { TextareaSize } from './type'
import { createCtxProvider } from '../../utils/createCtxProvider'

type TextareaContextType = {
  size: TextareaSize
  id: string
}

const [TextareaContextProvider, useTextareaContext] = createCtxProvider<TextareaContextType>('Textarea', {
  size: 'medium',
  id: ''
})

export { TextareaContextProvider, useTextareaContext }
