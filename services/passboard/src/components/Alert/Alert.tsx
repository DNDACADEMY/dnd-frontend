import { Txt } from '@dnd-lab/desktop'
import { motion } from 'framer-motion'
import { type ReactNode, type ComponentProps } from 'react'

import { AlertContextProvider, useAlertContext } from './context'
import * as styles from './styles.css'
import { vars } from '../../styles/theme.css'
import { composeHandler } from '../../utils/composeHandler'

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
      {!!bottomAddon && (
        <>
          <hr className={styles.border} />
          <div
            onClick={onClose}
            className={styles.bottomAddon}>
            {bottomAddon}
          </div>
        </>
      )}
    </motion.div>
  )
}

const Title = ({ children }: { children: ReactNode }) => {
  return (
    <Txt
      as='h4'
      typography='body1'
      fontWeight='bold'
      className={styles.title}>
      {children}
    </Txt>
  )
}

const Description = ({ children }: { children: ReactNode }) => {
  return (
    <Txt
      as='p'
      typography='caption1'
      fontWeight='medium'
      className={styles.description}>
      {children}
    </Txt>
  )
}

const SubDescription = ({ children }: { children: ReactNode }) => {
  return (
    <Txt
      as='p'
      typography='caption1'
      fontWeight='medium'
      color={vars.colors.gray600}
      className={styles.subDescription}>
      {children}
    </Txt>
  )
}

type ButtonProps = ComponentProps<'button'>

const Button = ({ type = 'button', children, onClick: onClickFromProps, ...props }: ButtonProps) => {
  const { onClose } = useAlertContext('Alert.Button')

  const handleClick = composeHandler(onClose, onClickFromProps)

  return (
    <button
      type={type}
      onClick={handleClick}
      {...props}>
      <Txt
        typography='body1'
        fontWeight='bold'
        color='#007AFF'>
        {children}
      </Txt>
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
