'use client'

import { Button, Textfield } from '@dds/desktop'
import { zodResolver } from '@hookform/resolvers/zod'
import { sendGTMEvent } from '@next/third-parties/google'
import { useOverlay } from '@toss/use-overlay'
import { useForm } from 'react-hook-form'

import * as styles from './style.css'
import { Alert } from '../../../../components/Alert'
import { useCheckUserStatus, checkUserStatusSchema, type ReqCheckUserStatusSchema } from '../../../../remotes'
import { type EventResultStatus } from '../../../../types/passboard'

export type EventResultFormProps = {
  eventId: number
  eventName: string
  setEventStatusAction: (status: EventResultStatus) => void
}

export const EventResultForm = ({ eventName, eventId, setEventStatusAction }: EventResultFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ReqCheckUserStatusSchema>({
    resolver: zodResolver(checkUserStatusSchema),
    defaultValues: {
      name: '',
      email: ''
    }
  })
  const { mutate: checkUserStatusMutation, isPending: isChecking } = useCheckUserStatus()
  const overlay = useOverlay()

  const handleOpenNotFoundAlert = () => {
    overlay.open(({ isOpen, close }) => (
      <NotFoundAlert
        isOpen={isOpen}
        close={close}
      />
    ))
  }

  const onSubmit = handleSubmit(async (data) => {
    sendGTMEvent(
      {
        eventName,
        name: data.name,
        email: data.email
      },
      '지원 결과 조회'
    )
    checkUserStatusMutation(
      { eventId, ...data },
      {
        onSuccess: async (res) => {
          if (res?.status === 'NONE') {
            handleOpenNotFoundAlert()
          } else {
            setEventStatusAction(res?.status)
            reset()
          }
        }
      }
    )
  })

  return (
    <form
      onSubmit={onSubmit}
      className={styles.formContent}>
      <Textfield
        placeholder='이름을 입력해주세요.'
        topAddon={<Textfield.Label required>이름</Textfield.Label>}
        bottomAddon={errors.name?.message && <Textfield.BottomText>{errors.name?.message}</Textfield.BottomText>}
        error={!!errors.name?.message}
        {...register('name')}
      />
      <Textfield
        placeholder='이메일을 입력해주세요.'
        topAddon={<Textfield.Label required>이메일</Textfield.Label>}
        bottomAddon={errors.email?.message && <Textfield.BottomText>{errors.email?.message}</Textfield.BottomText>}
        error={!!errors.email?.message}
        {...register('email')}
      />
      <Button
        type='submit'
        size='xlarge'
        disabled={isChecking}>
        결과 확인하기
      </Button>
    </form>
  )
}

type NotFoundAlertProps = {
  isOpen: boolean
  close: () => void
}

const NotFoundAlert = ({ isOpen, close }: NotFoundAlertProps) => {
  return (
    <Alert
      isOpen={isOpen}
      onClose={close}>
      <Alert.Backdrop />
      <Alert.Content bottomAddon={<Alert.Button type='button'>닫기</Alert.Button>}>
        <Alert.Title>
          입력하신 정보를
          <br /> 찾을 수 없습니다.
        </Alert.Title>
        <Alert.Description>이름과 이메일을 다시 확인해주세요.</Alert.Description>
        <Alert.SubDescription>지속 된 문제 발생시 채널톡으로 문의주세요.</Alert.SubDescription>
      </Alert.Content>
    </Alert>
  )
}
