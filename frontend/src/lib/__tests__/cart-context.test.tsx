import { renderHook, act, waitFor } from '@testing-library/react'
import { CartProvider, useCart } from '../cart-context'

describe('CartContext', () => {
  const mockLocalStorage = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage,
      writable: true,
    })
  })

  it('should initialize with empty cart', () => {
    mockLocalStorage.getItem.mockReturnValue(null)

    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    })

    expect(result.current.items).toEqual([])
    expect(result.current.totalItems).toBe(0)
    expect(result.current.totalPrice).toBe(0)
  })

  it('should load cart from localStorage on mount', async () => {
    const storedCart = [
      { id: 1, name: 'Product 1', price: 100, quantity: 2 },
    ]
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify(storedCart))

    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    })

    await waitFor(() => {
      expect(result.current.items).toEqual(storedCart)
      expect(result.current.totalItems).toBe(2)
      expect(result.current.totalPrice).toBe(200)
    })
  })

  it('should add new item to cart', () => {
    mockLocalStorage.getItem.mockReturnValue(null)

    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    })

    const product = { id: 1, name: 'Product 1', price: 100 }

    act(() => {
      result.current.addItem(product)
    })

    expect(result.current.items).toHaveLength(1)
    expect(result.current.items[0]).toEqual({ ...product, quantity: 1 })
    expect(result.current.totalItems).toBe(1)
    expect(result.current.totalPrice).toBe(100)
  })

  it('should increment quantity when adding existing item', () => {
    mockLocalStorage.getItem.mockReturnValue(null)

    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    })

    const product = { id: 1, name: 'Product 1', price: 100 }

    act(() => {
      result.current.addItem(product)
      result.current.addItem(product)
    })

    expect(result.current.items).toHaveLength(1)
    expect(result.current.items[0].quantity).toBe(2)
    expect(result.current.totalItems).toBe(2)
    expect(result.current.totalPrice).toBe(200)
  })

  it('should remove item from cart', () => {
    mockLocalStorage.getItem.mockReturnValue(null)

    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    })

    const product = { id: 1, name: 'Product 1', price: 100 }

    act(() => {
      result.current.addItem(product)
    })

    expect(result.current.items).toHaveLength(1)

    act(() => {
      result.current.removeItem(1)
    })

    expect(result.current.items).toHaveLength(0)
    expect(result.current.totalItems).toBe(0)
    expect(result.current.totalPrice).toBe(0)
  })

  it('should clear cart', () => {
    mockLocalStorage.getItem.mockReturnValue(null)

    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    })

    act(() => {
      result.current.addItem({ id: 1, name: 'Product 1', price: 100 })
      result.current.addItem({ id: 2, name: 'Product 2', price: 200 })
    })

    expect(result.current.items).toHaveLength(2)

    act(() => {
      result.current.clearCart()
    })

    expect(result.current.items).toHaveLength(0)
    expect(result.current.totalItems).toBe(0)
    expect(result.current.totalPrice).toBe(0)
  })

  it('should calculate total price correctly', () => {
    mockLocalStorage.getItem.mockReturnValue(null)

    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    })

    act(() => {
      result.current.addItem({ id: 1, name: 'Product 1', price: 100 })
      result.current.addItem({ id: 1, name: 'Product 1', price: 100 })
      result.current.addItem({ id: 2, name: 'Product 2', price: 50 })
    })

    expect(result.current.totalItems).toBe(3)
    expect(result.current.totalPrice).toBe(250) // (100 * 2) + (50 * 1)
  })

  it('should save cart to localStorage when items change', async () => {
    mockLocalStorage.getItem.mockReturnValue(null)

    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    })

    act(() => {
      result.current.addItem({ id: 1, name: 'Product 1', price: 100 })
    })

    await waitFor(() => {
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        'cart',
        expect.stringContaining('Product 1')
      )
    })
  })

  it('should throw error when useCart is used outside CartProvider', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation()

    expect(() => {
      renderHook(() => useCart())
    }).toThrow('useCart must be used within a CartProvider')

    consoleSpy.mockRestore()
  })
})

