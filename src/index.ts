export interface Action<P> {
  type: string | symbol
  payload: P
}

export interface PayloadActionCreater<P> {
  (payload: P): Action<P>
  type: string | symbol
}

export interface EnptyActionCreater {
  (payload?: null): Action<undefined>
  type: string | symbol
}

export interface OptionalActionCreater<P> {
  (payload?: P): Action<P>
  type: string | symbol
}

export type CreateOptionalAction<S> =
  <P>(reducer: (state: S, payload: P) => S, type?: string | symbol) => OptionalActionCreater<P>

type Reducer<S, P> = (state: S, payload: P) => S

type CreateAction<S> = {
  (reducer: Reducer<S, undefined>, type?: string | symbol): EnptyActionCreater
  <P>(reducer: Reducer<S, P>, type?: string | symbol): PayloadActionCreater<P>
}


let typeId = 0

export default function ActionReducer<S>(initState: S, prefix?: string) {
  const _reducers = {} as { [key: string]: Reducer<S, any> }

  const createAction: CreateAction<S> = <P>(
    reducer: Reducer<S, any>,
    type: (string | symbol) = `@@ActionReducer-${++typeId}`
  ) => {
    type = prefix ? `${prefix}/${type}` : type

    const action = ((payload: P) => ({ type, payload })) as PayloadActionCreater<P>

    action.type = type
    _reducers[type] = reducer

    return action
  }

  const reducer = (state = initState, action: { type: any }) => {
    const reducer = _reducers[action.type] as Reducer<S, any>

    return reducer ? reducer(state, (action as Action<any>).payload) : state
  }

  if (process.env.NODE_ENV !== 'production') {
    const resultType = { createAction, reducer }

    return { createAction, reducer, _reducers } as typeof resultType
  }

  return { createAction, reducer }
}
