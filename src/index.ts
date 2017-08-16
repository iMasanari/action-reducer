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
  (reducer: Reducer<S, undefined>, type?: string | symbol): EnptyActionCreator
  <P>(reducer: Reducer<S, P>, type?: string | symbol): PayloadActionCreator<P>
}


let typeId = 0

export default function ActionReducer<S>(initState: S, prefix?: string) {
  const _reducers = {} as { [key: string]: Reducer<S, any> }

  const createAction: CreateAction<S> = <P>(
    reducer: Reducer<S, any>,
    type: (string | symbol) = `@@ActionReducer-${++typeId}`
  ) => {
    type = prefix ? `${prefix}/${type}` : type

    const action = ((payload: P) => ({ type, payload })) as PayloadActionCreator<P>

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
