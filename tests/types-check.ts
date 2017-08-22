import ActionReducer, { OptionalActionCreator, Action } from '../src/'

const initState = { flag: false }
const { createAction } = ActionReducer(initState)

const enptyActionCreator = createAction(
  (state) =>
    ({ ...state, flag: !state.flag })
)

const payloadActionCreator = createAction<boolean>(
  (state, payload) =>
    ({ ...state, flag: payload })
)

// TypeScript v2.4.1 or higher & strictNullChecks option
const payloadActionCreator2 = createAction(
  (state, payload: boolean) =>
    ({ ...state, flag: payload })
)

const optionalActionCreator: OptionalActionCreator<boolean> = createAction(
  (state, payload: boolean = true) =>
    ({ ...state, flag: payload })
)

// action object test
const enptyAction: Action<undefined> = enptyActionCreator()
const payloadAction: Action<boolean> = payloadActionCreator(true)
const payloadAction2: Action<boolean> = payloadActionCreator2(true)

const optionalAction1: Action<boolean | undefined> = optionalActionCreator()
const optionalAction2: Action<boolean | undefined> = optionalActionCreator(true)

enptyAction; payloadAction; payloadAction2; optionalAction1; optionalAction2;
