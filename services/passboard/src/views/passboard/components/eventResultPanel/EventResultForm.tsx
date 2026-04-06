'use client'

import { Button, Textfield } from '@dds/desktop'
import { zodResolver } from '@hookform/resolvers/zod'
import { useOverlay } from '@toss/use-overlay'
import { useRef } from 'react'
import { useForm } from 'react-hook-form'

import * as styles from './style.css'
import { Alert } from '../../../../components/Alert'
import { useCheckUserStatus, checkUserStatusSchema, type ReqCheckUserStatusSchema } from '../../../../remotes'
import { type EventResultStatus } from '../../../../types/passboard'

export type EventResultFormProps = {
  eventId: number
  setEventStatusAction: (status: EventResultStatus) => void
}

export const EventResultForm = ({ eventId, setEventStatusAction }: EventResultFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ReqCheckUserStatusSchema>({
    resolver: zodResolver(checkUserStatusSchema),
    defaultValues: {
      name: '',
      email: ''
    }
  })
  const { mutate: checkUserStatusMutation, isPending, isSuccess } = useCheckUserStatus()
  const overlay = useOverlay()
  const lastSubmittedKey = useRef<string | null>(null)

  const handleOpenNotFoundAlert = () => {
    overlay.open(({ isOpen, close }) => (
      <NotFoundAlert
        isOpen={isOpen}
        close={close}
      />
    ))
  }

  const onSubmit = handleSubmit(async (data) => {
    const submittedKey = `${eventId}|${data.name}|${data.email}`
    if (lastSubmittedKey.current === submittedKey) return

    checkUserStatusMutation(
      { eventId, ...data },
      {
        onSuccess: async (res) => {
          lastSubmittedKey.current = submittedKey

          if (res?.status === 'NONE') {
            handleOpenNotFoundAlert()
            return
          }

          setEventStatusAction(res?.status)
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
        error={Boolean(errors.name?.message)}
        {...register('name')}
      />
      <Textfield
        placeholder='이메일을 입력해주세요.'
        topAddon={<Textfield.Label required>이메일</Textfield.Label>}
        bottomAddon={errors.email?.message && <Textfield.BottomText>{errors.email?.message}</Textfield.BottomText>}
        error={Boolean(errors.email?.message)}
        {...register('email')}
      />
      <Button
        size='xlarge'
        disabled={isPending || isSuccess}>
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
