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

// setFlag is `(payload: boolean) => Action<boolean>`
export const setFlag = createAction<boolean>(
  'SET_FLAG',         // action type (Optional arg)
  (state, payload) => // Reducer for this action
    ({ ...state, flag: payload })
)

// reducer can be used as Redux Reducer!!
export default reducer

setFlag.type // 'SET_FLAG'
setFlag(true) // { type: 'SET_FLAG', payload: true }
reducer({ flag: false }, setFlag(true)) // { flag: true }
```


### TypeScript v2.4.1 or higher & strictNullChecks option

You can write type parameters in more intuitive places.  
`createAction<boolean>` -> `(state, payload: boolean)`

```ts
// TypeScript
export const setFlag = createAction(
  (state, payload: boolean) =>
    ({ ...state, flag: payload })
)
```


## API

**`ActionReducer<S>(initState, prefix?): { createAction, reducer }`**

- `initState: S`: Redux initial State.
- `prefix?: string`: Prefix for action type.

**`ActionReducer<S>().createAction<P>(reducer): AcitonCreator<P>`**  
**`ActionReducer<S>().createAction<P>(type, reducer): AcitonCreator<P>`**

- `type: string | symbol`: Action type.
- `reducer: (state: S, payload: P) => S`: Reducer for this action.
