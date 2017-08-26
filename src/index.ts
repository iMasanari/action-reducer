export interface AnyAction {
  type: any
  [extraProps: string]: any
}

export interface Action<P> {
  type: string | symbol
  payload: P
}

export interface PayloadActionCreator<P> {
  (payload: P): Action<P>
  type: string | symbol
}

export interface EnptyActionCreator {
  (): Action<undefined>
  type: string | symbol
}

export interface OptionalActionCreator<P> {
  (payload?: P): Action<P | undefined>
  type: string | symbol
}

export type ReducerFragment<S, P> = (state: Readonly<S>, payload: P) => S

export interface CreateEnptyActionCreator<S> {
  // Use `void` instead of `undefined` for when strictNullChecks is disabled
  (reducer: ReducerFragment<S, void>): EnptyActionCreator
  (type: string | symbol, reducer: ReducerFragment<S, void>): EnptyActionCreator
}

export interface CreatePayloadActionCreator<S> {
  <P>(reducer: ReducerFragment<S, P>): PayloadActionCreator<P>
  <P>(type: string | symbol, reducer: ReducerFragment<S, P>): PayloadActionCreator<P>
}

export interface CreateAction<S> extends
  CreateEnptyActionCreator<S>,
  CreatePayloadActionCreator<S>
{ }


let typeId = 0

export default function ActionReducer<S>(initState: S, prefix?: string) {
  const _reducers = {} as { [key: string]: ReducerFragment<S, any> }

  const createAction: CreateAction<S> = <P>(
    type: string | symbol | ReducerFragment<S, any>,
    reducer?: ReducerFragment<S, any>,
  ) => {
    if (typeof type === 'function') {
      reducer = type
      type = `@@ActionReducer-${++typeId}`
    }

    type = prefix ? `${prefix}${type}` : type

    const actionCreator = ((payload?: P) => ({ type, payload })) as EnptyActionCreator

    actionCreator.type = type
    _reducers[type] = reducer!

    return actionCreator
  }

  const reducer = (state = initState, action: AnyAction) => {
    const reducer = _reducers[action.type] as ReducerFragment<S, any>

    return reducer ? reducer(state, action.payload) : state
  }

  if (process.env.NODE_ENV !== 'production') {
    const resultType = { createAction, reducer }

    return { createAction, reducer, _reducers } as typeof resultType
  }

  return { createAction, reducer }
}
