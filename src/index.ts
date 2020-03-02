export interface AnyAction {
  type: any
  [extraProps: string]: any
}

export interface Action<P, T extends string | symbol> {
  type: T
  payload: P
}

export interface ActionCreator<P extends unknown[], T extends string | symbol> {
  (...args: P): Action<P, T>
  type: T
}

export type Mutation<S, P extends unknown[]> = (state: Readonly<S>, ...payload: P) => S

export interface CreateAction<S> {
  <P extends unknown[], T extends string | symbol>(type: T, mutation: Mutation<S, P>): ActionCreator<P, T>
  <P extends unknown[]>(mutation: Mutation<S, P>): ActionCreator<P, string>
  <P extends unknown[]>(type: string | symbol, mutation: Mutation<S, P>): ActionCreator<P, string | symbol>
}

export interface CreateActionWithPrefix<S> {
  <P extends unknown[]>(mutation: Mutation<S, P>): ActionCreator<P, string>
  <P extends unknown[]>(type: string, mutation: Mutation<S, P>): ActionCreator<P, string>
}

interface ActionReducer {
  <S>(initState: S, prefix: string): {
    createAction: CreateActionWithPrefix<S>
    reducer: (state: S | undefined, action: AnyAction) => S
  }
  <S>(initState: S): {
    createAction: CreateAction<S>
    reducer: (state: S | undefined, action: AnyAction) => S
  }
}

let typeId = 0

const ActionReducer: ActionReducer = <S>(initState: S, prefix?: string) => {
  const mutations = Object.create(null) as Record<string, Mutation<S, unknown[]> | undefined>

  const createAction = <P extends unknown[]>(
    type: string | symbol | Mutation<S, P>,
    mutation?: Mutation<S, P>,
  ) => {
    if (typeof type === 'function') {
      mutation = type
      type = `@@ActionReducer-${++typeId}`
    }

    type = prefix ? `${prefix}${type as string}` : (type as string)

    const actionCreator = (...payload: P) => ({ type, payload }) as Action<P, string>

    actionCreator.type = type
    mutations[type] = mutation as Mutation<S, unknown[]>

    return actionCreator
  }

  const reducer = (state = initState, action: AnyAction) => {
    const mutation = mutations[action.type]

    return mutation ? mutation(state, ...action.payload) : state
  }

  return { createAction, reducer }
}

export default ActionReducer
