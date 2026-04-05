import { motion } from 'framer-motion'
import { type ReactNode, type ComponentProps } from 'react'

import * as styles from './styles.css'
import { composeHandler } from '../../utils/composeHandler'
import { If } from '../If'
import { AlertContextProvider, useAlertContext } from './context'

export type AlertProps = {
  children: ReactNode
  isOpen: boolean
  onClose: () => void
}

const AlertImp = ({ children, isOpen, onClose }: AlertProps) => {
  if (!isOpen) return null

  return (
    <AlertContextProvider onClose={onClose}>
      <div className={styles.container}>{children}</div>
    </AlertContextProvider>
  )
}

const Backdrop = () => {
  const { onClose } = useAlertContext('Alert.Backdrop')
  return (
    <motion.div
      className={styles.backdrop}
      onClick={onClose}
    />
  )
}

export type AlertContentProps = {
  children: ReactNode
  bottomAddon?: ReactNode
}

const Content = ({ children, bottomAddon }: AlertContentProps) => {
  const { onClose } = useAlertContext('Alert.Content')
  return (
    <motion.div
      className={styles.contentWrapper}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>
      <div className={styles.content}>{children}</div>
      <If condition={!!bottomAddon}>
        <hr className={styles.border} />
        <div
          onClick={onClose}
          className={styles.bottomAddon}>
          {bottomAddon}
        </div>
      </If>
    </motion.div>
  )
}

const Title = ({ children }: { children: ReactNode }) => {
  return <h4 className={styles.title}>{children}</h4>
}

const Description = ({ children }: { children: ReactNode }) => {
  return <p className={styles.description}>{children}</p>
}

const SubDescription = ({ children }: { children: ReactNode }) => {
  return <p className={styles.subDescription}>{children}</p>
}

type ButtonProps = ComponentProps<'button'>

const Button = ({ type = 'button', children, onClick: onClickFromProps, ...props }: ButtonProps) => {
  const { onClose } = useAlertContext('Alert.Button')

  const handleClick = composeHandler(onClose, onClickFromProps)

  return (
    <button
      type={type}
      className={styles.button}
      onClick={handleClick}
      {...props}>
      {children}
    </button>
  )
}
export const Alert = Object.assign(AlertImp, {
  Backdrop: Backdrop,
  Content: Content,
  Title: Title,
  Description: Description,
  SubDescription: SubDescription,
  Button: Button
})
