import * as assert from 'power-assert'
import ActionReducer from '../src/'

interface State {
  flag: boolean
}

const initState: State = {
  flag: false,
}

describe('createAction', () => {
  it('check actionCreator.type === action.type', () => {
    const { createAction } = ActionReducer(initState)
    const actionCreator = createAction((state) => state)
    const action = actionCreator()

    assert.equal(actionCreator.type, action.type)
  })

  it('check actionType is unique', () => {
    const { createAction } = ActionReducer(initState)
    const actionCreator = createAction((state) => state)
    const otherActionCreator = createAction((state) => state)

    assert.notEqual(actionCreator.type, otherActionCreator.type)
  })

  it('check actionType prefix', () => {
    const PREFIX = 'test-prefix/'

    const { createAction } = ActionReducer(initState, PREFIX)
    const actionCreator = createAction((state) => state)
    const action = actionCreator()

    assert.equal((action.type as string).indexOf(PREFIX), 0)
    assert.notEqual(action.type, PREFIX)

    assert.equal(actionCreator.type, action.type)
  })

  it('check set actionType', () => {
    const ACTION_TYPE = 'test-action-type'

    const { createAction } = ActionReducer(initState)
    const actionCreator = createAction(ACTION_TYPE, (state) => state)
    const action = actionCreator()

    assert.equal(actionCreator.type, ACTION_TYPE)
    assert.equal(action.type, ACTION_TYPE)
  })

  it('check set actionType symbol', () => {
    const ACTION_TYPE = Symbol('test-action-type')

    const { createAction } = ActionReducer(initState)
    const actionCreator = createAction(ACTION_TYPE, (state) => state)
    const action = actionCreator()

    assert.equal(actionCreator.type, ACTION_TYPE)
    assert.equal(action.type, ACTION_TYPE)
  })

  it('check set prefix and actionType', () => {
    const PREFIX = 'test-prefix/'
    const ACTION_TYPE = 'test-action-type'

    const { createAction } = ActionReducer(initState, PREFIX)
    const actionCreator = createAction(ACTION_TYPE, (state) => state)
    const action = actionCreator()

    assert.equal(actionCreator.type, PREFIX + ACTION_TYPE)
    assert.equal(action.type, PREFIX + ACTION_TYPE)
  })

  it('check ActionCreator create Action', () => {
    const CASES = {
      case1: [],
      case2: ['test-arg'],
      case3: ['test-arg1', 'test-arg2'],
    } as const

    const { createAction } = ActionReducer(initState)
    const actionCreator = createAction((state, ..._args: string[]) => state)

    for (const [message, args] of Object.entries(CASES)) {
      const action = actionCreator(...args)

      assert.deepEqual(action.payload, args, message)
    }
  })
})

describe('reducer (+ createAction)', () => {
  it('check initState', () => {
    const { reducer } = ActionReducer(initState)
    const action = { type: 'unknown-action' }
    const state = reducer(undefined, action)

    assert.deepEqual(state, initState)
  })

  it('check unregistered action-type `toString`', () => {
    const { reducer } = ActionReducer(initState)
    const action = { type: 'toString' }
    const state = reducer(undefined, action)

    assert.deepEqual(state, initState)
  })

  it('check reducers newState', () => {
    const initState = Symbol('initState') as symbol
    const resultState = Symbol('result')

    const { reducer, createAction } = ActionReducer(initState)

    const action = createAction(() => resultState)
    const state = reducer(initState, action())

    assert.equal(state, resultState)
  })

  it('check reducers payload', () => {
    const CASES = {
      case1: [],
      case2: ['test-arg'],
      case3: ['test-arg1', 'test-arg2'],
    } as const

    const { reducer, createAction } = ActionReducer(['initState'])

    const action = createAction((_state, ...payload: string[]) => payload)

    for (const [message, payload] of Object.entries(CASES)) {
      const state = reducer(['initState'], action(...payload))

      assert.deepEqual(state, payload, message)
    }
  })
})
