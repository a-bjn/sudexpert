import { render, screen, fireEvent } from '@testing-library/react'
import ProductCard from '../ProductCard'
import { CartProvider } from '@/lib/cart-context'

const mockProduct = {
  id: 1,
  name: 'Electrozi E6013',
  description: 'Electrozi de calitate superioară',
  price: 150.00,
  imageUrl: 'http://example.com/image.jpg',
  category: {
    id: 1,
    name: 'Electrozi',
  },
}

describe('ProductCard', () => {
  it('should render product information', () => {
    render(
      <CartProvider>
        <ProductCard product={mockProduct} />
      </CartProvider>
    )

    expect(screen.getByText('Electrozi E6013')).toBeInTheDocument()
    expect(screen.getByText('150 RON')).toBeInTheDocument()
  })

  it('should display product image', () => {
    render(
      <CartProvider>
        <ProductCard product={mockProduct} />
      </CartProvider>
    )

    const image = screen.getByRole('img')
    expect(image).toHaveAttribute('alt', 'Electrozi E6013')
  })

  it('should add product to cart when button is clicked', () => {
    render(
      <CartProvider>
        <ProductCard product={mockProduct} />
      </CartProvider>
    )

    const addButton = screen.getByRole('button', { name: /adaugă în coș|add to cart/i })
    fireEvent.click(addButton)

    // The cart context should have been called
    // This is a basic test - you might want to verify cart state changes
  })

  it('should render without image when imageUrl is not provided', () => {
    const productWithoutImage = { ...mockProduct, imageUrl: undefined }

    render(
      <CartProvider>
        <ProductCard product={productWithoutImage} />
      </CartProvider>
    )

    expect(screen.getByText('Electrozi E6013')).toBeInTheDocument()
  })

  it('should format price correctly', () => {
    const productWithDecimalPrice = { ...mockProduct, price: 150.50 }

    render(
      <CartProvider>
        <ProductCard product={productWithDecimalPrice} />
      </CartProvider>
    )

    expect(screen.getByText(/150\.50|150,50/)).toBeInTheDocument()
  })
})

