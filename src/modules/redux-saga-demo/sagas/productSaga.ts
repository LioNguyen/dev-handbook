/**
 * Product Sagas
 *
 * This demonstrates Redux Saga for handling side effects.
 * Sagas use generator functions to manage complex async workflows.
 */

import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import type { PayloadAction } from '@reduxjs/toolkit'
import {
  fetchProductsRequest,
  fetchProductsSuccess,
  fetchProductsFailure,
  fetchProductByIdRequest,
  fetchProductByIdSuccess,
  fetchProductByIdFailure,
  createProductRequest,
  createProductSuccess,
  createProductFailure,
  updateProductRequest,
  updateProductSuccess,
  updateProductFailure,
  deleteProductRequest,
  deleteProductSuccess,
  deleteProductFailure,
  type Product,
} from '../store/productSlice'

// Mock API functions
const mockProductAPI = {
  fetchProducts: async (): Promise<Product[]> => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return [
      {
        id: '1',
        name: 'Laptop',
        price: 999,
        category: 'Electronics',
        inStock: true,
      },
      {
        id: '2',
        name: 'Phone',
        price: 699,
        category: 'Electronics',
        inStock: true,
      },
      {
        id: '3',
        name: 'Headphones',
        price: 199,
        category: 'Electronics',
        inStock: false,
      },
    ]
  },

  fetchProductById: async (id: string): Promise<Product> => {
    await new Promise((resolve) => setTimeout(resolve, 800))
    const products = await mockProductAPI.fetchProducts()
    const product = products.find((p) => p.id === id)
    if (!product) {
      throw new Error(`Product with id ${id} not found`)
    }
    return product
  },

  createProduct: async (product: Omit<Product, 'id'>): Promise<Product> => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return {
      ...product,
      id: Date.now().toString(),
    }
  },

  updateProduct: async (product: Product): Promise<Product> => {
    await new Promise((resolve) => setTimeout(resolve, 800))
    return product
  },

  deleteProduct: async (id: string): Promise<string> => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return id
  },
}

// Worker Sagas
function* fetchProductsSaga() {
  try {
    const products: Product[] = yield call(mockProductAPI.fetchProducts)

    console.log('🚀 @LIO ~  ~ productSaga.ts:92 ~ products:', products)

    console.log(
      '🚀 @LIO ~ src/modules/redux-saga-demo/sagas/productSaga.ts ~ 94 ~ fetchProductsSuccess ~ ',
      fetchProductsSuccess([])
    )

    yield put(fetchProductsSuccess(products))
  } catch (error) {
    yield put(
      fetchProductsFailure(
        error instanceof Error ? error.message : 'Failed to fetch products'
      )
    )
  }
}

function* fetchProductByIdSaga(action: PayloadAction<string>) {
  try {
    const product: Product = yield call(
      mockProductAPI.fetchProductById,
      action.payload
    )
    yield put(fetchProductByIdSuccess(product))
  } catch (error) {
    yield put(
      fetchProductByIdFailure(
        error instanceof Error ? error.message : 'Failed to fetch product'
      )
    )
  }
}

function* createProductSaga(action: PayloadAction<Omit<Product, 'id'>>) {
  try {
    const product: Product = yield call(
      mockProductAPI.createProduct,
      action.payload
    )
    yield put(createProductSuccess(product))
  } catch (error) {
    yield put(
      createProductFailure(
        error instanceof Error ? error.message : 'Failed to create product'
      )
    )
  }
}

function* updateProductSaga(action: PayloadAction<Product>) {
  try {
    const product: Product = yield call(
      mockProductAPI.updateProduct,
      action.payload
    )
    yield put(updateProductSuccess(product))
  } catch (error) {
    yield put(
      updateProductFailure(
        error instanceof Error ? error.message : 'Failed to update product'
      )
    )
  }
}

function* deleteProductSaga(action: PayloadAction<string>) {
  try {
    const id: string = yield call(mockProductAPI.deleteProduct, action.payload)
    yield put(deleteProductSuccess(id))
  } catch (error) {
    yield put(
      deleteProductFailure(
        error instanceof Error ? error.message : 'Failed to delete product'
      )
    )
  }
}

// Watcher Saga
export function* productSaga() {
  yield takeLatest(fetchProductsRequest.type, fetchProductsSaga)
  yield takeEvery(fetchProductByIdRequest.type, fetchProductByIdSaga)
  yield takeEvery(createProductRequest.type, createProductSaga)
  yield takeEvery(updateProductRequest.type, updateProductSaga)
  yield takeEvery(deleteProductRequest.type, deleteProductSaga)
}
