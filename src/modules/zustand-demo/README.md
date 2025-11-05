# Zustand State Management Setup Guide

## 1. Installation

```bash
bun add zustand
```

## 2. Setup Steps

### 2.1 Create Store

- Define state interface with state fields and action methods
- Use `create<StateInterface>()((set, get) => ({...}))` to create store
- Define state values and action functions using `set` to update state
- Export the store hook (e.g., `useAuthStore`)

### 2.2 Add Persistence (Optional)

- Wrap store with `persist()` middleware
- Configure storage name and which fields to persist with `partialize`

### 2.3 Use in Components

- Import the store hook
- Use selectors to extract specific state values
- Call action methods directly from the store
- No Provider needed - use anywhere in the app

### 2.4 Multiple Stores (Optional)

- Create separate stores for different domains (auth, UI, etc.)
- Each store is independent and can be used together

## 3. Key Concepts

- **create**: Creates a store with state and actions
- **Selectors**: Extract specific values to prevent unnecessary re-renders
- **Actions**: Functions that update state using `set` function
- **Middleware**: Enhance stores with features like persistence
- **No Provider**: Use stores directly without wrapping components
- **Shallow Equality**: Only re-renders when selected values change
- **Multiple Stores**: Create separate stores for different concerns
