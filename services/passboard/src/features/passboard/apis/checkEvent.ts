import { fetchWrapper } from '@/shared/utils/fetchWrapper'

export type ResCheckEvent = {
  name: string
  id: number
  resultAnnouncementDateTime: string | Date
  isResultAnnounced: boolean
}

export const checkEvent = async (): Promise<ResCheckEvent> => {
  const res = await fetchWrapper<ResCheckEvent>('/events/current', {
    method: 'GET'
  })
  return res
}
