import { useId as useIdReact } from 'react'

interface UseGeneratedIdParams {
  defaultId?: string
  prefix?: string
}

/**
 * 고유 ID를 생성하는 훅입니다.
 * @param params - 고유 ID를 생성하는 파라미터입니다.
 * @param params.defaultId - 기본 ID입니다.
 * @param params.prefix - 접두사입니다.
 * @returns
 */
export function useGeneratedId(params: UseGeneratedIdParams = {}) {
  const { defaultId: idFromParams, prefix } = params

  const generatedId = useIdReact()

  let id = ''

  if (idFromParams) {
    id = idFromParams
  } else {
    id = generatedId
  }

  if (prefix) {
    id = `${prefix}-${id}`
  }

  return id
}
