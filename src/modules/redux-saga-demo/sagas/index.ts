/**
 * Root Saga
 *
 * Combines all sagas in the application.
 */

import { all } from 'redux-saga/effects'
import { productSaga } from './productSaga'

export function* rootSaga() {
  yield all([productSaga()])
}
