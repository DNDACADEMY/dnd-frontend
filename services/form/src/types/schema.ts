import { InputareaProps, InputfieldProps } from '@dds/desktop'

export type FormType = 'DEFAULT' | 'REVIEW' | 'APPLY'

export type QuestionType = 'INPUT_FIELD' | 'INPUT_AREA'

interface BaseQuestion {
  id: string
  type: QuestionType
  label: string
  description?: string
  required: boolean
  disabled: boolean
  readOnly: boolean
}

export interface InputFieldQuestion extends BaseQuestion {
  type: 'INPUT_FIELD'
  props: InputfieldProps
}

export interface InputAreaQuestion extends BaseQuestion {
  type: 'INPUT_AREA'
  props: InputareaProps
}

export type Question = InputFieldQuestion | InputAreaQuestion

export interface FormSchema {
  id: string
  title: string
  description: string
  formType: FormType
  questions: Question[]
  createdAt: Date | string
  closedAt?: Date | string
}
