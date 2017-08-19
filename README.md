# ActionReducer

A simple ActionCreator and Reducer library that provides type-safe for TypeScript.


## Installation

```
npm install --save action-reducer
```


## Usage

### Basic (TypeScript)
```ts
import ActionReducer from 'action-reducer'

const initState = { flag: false }
const { createAction, reducer } = ActionReducer(initState)

// If strictNullChecks option is enabled and TypeScript 2.4.1 or later,
// just specify the type in the payload.
// There is no need for non-intuitive `createAction<boolean>(...)`!
export const setFlag = createAction(
  'SET_FLAG',                  // action type (Optional arg)
  (state, payload: boolean) => // Reducer for this action
    ({ ...state, flag: payload })
)

// reducer can be used as Redux Reducer!!
export default reducer

setFlag.type // 'SET_FLAG'
setFlag(true) // { type: 'SET_FLAG', payload: true }
reducer({ flag: false }, setFlag(true)) // { flag: true }
```


## API

### `ActionReducer<S>(initState, prefix?): { createAction, reducer }`

- `initState: S`: Redux initial State. (Optional arg)
- `prefix?: string`: Prefix for action type.

### `ActionReducer<S>(...).createAction<P>(type?, reducer): AcitonCreator<P>`

- `type?: string | symbol`: Action type. (Optional arg)
- `reducer: (state: S, payload: P) => S`: Reducer for this action.
