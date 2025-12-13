import { SERVER_URL } from '../constants'

export const fetchWrapper = async <T>(url: string, fetchOptions?: RequestInit): Promise<T> => {
  const res = await fetch(`${SERVER_URL}${url}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...fetchOptions?.headers
    },
    ...fetchOptions
  })

  if (!res.ok) {
    throw new Error('Failed to fetch')
  }

  const data = await res.json()
  return data
}
