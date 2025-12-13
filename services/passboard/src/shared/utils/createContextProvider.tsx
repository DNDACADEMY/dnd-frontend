import { useContext, createContext, type ReactNode, useMemo } from 'react'

type ProviderProps<T> = {
  children: ReactNode
} & T

export function createCtxProvider<T extends Record<string, unknown>>(
  componentName: string,
  defaultValue?: T
) {
  const Context = createContext<T | undefined>(defaultValue)

  function Provider(props: ProviderProps<T>) {
    const { children, ...value } = props

    const memoizedValue = useMemo(
      () => value as unknown as T,
      // eslint-disable-next-line react-hooks/exhaustive-deps
      Object.values(value)
    )

    return <Context.Provider value={memoizedValue}>{children}</Context.Provider>
  }

  Provider.displayName = componentName + 'Provider'

  function useCtx(displayName: string) {
    const value = useContext(Context)
    if (value === undefined) {
      throw new Error(`${displayName} Context must be used within its ${componentName} provider`)
    }
    return value
  }

  return [Provider, useCtx] as const
}
