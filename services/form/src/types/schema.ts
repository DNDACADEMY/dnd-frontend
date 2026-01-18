import { InputareaProps, InputfieldProps } from '@dds/desktop'

export interface QuestionPropsMap {
  INPUT_FIELD: InputfieldProps
  INPUT_AREA: InputareaProps
}

export type QuestionType = keyof QuestionPropsMap

interface BaseQuestion {
  id: string
  label: string
  description?: string
  required: boolean
  disabled: boolean
  readOnly: boolean
}

export type Question = {
  [K in QuestionType]: BaseQuestion & {
    type: K
    props: QuestionPropsMap[K]
  }
}[QuestionType]

export type FormType = 'DEFAULT' | 'REVIEW' | 'APPLY'

export interface FormSchema {
  id: string
  title: string
  description: string
  formType: FormType
  questions: Question[]
  createdAt: string
  closedAt?: string
}
