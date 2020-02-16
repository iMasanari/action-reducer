import { assert, test, _ } from 'spec.ts'
import ActionReducer from '../src/'

interface State { flag: boolean }

const initState: State = { flag: false }
const { createAction } = ActionReducer(initState)
const { createAction: createActionWithPrefix } = ActionReducer(initState, 'prefix/')

// Action type (string)
test(() => {
  const case1 = createAction((state) =>
    ({ ...state, flag: !state.flag })
  )

  const case2 = createActionWithPrefix((state) =>
    ({ ...state, flag: !state.flag })
  )

  const case3 = createActionWithPrefix('test', (state) =>
    ({ ...state, flag: !state.flag })
  )

  interface Result {
    (): { type: string, payload: [] }
    type: string
  }

  assert(case1, _ as Result)
  assert(case2, _ as Result)
  assert(case3, _ as Result)
})

// Action type (string literal)
test(() => {
  const case1 = createAction('test', (state) =>
    ({ ...state, flag: !state.flag })
  )

  interface Result {
    (): { type: 'test', payload: [] }
    type: 'test'
  }

  assert(case1, _ as Result)
})

// Action type (symbol)
test(() => {
  const case1 = createAction(Symbol('test'), (state) =>
    ({ ...state, flag: !state.flag })
  )

  interface Result {
    (): { type: symbol, payload: [] }
    type: symbol
  }

  assert(case1, _ as Result)
})

// 引数なし
test(() => {
  const case1 = createAction((state) =>
    ({ ...state, flag: !state.flag })
  )

  interface Result {
    (): { type: string, payload: [] }
    type: string
  }

  assert(case1, _ as Result)
})

// 引数1つ
test(() => {
  const case1 = createAction((state, arg1: boolean) =>
    ({ ...state, flag: arg1 })
  )

  const case2 = createAction<[boolean]>((state) =>
    ({ ...state, flag: true })
  )

  interface Result {
    (arg1: boolean): { type: string, payload: [boolean] }
    type: string
  }

  assert(case1, _ as Result)
  assert(case2, _ as Result)
})

// 引数2つ以上
test(() => {
  const case1 = createAction((state, arg1: string, arg2: number) =>
    ({ ...state, flag: arg1 === arg2.toString() })
  )

  const case2 = createAction<[string, number]>((state) =>
    ({ ...state, flag: true })
  )

  interface Result {
    (arg1: string, arg2: number): { type: string, payload: [string, number] }
    type: string
  }

  assert(case1, _ as Result)
  assert(case2, _ as Result)
})

// 仮引数・省略
test(() => {
  const case1 = createAction((state, arg1: boolean = true) =>
    ({ ...state, flag: arg1 })
  )

  const case2 = createAction((state, arg1?: boolean) =>
    ({ ...state, flag: arg1 || false })
  )

  const case3 = createAction<[boolean?]>((state) =>
    ({ ...state, flag: true })
  )

  interface Result {
    (payload?: boolean): { type: string, payload: [boolean?] }
    type: string
  }

  assert(case1, _ as Result)
  assert(case2, _ as Result)
  assert(case3, _ as Result)
})

// 可変長引数
test(() => {
  const case1 = createAction((state, arg1: number, ...args: string[]) =>
    ({ ...state, flag: arg1 === args.length })
  )

  const case2 = createAction<[number, ...string[]]>((state) =>
    ({ ...state, flag: true })
  )

  interface Result {
    (arg1: number, ...args: string[]): { type: string, payload: [number, ...string[]] }
    type: string
  }

  assert(case1, _ as Result)
  assert(case2, _ as Result)
})
