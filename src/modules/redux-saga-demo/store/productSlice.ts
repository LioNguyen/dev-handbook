/**
 * Redux Saga Store - Product Slice
 * 
 * This demonstrates Redux Toolkit with Redux Saga for side effects.
 * Redux Saga uses generator functions to handle complex async workflows.
 */

import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface Product {
  id: string
  name: string
  price: number
  category: string
  inStock: boolean
}

interface ProductState {
  products: Product[]
  loading: boolean
  error: string | null
  selectedProduct: Product | null
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
  selectedProduct: null,
}

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // Action creators for saga triggers
    fetchProductsRequest: (state) => {
      state.loading = true
      state.error = null
    },
    fetchProductsSuccess: (state, action: PayloadAction<Product[]>) => {
      state.loading = false
      state.products = action.payload
      state.error = null
    },
    fetchProductsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },

    fetchProductByIdRequest: (state, _action: PayloadAction<string>) => {
      state.loading = true
      state.error = null
    },
    fetchProductByIdSuccess: (state, action: PayloadAction<Product>) => {
      state.loading = false
      state.selectedProduct = action.payload
      state.error = null
    },
    fetchProductByIdFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },

    createProductRequest: (
      state,
      _action: PayloadAction<Omit<Product, 'id'>>
    ) => {
      state.loading = true
      state.error = null
    },
    createProductSuccess: (state, action: PayloadAction<Product>) => {
      state.loading = false
      state.products.push(action.payload)
      state.error = null
    },
    createProductFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },

    updateProductRequest: (state, _action: PayloadAction<Product>) => {
      state.loading = true
      state.error = null
    },
    updateProductSuccess: (state, action: PayloadAction<Product>) => {
      state.loading = false
      const index = state.products.findIndex((p) => p.id === action.payload.id)
      if (index !== -1) {
        state.products[index] = action.payload
      }
      if (state.selectedProduct?.id === action.payload.id) {
        state.selectedProduct = action.payload
      }
      state.error = null
    },
    updateProductFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },

    deleteProductRequest: (state, _action: PayloadAction<string>) => {
      state.loading = true
      state.error = null
    },
    deleteProductSuccess: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.products = state.products.filter((p) => p.id !== action.payload)
      if (state.selectedProduct?.id === action.payload) {
        state.selectedProduct = null
      }
      state.error = null
    },
    deleteProductFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },

    clearError: (state) => {
      state.error = null
    },
  },
})

export const {
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
  clearError,
} = productSlice.actions

export default productSlice.reducer
