import { type UseMutationOptions, type UseQueryOptions, type QueryKey } from '@tanstack/react-query'

export type CommonProps = {
  children?: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

export type UseMutationCustomOptions<TData = unknown, TVariables = unknown> = Omit<
  UseMutationOptions<TData, Error, TVariables, unknown>,
  'mutationFn'
>

export type UseQueryCustomOptions<TQueryFnData = unknown, TData = TQueryFnData> = Omit<
  UseQueryOptions<TQueryFnData, Error, TData, QueryKey>,
  'queryKey'
>
