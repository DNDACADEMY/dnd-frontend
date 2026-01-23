import { TextfieldSize } from './type'
import { createCtxProvider } from '../../utils/createCtxProvider'

type TextfieldContextType = {
  size: TextfieldSize
}

const [TextfieldContextProvider, useTextfieldContext] = createCtxProvider<TextfieldContextType>('Textfield', {
  size: 'medium'
})

export { TextfieldContextProvider, useTextfieldContext }
