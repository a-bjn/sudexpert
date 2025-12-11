# Sudexpert Frontend

Modern e-commerce frontend built with Next.js 15 and React 19.

## Technology Stack

- **Next.js 15.5.6** with App Router
- **React 19.1.0**
- **TypeScript 5**
- **Tailwind CSS 4** for styling
- **GSAP 3.13** for animations
- **Lucide React** for icons

## Prerequisites

- Node.js 18+ 
- npm 9+

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Create `.env.local` (optional):
```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

```bash
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm test             # Run tests
npm run test:watch   # Run tests in watch mode
```

## Testing

### Run Tests
```bash
npm test
```

### Run Tests with Coverage
```bash
npm test -- --coverage
```

### Watch Mode
```bash
npm run test:watch
```

See [TESTING.md](../TESTING.md) for detailed testing documentation.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Homepage
│   ├── layout.tsx         # Root layout
│   ├── magazin/           # Shop pages
│   ├── login/             # Authentication
│   ├── register/          # Registration
│   ├── cos/               # Shopping cart
│   ├── despre/            # About page
│   └── contact/           # Contact page
├── components/
│   ├── header/            # Header component
│   ├── footer/            # Footer component
│   ├── home/              # Homepage components
│   └── ui/                # Reusable UI components
└── lib/
    ├── api.ts             # API client
    ├── auth-context.tsx   # Authentication context
    └── cart-context.tsx   # Shopping cart context
```

## Features

### Authentication
- User registration and login
- JWT token management
- Protected routes
- Persistent sessions (localStorage)

### Shopping Cart
- Add/remove products
- Quantity management
- Persistent cart (localStorage)
- Real-time total calculation

### Product Catalog
- Browse all products
- Filter by category
- Product details page
- Responsive grid layout

### Responsive Design
- Mobile-first approach
- Tablet and desktop optimized
- Touch-friendly interactions

## API Integration

The frontend communicates with the backend API at `http://localhost:8080/api`.

### API Client Usage

```typescript
import { api } from '@/lib/api'

// Get all products
const products = await api.products.getAll()

// Login
const response = await api.auth.login({
  email: 'user@example.com',
  password: 'password'
})

// Create order (authenticated)
const order = await api.orders.create(orderData, token)
```

## State Management

### Auth Context
```typescript
import { useAuth } from '@/lib/auth-context'

function Component() {
  const { user, token, login, logout, isAuthenticated } = useAuth()
  
  // Use authentication state
}
```

### Cart Context
```typescript
import { useCart } from '@/lib/cart-context'

function Component() {
  const { items, totalItems, totalPrice, addItem, removeItem, clearCart } = useCart()
  
  // Use cart state
}
```

## Styling

### Tailwind CSS
The project uses Tailwind CSS 4 with custom configuration.

### Custom Fonts
- **Roboto**: Body text (multiple weights)
- **Bebas Neue**: Headings and display text

### Color Scheme
- Primary: Orange (#EA580C)
- Background: Neutral tones
- Dark mode ready

## Building for Production

### Build
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

### Static Export (if needed)
```bash
# Add to next.config.ts
output: 'export'

# Then build
npm run build
```

## Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### AWS Amplify
The project includes `amplify.yml` for AWS Amplify deployment.

### Docker
```bash
# Build
docker build -t sudexpert-frontend .

# Run
docker run -p 3000:3000 sudexpert-frontend
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | `http://localhost:8080/api` |

## Performance Optimization

- **Turbopack**: Fast development builds
- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic route-based splitting
- **Font Optimization**: next/font for Google Fonts

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### Port Already in Use
```bash
# Use different port
npm run dev -- -p 3001
```

### API Connection Issues
```bash
# Check backend is running
curl http://localhost:8080/api/products

# Check CORS settings in backend
```

### Build Errors
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## Development Tips

### Hot Reload
Changes to files automatically trigger hot reload.

### Type Checking
```bash
# Run TypeScript compiler
npx tsc --noEmit
```

### Debugging
Use React DevTools and browser DevTools for debugging.

## Contributing

1. Create feature branch
2. Write tests for new features
3. Ensure all tests pass
4. Follow code style guidelines
5. Submit pull request

## License

Proprietary - All rights reserved
