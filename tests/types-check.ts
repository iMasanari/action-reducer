import ActionReducer, { Action } from '../src/'

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

const payloadActionCreator2 = createAction<[boolean]>(
  (state, payload) =>
    ({ ...state, flag: payload })
)

const optionalActionCreator = createAction(
  (state, payload: boolean = true) =>
    ({ ...state, flag: payload })
)

// action object test
const enptyAction: Action<[], string> = enptyActionCreator()
const payloadAction: Action<[boolean], string> = payloadActionCreator(true)
const payloadAction2: Action<[boolean], string> = payloadActionCreator2(true)

const optionalAction1: Action<[boolean?], string> = optionalActionCreator()
const optionalAction2: Action<[boolean?], string> = optionalActionCreator(true)

enptyAction; payloadAction; payloadAction2; optionalAction1; optionalAction2;
