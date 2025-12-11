# Complete Stripe Checkout Setup Guide

This guide will walk you through setting up PostgreSQL and Stripe integration for the complete checkout flow.

## Prerequisites

- Docker Desktop installed and running
- Stripe account (free test account)
- Node.js 18+ and Java 21+ installed

---

## Step 1: Start PostgreSQL with Docker

1. **Start Docker Desktop** from the Start Menu
2. Wait for it to fully start (whale icon in system tray)
3. Run PostgreSQL:
   ```powershell
   docker-compose up -d postgres
   ```
4. Verify it's running:
   ```powershell
   docker ps
   ```

---

## Step 2: Get Stripe API Keys

1. **Create a Stripe account** (if you don't have one):
   - Go to: https://dashboard.stripe.com/register
   - Sign up for free

2. **Get your test API keys**:
   - Go to: https://dashboard.stripe.com/test/apikeys
   - Copy your **Publishable key** (starts with `pk_test_`)
   - Copy your **Secret key** (starts with `sk_test_`)

---

## Step 3: Configure Backend

1. **Set Stripe Secret Key**:
   
   Option A: Using environment variable (recommended):
   ```powershell
   $env:STRIPE_SECRET_KEY="sk_test_your_secret_key_here"
   ```

   Option B: Update `application.properties`:
   ```properties
   stripe.api.key=sk_test_your_secret_key_here
   ```

2. **Start backend with PostgreSQL**:
   ```powershell
   cd backend
   .\mvnw.cmd spring-boot:run "-Dspring.profiles.active=postgres"
   ```

   Or without profile (uses default PostgreSQL config):
   ```powershell
   .\mvnw.cmd spring-boot:run
   ```

---

## Step 4: Configure Frontend

1. **Create `.env.local` file** in the `frontend` directory:
   ```env
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
   NEXT_PUBLIC_API_URL=http://localhost:8080/api
   ```

2. **Install dependencies**:
   ```powershell
   cd frontend
   npm install
   ```

3. **Start frontend**:
   ```powershell
   npm run dev
   ```

---

## Step 5: Test the Complete Flow

### 1. Browse Products
- Open: http://localhost:3000
- Navigate to "Magazin" (Shop)
- You should see 13 products in 4 categories

### 2. Add to Cart
- Click on any product
- Add it to cart
- Cart icon should show item count

### 3. Register/Login
- Go to: http://localhost:3000/register
- Create a new account
- Or login if you already have one

### 4. Checkout
- Go to cart: http://localhost:3000/cos
- Click "Continuă la plată" (Continue to Payment)
- You'll be redirected to: http://localhost:3000/checkout

### 5. Complete Payment
- Fill in test card details:
  - Card number: `4242 4242 4242 4242`
  - Expiry: Any future date (e.g., `12/25`)
  - CVC: Any 3 digits (e.g., `123`)
  - ZIP: Any 5 digits (e.g., `12345`)
- Click "Pay Now"
- You should be redirected to success page

### 6. Verify Order
- Check backend logs for order status update
- Order status should change from PENDING to PROCESSING

---

## Stripe Test Cards

Use these test card numbers for testing:

| Card Number | Description |
|-------------|-------------|
| `4242 4242 4242 4242` | Successful payment |
| `4000 0000 0000 9995` | Payment declined |
| `4000 0025 0000 3155` | Requires authentication (3D Secure) |

All test cards:
- Use any future expiry date
- Use any 3-digit CVC
- Use any 5-digit ZIP code

More test cards: https://stripe.com/docs/testing

---

## Project Structure

```
sudexpert-main/
├── backend/
│   ├── src/main/java/com/backend/sudexpert/
│   │   ├── config/
│   │   │   ├── StripeConfig.java          # Stripe initialization
│   │   │   └── SecurityConfig.java        # Updated with payment endpoints
│   │   ├── controller/
│   │   │   └── PaymentController.java     # Payment endpoints
│   │   ├── service/
│   │   │   └── StripeService.java         # Stripe integration
│   │   └── dto/
│   │       ├── PaymentIntentRequest.java
│   │       └── PaymentIntentResponse.java
│   └── src/main/resources/
│       ├── application.properties          # Updated with Stripe config
│       └── application-postgres.properties # PostgreSQL profile
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── checkout/
│   │   │   │   ├── page.tsx              # Checkout page
│   │   │   │   └── success/
│   │   │   │       └── page.tsx          # Success page
│   │   │   └── cos/
│   │   │       └── page.tsx              # Updated cart page
│   │   ├── components/
│   │   │   └── checkout/
│   │   │       └── CheckoutForm.tsx      # Stripe payment form
│   │   └── lib/
│   │       └── api.ts                    # Updated with payment endpoints
│   ├── .env.local                        # Create this file
│   └── package.json                      # Updated with Stripe packages
└── docker-compose.yml                    # PostgreSQL config
```

---

## API Endpoints

### Payment Endpoints (Protected - requires JWT)

```
POST /api/payments/create-payment-intent
Body: {
  "amount": 150.00,
  "currency": "ron",
  "orderId": 1
}
Response: {
  "clientSecret": "pi_xxx_secret_xxx",
  "paymentIntentId": "pi_xxx"
}

POST /api/payments/success?paymentIntentId=pi_xxx
Updates order status to PROCESSING

POST /api/payments/failure?paymentIntentId=pi_xxx
Updates order status to CANCELLED
```

---

## Troubleshooting

### Docker Issues

**Docker Desktop not running:**
```powershell
# Start Docker Desktop from Start Menu
# Wait for whale icon in system tray
docker ps  # Verify it's running
```

**PostgreSQL won't start:**
```powershell
docker-compose down
docker-compose up -d postgres
docker logs sudexpert-main-postgres-1
```

### Backend Issues

**Stripe key not set:**
- Check `application.properties` or environment variable
- Verify key starts with `sk_test_`

**Database connection error:**
- Ensure PostgreSQL is running: `docker ps`
- Check connection string in `application.properties`

### Frontend Issues

**Stripe not loading:**
- Check `.env.local` file exists
- Verify publishable key starts with `pk_test_`
- Restart frontend: `npm run dev`

**Payment form not showing:**
- Check browser console for errors
- Verify backend is running and accessible
- Check CORS configuration

---

## Environment Variables Summary

### Backend
```properties
# In application.properties or environment
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
DB_URL=jdbc:postgresql://localhost:5432/sudexpert
DB_USERNAME=postgres
DB_PASSWORD=password
```

### Frontend
```env
# In .env.local
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

---

## Quick Start Commands

```powershell
# Terminal 1 - PostgreSQL
docker-compose up -d postgres

# Terminal 2 - Backend
cd backend
$env:STRIPE_SECRET_KEY="sk_test_your_key"
.\mvnw.cmd spring-boot:run

# Terminal 3 - Frontend
cd frontend
npm install
npm run dev

# Open browser
# http://localhost:3000
```

---

## Production Considerations

1. **Use production Stripe keys** (starts with `pk_live_` and `sk_live_`)
2. **Implement webhook verification** for payment events
3. **Add proper error handling** and logging
4. **Secure environment variables** (use secrets management)
5. **Add order confirmation emails**
6. **Implement refund functionality**
7. **Add payment history page**

---

## Next Steps

1. ✅ PostgreSQL running
2. ✅ Backend with Stripe integration
3. ✅ Frontend with checkout flow
4. ✅ Complete payment processing
5. 🔄 Test with different scenarios
6. 📧 Add email notifications (optional)
7. 📊 Add order tracking (optional)

---

## Support

- Stripe Documentation: https://stripe.com/docs
- Stripe Dashboard: https://dashboard.stripe.com
- Test Cards: https://stripe.com/docs/testing

---

**Happy selling! 🚀**

