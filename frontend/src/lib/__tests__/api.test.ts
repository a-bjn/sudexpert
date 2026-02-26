import { api } from '../api'

global.fetch = jest.fn()

function mockFetchResponse(data: unknown, ok = true) {
  return {
    ok,
    status: ok ? 200 : 404,
    headers: new Headers({ 'content-length': JSON.stringify(data).length.toString() }),
    json: async () => data,
    text: async () => JSON.stringify(data),
  }
}

describe('API Utility', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('auth', () => {
    it('should register a user', async () => {
      const mockResponse = { email: 'john@example.com' }
      ;(global.fetch as jest.Mock).mockResolvedValueOnce(mockFetchResponse(mockResponse))

      const data = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'password123',
      }

      const result = await api.auth.register(data)

      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:8080/api/auth/register',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
          credentials: 'include',
        })
      )
      expect(result).toEqual(mockResponse)
    })

    it('should login a user', async () => {
      const mockResponse = { email: 'john@example.com' }
      ;(global.fetch as jest.Mock).mockResolvedValueOnce(mockFetchResponse(mockResponse))

      const data = {
        email: 'john@example.com',
        password: 'password123',
      }

      const result = await api.auth.login(data)

      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:8080/api/auth/authenticate',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(data),
          credentials: 'include',
        })
      )
      expect(result).toEqual(mockResponse)
    })
  })

  describe('products', () => {
    it('should get all products', async () => {
      const mockProducts = [
        { id: 1, name: 'Product 1', price: 100 },
        { id: 2, name: 'Product 2', price: 200 },
      ]
      ;(global.fetch as jest.Mock).mockResolvedValueOnce(mockFetchResponse(mockProducts))

      const result = await api.products.getAll()

      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:8080/api/products',
        expect.objectContaining({
          method: 'GET',
        })
      )
      expect(result).toEqual(mockProducts)
    })

    it('should get product by id', async () => {
      const mockProduct = { id: 1, name: 'Product 1', price: 100 }
      ;(global.fetch as jest.Mock).mockResolvedValueOnce(mockFetchResponse(mockProduct))

      const result = await api.products.getById('1')

      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:8080/api/products/1',
        expect.objectContaining({
          method: 'GET',
        })
      )
      expect(result).toEqual(mockProduct)
    })

    it('should get products by category', async () => {
      const mockProducts = [{ id: 1, name: 'Product 1', price: 100 }]
      ;(global.fetch as jest.Mock).mockResolvedValueOnce(mockFetchResponse(mockProducts))

      const result = await api.products.getByCategory('1')

      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:8080/api/products/category/1',
        expect.objectContaining({
          method: 'GET',
        })
      )
      expect(result).toEqual(mockProducts)
    })
  })

  describe('categories', () => {
    it('should get all categories', async () => {
      const mockCategories = [
        { id: 1, name: 'Category 1' },
        { id: 2, name: 'Category 2' },
      ]
      ;(global.fetch as jest.Mock).mockResolvedValueOnce(mockFetchResponse(mockCategories))

      const result = await api.categories.getAll()

      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:8080/api/categories',
        expect.objectContaining({
          method: 'GET',
        })
      )
      expect(result).toEqual(mockCategories)
    })
  })

  describe('orders', () => {
    it('should create an order with credentials', async () => {
      const mockOrder = { id: 1, total: 300, status: 'PENDING' }
      ;(global.fetch as jest.Mock).mockResolvedValueOnce(mockFetchResponse(mockOrder))

      const orderData = { items: [], total: 300 }
      const result = await api.orders.create(orderData)

      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:8080/api/orders',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderData),
          credentials: 'include',
        })
      )
      expect(result).toEqual(mockOrder)
    })

    it('should get user orders with credentials', async () => {
      const mockOrders = [{ id: 1, total: 300, status: 'PENDING' }]
      ;(global.fetch as jest.Mock).mockResolvedValueOnce(mockFetchResponse(mockOrders))

      const result = await api.orders.getMyOrders()

      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:8080/api/orders',
        expect.objectContaining({
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        })
      )
      expect(result).toEqual(mockOrders)
    })
  })

  describe('error handling', () => {
    it('should throw error on failed request', async () => {
      ;(global.fetch as jest.Mock).mockResolvedValueOnce(
        mockFetchResponse({ message: 'Not found' }, false)
      )

      await expect(api.products.getById('999')).rejects.toThrow('Not found')
    })

    it('should handle empty error response', async () => {
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 500,
        headers: new Headers(),
        json: async () => {
          throw new Error('Invalid JSON')
        },
      })

      await expect(api.products.getAll()).rejects.toThrow(
        'Request failed with status 500'
      )
    })

    it('should handle 204 No Content', async () => {
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        status: 204,
        headers: new Headers({ 'content-length': '0' }),
        json: async () => ({}),
        text: async () => '',
      })

      const result = await api.products.getAll()

      expect(result).toEqual({})
    })
  })
})

