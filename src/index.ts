export interface Action<P> {
  type: string | symbol
  payload: P
}

export interface PayloadActionCreator<P> {
  (payload: P): Action<P>
  type: string | symbol
}

export interface EnptyActionCreator {
  (payload?: undefined): Action<undefined>
  type: string | symbol
}

export interface OptionalActionCreator<P> {
  (payload?: P): Action<P | undefined>
  type: string | symbol
}

type Reducer<S, P> = (state: S, payload: P) => S

type CreateAction<S> = {
  (reducer: Reducer<S, undefined>): EnptyActionCreator
  (type: string | symbol, reducer: Reducer<S, undefined>): EnptyActionCreator
  <P>(reducer: Reducer<S, P>): PayloadActionCreator<P>
  <P>(type: string | symbol, reducer: Reducer<S, P>): PayloadActionCreator<P>
}


let typeId = 0

export default function ActionReducer<S>(initState: S, prefix?: string) {
  const _reducers = {} as { [key: string]: Reducer<S, any> }

  const createAction: CreateAction<S> = <P>(
    type: string | symbol | Reducer<S, any>,
    reducer?: Reducer<S, any>,
  ) => {
    if (typeof type === 'function') {
      reducer = type
      type = `@@ActionReducer-${++typeId}`
    }

    type = prefix ? `${prefix}/${type}` : type
    
    const actionCreator = ((payload: P) => ({ type, payload })) as PayloadActionCreator<P>

    actionCreator.type = type
    _reducers[type] = reducer!

    return actionCreator
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
