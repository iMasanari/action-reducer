# ActionReducer

A simple ActionCreator and Reducer library that provides type-safe for TypeScript.  
Used for React (`useReducer`), Redux, etc.


## Installation

```
npm install action-reducer
```


## Usage

### Basic

```js
import ActionReducer from 'action-reducer'
// OR
// const ActionReducer = require('action-reducer').default

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
  (state, arg1, /* arg2, arg3... */) =>
    ({ ...state, flag: arg1 })
)

setFlag.type  // 'SET_FLAG'
setFlag(true) // { type: 'SET_FLAG', payload: true }
reducer(initState, setFlag(true)) // { flag: true }
```

### TypeScript

```ts
// just specify the type in the argument
export const setFlag = createAction(
  'SET_FLAG',
  (state, arg1: boolean) =>
    ({ ...state, flag: arg1 })
)
```

### Connect Redux

You can use it the same way as before.

```js
// components/some-component.js
import { setFlag, toggleFlag } from '../modules/flag'

dispatch(setFlag(true))
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

### `ActionReducer<State>(initState, prefix?)`

- initState (`State`): Redux initial State.
- prefix? (`string`): Prefix for action type. (Optional arg)
- return (`{ createAction: CreateAction, reducer: Reducer }`): CreateAction and Reducer.

### `CreateAction<Payload>(type?, mutation)`

- type? (`string | symbol`): Action type. (Optional arg)
- mutation (`(state: State, ...args: Payload) => State`): Mutation for this action.
- return (`AcitonCreator`): Action creator function.

### `AcitonCreator(...args: Payload)`

- ...args (`Payload`): Action args.
- return (`{ type: string | symbol, payload: Payload }`): Action object.

### `Reducer(state: State | undefined, action: any)`

- state (`State`): Current state.
- action (`any`): Action object.
- return (`State`): New state.
