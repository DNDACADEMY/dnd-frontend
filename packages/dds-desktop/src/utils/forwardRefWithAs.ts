import { forwardRef } from 'react'

import type { ElementType, ComponentPropsWithRef, ReactElement } from 'react'

type AsProps<T extends ElementType> = {
  as?: T
}

type PolymorphicComponentProps<T extends ElementType, Props = object> = AsProps<T> &
  Props &
  Omit<ComponentPropsWithRef<T>, keyof (AsProps<T> & Props)>

type PolymorphicRef<T extends ElementType> = ComponentPropsWithRef<T>['ref']

type PolymorphicComponentPropsWithRef<T extends ElementType, Props = object> = PolymorphicComponentProps<T, Props> & { ref?: PolymorphicRef<T> }

export const forwardRefWithAs = <DefaultElement extends ElementType, OwnProps = object>(
  render: <T extends ElementType = DefaultElement>(props: PolymorphicComponentProps<T, OwnProps>, ref: PolymorphicRef<T>) => ReactElement | null
) => {
  return forwardRef(render as never) as <T extends ElementType = DefaultElement>(
    props: PolymorphicComponentPropsWithRef<T, OwnProps>
  ) => ReactElement | null
}
