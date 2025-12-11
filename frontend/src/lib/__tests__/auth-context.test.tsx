import { renderHook, act, waitFor } from '@testing-library/react'
import { AuthProvider, useAuth } from '../auth-context'
import { useRouter } from 'next/navigation'

jest.mock('next/navigation')

describe('AuthContext', () => {
  const mockPush = jest.fn()
  const mockLocalStorage = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useRouter as jest.Mock).mockReturnValue({ push: mockPush })
    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage,
      writable: true,
    })
  })

  it('should initialize with no user', () => {
    mockLocalStorage.getItem.mockReturnValue(null)

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    })

    expect(result.current.user).toBeNull()
    expect(result.current.token).toBeNull()
    expect(result.current.isAuthenticated).toBe(false)
  })

  it('should load user from localStorage on mount', async () => {
    mockLocalStorage.getItem.mockImplementation((key: string) => {
      if (key === 'token') return 'test-token'
      if (key === 'email') return 'test@example.com'
      return null
    })

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    })

    await waitFor(() => {
      expect(result.current.token).toBe('test-token')
      expect(result.current.user?.email).toBe('test@example.com')
      expect(result.current.isAuthenticated).toBe(true)
    })
  })

  it('should login user and save to localStorage', () => {
    mockLocalStorage.getItem.mockReturnValue(null)

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    })

    act(() => {
      result.current.login('new-token', 'user@example.com')
    })

    expect(result.current.token).toBe('new-token')
    expect(result.current.user?.email).toBe('user@example.com')
    expect(result.current.isAuthenticated).toBe(true)
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('token', 'new-token')
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('email', 'user@example.com')
    expect(mockPush).toHaveBeenCalledWith('/')
  })

  it('should logout user and clear localStorage', () => {
    mockLocalStorage.getItem.mockImplementation((key: string) => {
      if (key === 'token') return 'test-token'
      if (key === 'email') return 'test@example.com'
      return null
    })

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    })

    act(() => {
      result.current.logout()
    })

    expect(result.current.token).toBeNull()
    expect(result.current.user).toBeNull()
    expect(result.current.isAuthenticated).toBe(false)
    expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('token')
    expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('email')
    expect(mockPush).toHaveBeenCalledWith('/login')
  })

  it('should throw error when useAuth is used outside AuthProvider', () => {
    // Suppress console.error for this test
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation()

    expect(() => {
      renderHook(() => useAuth())
    }).toThrow('useAuth must be used within an AuthProvider')

    consoleSpy.mockRestore()
  })
})

