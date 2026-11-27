'use client'

import { useEffect, useState } from 'react'

import { MOCK_SERVER_URL, SERVER_URL } from '../constants'
import { readEvent, type PassboardEvent } from '../remotes/event'
import { ErrorView } from '../views/error'
import { Passboard } from '../views/passboard'

export function LivePassboard({ initialEvent, initialUnavailable }: { initialEvent: PassboardEvent | null; initialUnavailable: boolean }) {
  const [event, setEvent] = useState(initialEvent)
  const [unavailable, setUnavailable] = useState(initialUnavailable)

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    let active: AbortController | undefined
    let disposed = false

    function schedule(current: PassboardEvent | null, failed = false) {
      if (disposed) return
      const until = current ? Date.parse(current.resultAnnouncementDateTime) - Date.now() : Infinity
      const delay = failed ? 3000 : until > 0 ? Math.min(until, 15000) : current?.isResultAnnounced ? 15000 : 1000
      timer = setTimeout(refresh, delay)
    }

    async function refresh() {
      clearTimeout(timer)
      active?.abort()
      const controller = new AbortController()
      active = controller
      try {
        const next = await readEvent(
          await fetch(SERVER_URL === MOCK_SERVER_URL ? `${MOCK_SERVER_URL}/events/current` : '/api/admission/events/current', {
            cache: 'no-store',
            signal: controller.signal
          })
        )
        if (disposed || controller.signal.aborted) return
        setEvent(next)
        setUnavailable(false)
        schedule(next)
      } catch {
        if (disposed || controller.signal.aborted) return
        setUnavailable(true)
        schedule(null, true)
      }
    }

    schedule(initialEvent, initialUnavailable)
    window.addEventListener('focus', refresh)
    document.addEventListener('visibilitychange', refresh)
    return () => {
      disposed = true
      clearTimeout(timer)
      active?.abort()
      window.removeEventListener('focus', refresh)
      document.removeEventListener('visibilitychange', refresh)
    }
  }, [initialEvent, initialUnavailable])

  if (unavailable) {
    return (
      <ErrorView
        title='발표 일정을 불러오지 못했습니다. 잠시 후 다시 연결합니다.'
        sendErrorEvent={false}
      />
    )
  }
  if (!event) {
    return (
      <ErrorView
        title={'현재 발표 일정이 없습니다.\n새로운 소식을 준비 중이니 조금만 기다려 주세요.'}
        sendErrorEvent={false}
      />
    )
  }
  return (
    <Passboard
      key={event.id}
      eventId={event.id}
      eventName={event.name}
      isEventVisible={event.isResultAnnounced}
      resultAnnouncementDateTime={new Date(event.resultAnnouncementDateTime)}
    />
  )
}
