/**
 * Redux Toolkit Demo Page with Provider
 * This wraps the UserDemo with its Redux Provider
 */

import { Provider } from 'react-redux'
import { store } from '../store/store'
import { UserDemo } from './UserDemo'

export function ReduxDemoPage() {
  return (
    <Provider store={store}>
      <UserDemo />
    </Provider>
  )
}
