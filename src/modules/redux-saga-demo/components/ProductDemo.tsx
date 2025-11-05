/**
 * Redux Saga Product Demo Component
 * Demonstrates usage of Redux Saga for async operations
 */

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { SagaRootState } from '../store/store'
import {
  fetchProductsRequest,
  createProductRequest,
  deleteProductRequest,
} from '../store/productSlice'

export function ProductDemo() {
  const dispatch = useDispatch()
  const { products, loading, error } = useSelector(
    (state: SagaRootState) => state.products
  )

  useEffect(() => {
    // Fetch products on mount
    dispatch(fetchProductsRequest())
  }, [dispatch])

  const handleAddProduct = () => {
    const newProduct = {
      name: `Product ${products.length + 1}`,
      price: Math.floor(Math.random() * 100) + 10,
      category: 'Electronics',
      inStock: true,
    }
    dispatch(createProductRequest(newProduct))
  }

  const handleDeleteProduct = (id: string) => {
    dispatch(deleteProductRequest(id))
  }

  const handleRefresh = () => {
    dispatch(fetchProductsRequest())
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Redux Saga Product Demo</h1>

      {/* Actions Bar */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={handleRefresh}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 transition"
        >
          {loading ? 'Loading...' : 'Refresh Products'}
        </button>
        <button
          onClick={handleAddProduct}
          disabled={loading}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-300 transition"
        >
          Add Random Product
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700">Error: {error}</p>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <p className="mt-2 text-gray-600">Loading products...</p>
        </div>
      )}

      {/* Products List */}
      {!loading && (
        <div className="space-y-3">
          <h2 className="text-xl font-semibold mb-3">
            Products ({products.length})
          </h2>
          {products.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No products yet. Add one to get started!
            </div>
          ) : (
            products.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between p-4 bg-white border rounded-lg hover:shadow-md transition"
              >
                <div>
                  <h3 className="font-semibold">{product.name}</h3>
                  <div className="text-sm text-gray-600">
                    <span className="mr-3">Price: ${product.price}</span>
                    <span className="mr-3">Category: {product.category}</span>
                    <span
                      className={
                        product.inStock ? 'text-green-600' : 'text-red-600'
                      }
                    >
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  disabled={loading}
                  className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded transition disabled:opacity-50"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {/* Info Section */}
      <div className="mt-6 p-4 bg-gray-50 border rounded-lg">
        <h3 className="font-semibold mb-2">How Saga works:</h3>
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
          <li>Actions trigger saga watchers (takeLatest)</li>
          <li>Saga workers handle async API calls</li>
          <li>Success/failure actions update the state</li>
          <li>Generator functions enable complex flows</li>
          <li>Side effects are isolated from components</li>
        </ul>
      </div>
    </div>
  )
}
