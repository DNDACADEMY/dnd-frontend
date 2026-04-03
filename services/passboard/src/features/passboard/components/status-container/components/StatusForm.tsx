'use client'

import { Button, Textfield } from '@dds/desktop'
import { zodResolver } from '@hookform/resolvers/zod'
import { sendGTMEvent } from '@next/third-parties/google'
import { useOverlay } from '@toss/use-overlay'
import { useState, type ComponentProps, forwardRef } from 'react'
import { useForm } from 'react-hook-form'

import { Alert } from '../../../../../shared/components/Alert'
import { Flex } from '../../../../../shared/components/Flex'
import { checkUserStatusSchema } from '../../../apis/checkUserStatus'
import { useStatusContainerContext } from '../../../context'
import { useCheckUserStatus } from '../../../hooks/useCheckUserStatus'

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

  const { mutate: checkUserStatus, isPending: isChecking } = useCheckUserStatus()
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
    checkUserStatus(
      { eventId, req: data },
      {
        onSuccess: async (res) => {
          if (res.status === 'NONE') {
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

  return (
    <Flex
      direction='column'
      gap={32}
      asChild>
      <form onSubmit={onSubmit}>
        <StatusField
          label='이름'
          placeholder='이름을 입력해주세요.'
          errorMessage={errors.name?.message}
          {...register('name')}
        />
        <StatusField
          label='이메일'
          placeholder='이메일을 입력해주세요.'
          errorMessage={errors.email?.message}
          {...register('email')}
        />
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

interface StatusFieldProps extends ComponentProps<typeof Textfield> {
  label: string
  placeholder: string
  errorMessage?: string
}

const StatusField = forwardRef<HTMLInputElement, StatusFieldProps>((props, ref) => {
  const { label, placeholder, errorMessage, ...restProps } = props

  return (
    <Textfield
      ref={ref}
      placeholder={placeholder}
      topAddon={<Textfield.Label required>{label}</Textfield.Label>}
      bottomAddon={errorMessage && <Textfield.BottomText>{errorMessage}</Textfield.BottomText>}
      {...restProps}
    />
  )
})

StatusField.displayName = 'StatusField'

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
