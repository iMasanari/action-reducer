import * as assert from 'power-assert'
import ActionReducer, { OptionalActionCreator } from '../src/'

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
    const PREFIX = 'test-prefix'

    const { createAction } = ActionReducer(initState, PREFIX)
    const actionCreator = createAction((state) => state)
    const action = actionCreator()

    assert.equal((action.type as string).indexOf(PREFIX), 0)
    assert.notEqual(action.type, PREFIX)

    assert.equal(actionCreator.type, action.type)
  })

  it('check set actionType', () => {
    const TYPE = 'test-action-type'

    const { createAction } = ActionReducer(initState)
    const actionCreator = createAction((state) => state, TYPE)
    const action = actionCreator()

    assert.equal(actionCreator.type, TYPE)
    assert.equal(action.type, TYPE)
  })

  it('check set actionType symbol', () => {
    const TYPE = Symbol('test-action-type')

    const { createAction } = ActionReducer(initState)
    const actionCreator = createAction((state) => state, TYPE)
    const action = actionCreator()

    assert.equal(actionCreator.type, TYPE)
    assert.equal(action.type, TYPE)
  })

  it('check ActionCreator create Action', () => {
    const PAYLOAD = 'test-payload'

    const { createAction } = ActionReducer(initState)
    const actionCreator = createAction<typeof PAYLOAD>((state) => state)
    const action = actionCreator(PAYLOAD)

    assert.deepEqual(action, { type: actionCreator.type, payload: PAYLOAD })
  })

  it('check append reducers', () => {
    const REDUCER = (state: State) => state

    const { createAction, ['_reducers' as any]: _reducers } = ActionReducer(initState)
    const actionCreator = createAction(REDUCER)

    assert.equal(_reducers[actionCreator.type], REDUCER)
  })
})

describe('reducer (+ createAction)', () => {
  it('check initState', () => {
    const { reducer } = ActionReducer(initState)
    const action = { type: 'unknown-action' }
    const state = reducer(undefined, action)

    assert.deepEqual(state, initState)
  })

  it('check reducers called (enpty payload action)', () => {
    const { reducer, createAction } = ActionReducer(initState)
    const toggleFlag = createAction((state) => {
      return {
        ...state,
        flag: !state.flag
      }
    })

    for (const FLAG of [true, false]) {
      const store = { ...initState, flag: FLAG }
      const state = reducer(store, toggleFlag())

      assert.equal(state.flag, !FLAG)
    }
  })

  it('check reducers called (payload action)', () => {
    const { reducer, createAction } = ActionReducer(initState)
    const setFlag = createAction((state, payload: boolean) =>
      ({ ...state, flag: payload })
    )

    for (const storeFlag of [true, false]) {
      const store = { ...initState, flag: storeFlag }

      for (const FLAG of [true, false]) {
        const state = reducer(store, setFlag(FLAG))

        assert.equal(state.flag, FLAG)
      }
    }
  })

  it('check reducers called (optional payload action)', () => {
    const DEFAULT_FLAG = true

    const { reducer, createAction } = ActionReducer(initState)

    const optionalAction: OptionalActionCreator<boolean> = createAction(
      (state, payload: boolean = DEFAULT_FLAG) =>
        ({ ...state, flag: payload })
    )

    for (const storeFlag of [true, false]) {
      const store = { ...initState, flag: storeFlag }
      const enptyCase = reducer(store, optionalAction())

      assert.equal(enptyCase.flag, DEFAULT_FLAG)

      for (const FLAG of [true, false]) {
        const payloadCase = reducer(store, optionalAction(FLAG))

        assert.equal(payloadCase.flag, FLAG)
      }
    }
  })
})
