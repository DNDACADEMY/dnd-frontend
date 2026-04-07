import { http, HttpResponse } from 'msw'

import { MOCK_SERVER_URL } from '../../constants'

import type { ResCheckEvent, ReqCheckUserStatusSchema } from '../../remotes/index.js'

const APPLICANT_STATUSES = ['PASSED', 'FAILED', 'WAITLISTED'] as const

export const passboardHandlers = [
  http.get(`${MOCK_SERVER_URL}/events/current`, () => {
    const eventStartDate = '2025-05-14T12:00:00'
    const eventEndDate = '2025-05-14T12:00:00'

    const data: Omit<ResCheckEvent, 'eventStartDate' | 'eventEndDate'>[] = [
      {
        name: 'DND 13기 모집',
        id: 1234567890,
        resultAnnouncementDateTime: '2025-06-11T12:00:00',
        isResultAnnounced: true
      },
      {
        name: 'DND 해커톤 모집',
        id: 1234567890,
        resultAnnouncementDateTime: '2025-06-11T12:00:00',
        isResultAnnounced: true
      }
    ]
    return HttpResponse.json({
      ...data[Math.floor(Math.random() * data.length)],
      eventStartDate,
      eventEndDate
    })
  }),
  http.post(`${MOCK_SERVER_URL}/event/:eventId/applicant/status/check`, async ({ request, params }) => {
    const { eventId } = params
    const body = (await request.json()) as ReqCheckUserStatusSchema

    return HttpResponse.json({
      eventId,
      status: APPLICANT_STATUSES[Math.floor(Math.random() * APPLICANT_STATUSES.length)],
      ...body
    })
  })
]
