import { renderHook, act, waitFor } from '@testing-library/react'
import { AuthProvider, useAuth } from '../auth-context'
import { useRouter } from 'next/navigation'
import { api } from '../api'

jest.mock('../api', () => ({
  api: {
    auth: {
      me: jest.fn(),
      logout: jest.fn(),
    },
  },
}))

describe('AuthContext', () => {
  const mockPush = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useRouter as jest.Mock).mockReturnValue({ push: mockPush, replace: jest.fn(), prefetch: jest.fn(), back: jest.fn(), pathname: '/', query: {}, asPath: '/' })
    ;(api.auth.me as jest.Mock).mockRejectedValue(new Error('Unauthorized'))
  })

  it('should initialize with no user when /me fails', async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    })

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.user).toBeNull()
    expect(result.current.isAuthenticated).toBe(false)
  })

  it('should load user from /me on mount', async () => {
    ;(api.auth.me as jest.Mock).mockResolvedValueOnce({ email: 'test@example.com' })

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    })

    await waitFor(() => {
      expect(result.current.user?.email).toBe('test@example.com')
      expect(result.current.isAuthenticated).toBe(true)
    })
  })

  it('should login user with email', () => {
    ;(api.auth.me as jest.Mock).mockRejectedValue(new Error('Unauthorized'))

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    })

    act(() => {
      result.current.login('user@example.com')
    })

    expect(result.current.user?.email).toBe('user@example.com')
    expect(result.current.isAuthenticated).toBe(true)
    expect(mockPush).toHaveBeenCalledWith('/')
  })

  it('should logout user and call api', async () => {
    ;(api.auth.me as jest.Mock).mockResolvedValueOnce({ email: 'test@example.com' })
    ;(api.auth.logout as jest.Mock).mockResolvedValueOnce(undefined)

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    })

    await waitFor(() => {
      expect(result.current.isAuthenticated).toBe(true)
    })

    await act(async () => {
      await result.current.logout()
    })

    expect(result.current.user).toBeNull()
    expect(result.current.isAuthenticated).toBe(false)
    expect(api.auth.logout).toHaveBeenCalled()
    expect(mockPush).toHaveBeenCalledWith('/login')
  })

  it('should throw error when useAuth is used outside AuthProvider', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation()

    expect(() => {
      renderHook(() => useAuth())
    }).toThrow('useAuth must be used within an AuthProvider')

    consoleSpy.mockRestore()
  })
})
