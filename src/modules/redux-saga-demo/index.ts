/**
 * Redux Saga State Management Demo Module
 *
 * This module demonstrates Redux Saga for complex async workflows.
 *
 * @example
 * ```tsx
 * import { Provider } from 'react-redux'
 * import { sagaStore, fetchProductsRequest } from '@/modules/redux-saga-demo'
 *
 * // In App.tsx
 * <Provider store={sagaStore}>
 *   <App />
 * </Provider>
 *
 * // In component
 * function ProductList() {
 *   const dispatch = useDispatch()
 *   const products = useSelector(state => state.products)
 *
 *   useEffect(() => {
 *     dispatch(fetchProductsRequest())
 *   }, [])
 * }
 * ```
 */

export * from './store'
export * from './sagas'
export * from './components'
