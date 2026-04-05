'use client'

import { Button, Textfield } from '@dds/desktop'
import { zodResolver } from '@hookform/resolvers/zod'
import { sendGTMEvent } from '@next/third-parties/google'
import { useOverlay } from '@toss/use-overlay'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Alert } from '../../../../../components/Alert'
import { Flex } from '../../../../../components/Flex'
import { useCheckUserStatus, checkUserStatusSchema } from '../../../../../remotes'
import { useStatusContainerContext } from '../../../context'

import type { z } from 'zod'

export type StatusFormProps = {
  eventName: string
  eventId: number
}

export const StatusForm = ({ eventName, eventId }: StatusFormProps) => {
  const [failedData, setFailedData] = useState<{ name: string; email: string } | null>(null)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<z.infer<typeof checkUserStatusSchema>>({
    resolver: zodResolver(checkUserStatusSchema),
    defaultValues: {
      name: '',
      email: ''
    }
  })

  const { mutate: checkUserStatusMutation, isPending: isChecking } = useCheckUserStatus()

  const [alertOpen, setAlertOpen] = useState(false)
  const { setStatus } = useStatusContainerContext('StatusForm')
  const overlay = useOverlay()

  const handleAlertOpen = () => {
    setAlertOpen(true)
    openAlert()
  }

  const handleAlertClose = (close: () => void) => {
    setAlertOpen(false)
    close()
  }

  const openAlert = () => {
    return overlay.open(({ isOpen, close }) => (
      <NotFoundAlert
        isOpen={isOpen}
        close={() => handleAlertClose(close)}
      />
    ))
  }

  const onSubmit = handleSubmit(async (data) => {
    // 이전에 실패한 데이터와 동일한 경우
    if (failedData && failedData.name === data.name && failedData.email === data.email) {
      handleAlertOpen()
      return
    }

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
            setFailedData(data) // 실패한 데이터 저장
            handleAlertOpen()
          } else {
            setStatus(res)
            reset()
          }
        },
        onError: () => {
          setFailedData(data) // 실패한 데이터 저장
          handleAlertOpen()
        }
      }
    )
  })

  const isDisabled = !!errors.name?.message || !!errors.email?.message || isChecking || alertOpen

  const fields = [
    {
      label: '이름',
      placeholder: '이름을 입력해주세요.',
      errorMessage: errors.name?.message,
      ...register('name')
    },
    {
      label: '이메일',
      placeholder: '이메일을 입력해주세요.',
      errorMessage: errors.email?.message,
      ...register('email')
    }
  ] as const

  return (
    <Flex
      direction='column'
      gap={32}
      asChild>
      <form onSubmit={onSubmit}>
        {fields.map((field) => (
          <Textfield
            key={field.label}
            placeholder={field.placeholder}
            topAddon={<Textfield.Label required>{field.label}</Textfield.Label>}
            bottomAddon={field.errorMessage && <Textfield.BottomText>{field.errorMessage}</Textfield.BottomText>}
            disabled={isDisabled}
          />
        ))}

        <Button
          type='submit'
          size='xlarge'
          disabled={isDisabled}>
          결과 확인하기
        </Button>
      </form>
    </Flex>
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
