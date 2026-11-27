import { z } from 'zod'

import { parseKST } from '../utils/date'

export const eventSchema = z.object({
  name: z.string(),
  id: z.number().int().positive(),
  resultAnnouncementDateTime: z
    .string()
    .transform((value) => parseKST(value).format())
    .pipe(z.string().datetime({ offset: true })),
  isResultAnnounced: z.boolean()
})

export type PassboardEvent = z.infer<typeof eventSchema>

export async function readEvent(response: Response): Promise<PassboardEvent | null> {
  if (response.status === 404 && (await response.json()).code === 'EV001') return null
  if (!response.ok) throw new Error('Passboard event is unavailable')
  const value = await response.json()
  // Legacy environments can represent an unset schedule in a successful response.
  if (value.resultAnnouncementDateTime === null) return null
  return eventSchema.parse(value)
}
