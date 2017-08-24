# ActionReducer

A simple ActionCreator and Reducer library that provides type-safe for TypeScript.


## Installation

```
npm install --save action-reducer
```


## Usage

### Basic

```js
import ActionReducer from 'action-reducer'

const initState = { flag: false }
const { createAction, reducer } = ActionReducer(initState)

// reducer can be used as Redux Reducer!!
export default reducer

export const toggleFlag = createAction(
  'TOGGLE_FLAG', // action type (Optional arg)
  (state) =>     // Reducer for this action
    ({ ...state, flag: !state.flag })
)

export const setFlag = createAction(
  'SET_FLAG',
  (state, payload) =>
    ({ ...state, flag: payload })
)

setFlag.type // 'SET_FLAG'
setFlag(true) // { type: 'SET_FLAG', payload: true }
reducer({ flag: false }, setFlag(true)) // { flag: true }
```

### TypeScript

```ts
export const setFlag = createAction<boolean>(
  'SET_FLAG',
  (state, payload) =>
    ({ ...state, flag: payload })
)

// If strictNullChecks option is enabled and TypeScript 2.4.1 or later,
export const setFlag = createAction(
  'SET_FLAG',
  (state, payload: boolean) => // just specify the type in the payload
    ({ ...state, flag: payload })
)
```

### Connect Redux

You can use it the same way as before.

```js
// components/some-component.js
import { setFlag, toggleFlag } from '../modules/flag'

props.dispatch(setFlag(true))
```

```js
// modules/index.js
import { combineReducers } from 'redux'
import flag from './flag'

export default combineReducers({
  flag: flag,
})
```

## API

### `ActionReducer<S>(initState, prefix?): { createAction, reducer }`

- `initState: S`: Redux initial State.
- `prefix?: string`: Prefix for action type. (Optional arg)

### `ActionReducer<S>(...).createAction<P>(type?, reducer): AcitonCreator<P>`

- `type?: string | symbol`: Action type. (Optional arg)
- `reducer: (state: S, payload: P) => S`: Reducer for this action.
