import { http, HttpResponse } from 'msw'

import { MOCK_SERVER_URL } from './constants'
import { MOCK_DEFAULT_FORM, MOCK_DND_APPLY_FORM, MOCK_DND_MID_REVIEW_FORM } from './data'

export const handlers = [
  http.get(`${MOCK_SERVER_URL}/forms/1`, () => {
    return HttpResponse.json(MOCK_DEFAULT_FORM)
  }),
  http.get(`${MOCK_SERVER_URL}/forms/2`, () => {
    return HttpResponse.json(MOCK_DND_APPLY_FORM)
  }),
  http.get(`${MOCK_SERVER_URL}/forms/3`, () => {
    return HttpResponse.json(MOCK_DND_MID_REVIEW_FORM)
  }),
  http.post(`${MOCK_SERVER_URL}/forms/:id/submit`, () => {
    return HttpResponse.json({ success: true })
  })
] as const
