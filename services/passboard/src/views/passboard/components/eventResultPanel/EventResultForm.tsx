'use client'

import { Button, Textfield } from '@dnd-lab/desktop'
import { zodResolver } from '@hookform/resolvers/zod'
import { useOverlay } from '@toss/use-overlay'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import * as styles from './style.css'
import { Alert } from '../../../../components/Alert'
import { useCheckUserStatus, checkUserStatusSchema, LookupError, type ReqCheckUserStatusSchema } from '../../../../remotes'
import { type EventResultStatus } from '../../../../types/passboard'

export type EventResultFormProps = {
  eventId: number
  setResultAction: (result: { status: EventResultStatus; userName: string } | null) => void
}

export const EventResultForm = ({ eventId, setResultAction }: EventResultFormProps) => {
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
  const { mutate: checkUserStatusMutation, isPending } = useCheckUserStatus()
  const overlay = useOverlay()
  const [message, setMessage] = useState('')

  const handleOpenNotFoundAlert = () => {
    overlay.open(({ isOpen, close }) => (
      <NotFoundAlert
        isOpen={isOpen}
        close={close}
      />
    ))
  }

  const onSubmit = handleSubmit(async (user) => {
    setMessage('')

    checkUserStatusMutation(
      { eventId, ...user },
      {
        onSuccess: async (res) => {
          if (res.status === 'NONE') {
            handleOpenNotFoundAlert()
            return
          }

          setResultAction({ status: res.status, userName: res.name })
        },
        onError: (error) => {
          const code = error instanceof LookupError ? error.code : undefined
          if (code === 'AP001') handleOpenNotFoundAlert()
          else
            setMessage(
              code === 'AP002'
                ? '합격자 조회 가능 기간이 아닙니다.'
                : code === 'RATE'
                  ? '조회가 많습니다. 잠시 후 다시 시도해 주세요.'
                  : '조회 연결이 원활하지 않습니다. 다시 시도해 주세요.'
            )
        }
      }
    )
  })

  return (
    <form
      method='post'
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
      {message && <p role='alert'>{message}</p>}
      <Button
        size='xlarge'
        disabled={isPending}>
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
