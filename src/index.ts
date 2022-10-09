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
  <P extends unknown[], T extends string | symbol>(type: ActionCreator<P, T>, mutation: Mutation<S, P>): ActionCreator<P, T>
  <P extends unknown[]>(mutation: Mutation<S, P>): ActionCreator<P, string>
  <P extends unknown[], T extends string | symbol>(type: T | { type: T }, mutation: Mutation<S, P>): ActionCreator<P, T>
}

export interface CreateActionWithPrefix<S> {
  <P extends unknown[], T extends string | symbol>(type: ActionCreator<P, T>, mutation: Mutation<S, P>): ActionCreator<P, T>
  <P extends unknown[]>(mutation: Mutation<S, P>): ActionCreator<P, string>
  <P extends unknown[], T extends string>(type: { type: T }, mutation: Mutation<S, P>): ActionCreator<P, T>
  <P extends unknown[]>(type: string, mutation: Mutation<S, P>): ActionCreator<P, string>
}

interface ActionReducer {
  // 初期Stateなし
  <S>(initState: undefined, prefix: string): {
    createAction: CreateActionWithPrefix<S>
    reducer: (state: S, action: AnyAction) => S
  }
  <S>(initState?: undefined): {
    createAction: CreateAction<S>
    reducer: (state: S, action: AnyAction) => S
  }
  // 初期Stateあり
  <S>(initState: S, prefix: string): {
    createAction: CreateActionWithPrefix<S>
    reducer: (state: S | undefined, action: AnyAction) => S
  }
  <S>(initState: S): {
    createAction: CreateAction<S>
    reducer: (state: S | undefined, action: AnyAction) => S
  }
}

type TypeObject = { type: string | symbol }

let typeId = 0

const ActionReducer: ActionReducer = <S>(initState?: S, prefix?: string) => {
  const mutations = Object.create(null) as Record<string, Mutation<S, unknown[]> | undefined>

  const createAction = <P extends unknown[]>(
    type: string | symbol | TypeObject | Mutation<S, P>,
    mutation?: Mutation<S, P>,
  ) => {
    if (mutation === undefined) {
      mutation = type as Mutation<S, P>
      type = `@@ActionReducer-${++typeId}`
    }

    type = (
      null != (type as TypeObject).type ? (type as TypeObject).type
        : prefix ? prefix + (type as string)
          : type
    ) as string

    const actionCreator = (...payload: P) => ({ type, payload }) as Action<P, string>

    actionCreator.type = type
    mutations[type] = mutation as Mutation<S, unknown[]>

    return actionCreator
  }

  const reducer = (state = initState!, action: AnyAction) => {
    const mutation = mutations[action.type]

    return mutation ? mutation(state, ...action.payload) : state
  }

  return { createAction, reducer }
}

export default ActionReducer
