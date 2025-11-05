/**
 * Redux Saga Demo Page with Provider
 * This wraps the ProductDemo with its Redux Provider and Saga middleware
 */

import { Provider } from 'react-redux'
import { sagaStore } from '../store/store'
import { ProductDemo } from './ProductDemo'

export function ReduxSagaDemoPage() {
  return (
    <Provider store={sagaStore}>
      <ProductDemo />
    </Provider>
  )
}
