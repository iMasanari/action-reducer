// @flow

import ActionReducer, { Action } from '../src/action-reducer.cjs.js.flow'

interface State { flag: boolean }

const initState: State = { flag: false }
const { createAction } = ActionReducer(initState)

const enptyActionCreator = createAction(
  (state) =>
    ({ ...state, flag: !state.flag })
)

const payloadActionCreator = createAction(
  (state, payload: boolean) =>
    ({ ...state, flag: payload })
)

// action object test
const enptyAction: Action<void> = enptyActionCreator()
const payloadAction: Action<boolean> = payloadActionCreator(true)

// TODO:
// const optionalAction1: Action<boolean | void> = optionalActionCreator()
// const optionalAction2: Action<boolean | void> = optionalActionCreator(true)
