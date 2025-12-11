import { api } from '../api'

global.fetch = jest.fn()

describe('API Utility', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('auth', () => {
    it('should register a user', async () => {
      const mockResponse = { token: 'test-token' }
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

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
        })
      )
      expect(result).toEqual(mockResponse)
    })

    it('should login a user', async () => {
      const mockResponse = { token: 'test-token' }
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

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
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockProducts,
      })

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
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockProduct,
      })

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
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockProducts,
      })

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
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockCategories,
      })

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
    it('should create an order with token', async () => {
      const mockOrder = { id: 1, total: 300, status: 'PENDING' }
      const token = 'test-token'
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockOrder,
      })

      const orderData = { items: [], total: 300 }
      const result = await api.orders.create(orderData, token)

      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:8080/api/orders',
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(orderData),
        })
      )
      expect(result).toEqual(mockOrder)
    })

    it('should get user orders with token', async () => {
      const mockOrders = [{ id: 1, total: 300, status: 'PENDING' }]
      const token = 'test-token'
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockOrders,
      })

      const result = await api.orders.getMyOrders(token)

      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:8080/api/orders',
        expect.objectContaining({
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
      )
      expect(result).toEqual(mockOrders)
    })
  })

  describe('error handling', () => {
    it('should throw error on failed request', async () => {
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404,
        json: async () => ({ message: 'Not found' }),
      })

      await expect(api.products.getById('999')).rejects.toThrow('Not found')
    })

    it('should handle empty error response', async () => {
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 500,
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
      })

      const result = await api.products.getAll()

      expect(result).toEqual({})
    })
  })
})

