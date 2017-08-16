// @ts-check

import ActionReducer, { OptionalActionCreator, Action } from '../src/'

const initState = { flag: false }
const { createAction, reducer } = ActionReducer(initState)

export default reducer

export const enptyActionCreator = createAction(
  (state) =>
    ({ ...state, flag: !state.flag })
)

// TypeScript v2.4.1 or higher & strictNullChecks option
export const payloadActionCreator = createAction(
  /** @param { boolean } payload */
  (state, payload) =>
    ({ ...state, flag: payload })
)

/** @type {OptionalActionCreator<boolean>} */
export const optionalActionCreator = createAction(
  /** @param { boolean } payload */
  (state, payload) =>
    ({ ...state, flag: payload })
)

// action object test
/** @type {Action<undefined>} */ const enptyAction = enptyActionCreator()
/** @type {Action<boolean>} */ const payloadAction = payloadActionCreator(true)

/** @typedef {boolean | undefined} OpticalBoolean */
/** @type {Action<OpticalBoolean>} */ const optionalAction1 = optionalActionCreator()
/** @type {Action<OpticalBoolean>} */ const optionalAction2 = optionalActionCreator(true)

enptyAction; payloadAction; optionalAction1; optionalAction2;
