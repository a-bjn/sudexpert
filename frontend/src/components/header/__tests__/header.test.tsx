import { render, screen, fireEvent } from '@testing-library/react'
import Header from '../header'
import { CartProvider } from '@/lib/cart-context'
import { AuthProvider } from '@/lib/auth-context'

describe('Header', () => {
  it('should render logo and navigation links', () => {
    render(
      <CartProvider>
        <AuthProvider>
          <Header />
        </AuthProvider>
      </CartProvider>
    )

    expect(screen.getByText('SUDEXPERT')).toBeInTheDocument()
    expect(screen.getByText('Acasă')).toBeInTheDocument()
    expect(screen.getByText('Magazin')).toBeInTheDocument()
    expect(screen.getByText('Despre')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })

  it('should display cart icon', () => {
    render(
      <CartProvider>
        <AuthProvider>
          <Header />
        </AuthProvider>
      </CartProvider>
    )

    const cartLink = screen.getByRole('link', { name: /cart/i })
    expect(cartLink).toHaveAttribute('href', '/cos')
  })

  it('should display search input on desktop', () => {
    render(
      <CartProvider>
        <AuthProvider>
          <Header />
        </AuthProvider>
      </CartProvider>
    )

    const searchInput = screen.getByPlaceholderText('Caută...')
    expect(searchInput).toBeInTheDocument()
  })

  it('should toggle mobile menu when menu button is clicked', () => {
    render(
      <CartProvider>
        <AuthProvider>
          <Header />
        </AuthProvider>
      </CartProvider>
    )

    // Mobile menu should not be visible initially
    const mobileLinks = screen.queryAllByText('Acasă')
    expect(mobileLinks.length).toBeGreaterThan(0)

    // Click menu button
    const menuButton = screen.getByRole('button', { name: /menu/i })
    fireEvent.click(menuButton)

    // Mobile menu should be visible
    expect(screen.getAllByText('Acasă').length).toBeGreaterThan(1)
  })

  it('should show login link when user is not authenticated', () => {
    render(
      <CartProvider>
        <AuthProvider>
          <Header />
        </AuthProvider>
      </CartProvider>
    )

    const loginLink = screen.getByTitle('Autentificare')
    expect(loginLink).toBeInTheDocument()
    expect(loginLink).toHaveAttribute('href', '/login')
  })
})

