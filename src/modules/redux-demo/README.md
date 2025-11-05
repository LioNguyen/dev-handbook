# Redux Toolkit State Management Setup Guide

## 1. Installation

```bash
bun add @reduxjs/toolkit react-redux
```

## 2. Setup Steps

### 2.1 Create Slice

- Define state interface and initial state
- Use `createSlice` with name, initialState, and reducers
- Export actions and reducer

### 2.2 Configure Store

- Import all reducers
- Use `configureStore` to combine reducers
- Export `RootState` and `AppDispatch` types

### 2.3 Create Typed Hooks

- Create typed `useAppDispatch` hook
- Create typed `useAppSelector` hook
- Export for use in components

### 2.4 Wrap App with Provider

- Import `Provider` from react-redux
- Wrap app with `<Provider store={store}>`

### 2.5 Use in Components

- Import typed hooks and actions
- Use `useAppSelector` to read state
- Use `useAppDispatch` to dispatch actions

## 3. Key Concepts

- **Slice**: Combines reducer logic and actions for a feature
- **Store**: Single source of truth for application state
- **Reducer**: Pure function handling state updates (uses Immer for immutability)
- **Actions**: Automatically generated from slice reducers
- **Selectors**: Functions to extract specific state values
- **Typed Hooks**: Type-safe dispatch and selector hooks
