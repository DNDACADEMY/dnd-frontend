import { type ReactNode } from 'react'

import { useInputfieldContext } from '../context'
import * as styles from '../style.css'

export type LabelProps = {
  children: ReactNode
  required?: boolean
}

export const Label = ({ children, required = false }: LabelProps) => {
  const { id } = useInputfieldContext('Inputfield')

  return (
    <label
      htmlFor={id}
      className={styles.labelStyle}>
      {children}
      {required && <span className={styles.requiredStyle}>*</span>}
    </label>
  )
}
