# Redux Saga State Management Setup Guide

## 1. Installation

```bash
bun add @reduxjs/toolkit react-redux redux-saga
```

## 2. Setup Steps

### 2.1 Create Slice with Action Pairs

- Define state with loading and error fields
- Create Request/Success/Failure action reducers for each async operation
- Export all actions and reducer

### 2.2 Create Saga Worker and Watcher

- Define API call functions
- Create worker saga with `function*` to handle async logic
- Use `call` for API calls, `put` to dispatch actions
- Create watcher saga with `takeLatest` or `takeEvery`

### 2.3 Create Root Saga

- Import all feature sagas
- Combine using `all([...sagas])`
- Export root saga

### 2.4 Configure Store with Saga Middleware

- Create saga middleware with `createSagaMiddleware()`
- Add to store configuration, disable thunk
- Run root saga with `sagaMiddleware.run(rootSaga)`

### 2.5 Wrap App with Provider

- Import `Provider` from react-redux
- Wrap app with `<Provider store={store}>`

### 2.6 Use in Components

- Dispatch request actions to trigger sagas
- Sagas handle async logic and dispatch success/failure
- Components read state updates via selectors

## 3. Key Concepts

- **Saga**: Generator function that handles side effects
- **Effects**: Functions like `call`, `put`, `takeLatest` for async operations
- **Watcher**: Listens for specific actions to trigger workers
- **Worker**: Performs async operations and dispatches results
- **Action Pairs**: Request/Success/Failure pattern for async operations
- **Generator Functions**: Enable complex async flows with `function*` and `yield`
