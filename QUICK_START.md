# 🚀 Quick Start Guide - SudExpert E-Commerce

## Prerequisites ✅
- ✅ Java 21
- ✅ PostgreSQL 18 (or use H2 for development)
- ✅ Node.js 18+
- ✅ Stripe test account

---

## 🎯 Start the Application

### Option 1: With PostgreSQL

**Terminal 1 - Backend:**
```powershell
cd backend
.\mvnw.cmd spring-boot:run
```

**Terminal 2 - Frontend:**
```powershell
cd frontend
npm run dev
```

### Option 2: With H2 (No PostgreSQL needed)

**Terminal 1 - Backend:**
```powershell
cd backend
.\mvnw.cmd spring-boot:run "-Dspring-boot.run.profiles=dev"
```

**Terminal 2 - Frontend:**
```powershell
cd frontend
npm run dev
```

---

## 🌐 Access Points

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080/api
- **H2 Console** (dev mode): http://localhost:8080/h2-console

---

## 🧪 Test the Complete Flow

1. **Browse**: http://localhost:3000/magazin
2. **Add to cart**: Click "Adaugă în coș" on any product
3. **View cart**: Click cart icon (top right)
4. **Register**: http://localhost:3000/register
   - Email: `test@example.com`
   - Password: `password123`
5. **Checkout**: Click "Finalizează comanda"
6. **Fill delivery info**:
   - All required fields marked with *
7. **Pay with test card**:
   - Card: `4242 4242 4242 4242`
   - Expiry: Any future date
   - CVC: Any 3 digits
8. **Success**: View order confirmation with order code

---

## 🔑 Configuration

### Database (PostgreSQL)
```properties
# backend/src/main/resources/application.properties
spring.datasource.url=jdbc:postgresql://localhost:5432/sudexpert
spring.datasource.username=postgres
spring.datasource.password=admin
```

### Stripe Keys
```properties
# Backend (application.properties or environment variable)
external.api.key=your_stripe_secret_key_here
# Or set environment variable: STRIPE_SECRET_KEY=sk_test_...

# Frontend (.env.local)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key_here
# Use your own Stripe test keys from https://dashboard.stripe.com/test/apikeys
```

---

## 📦 Features

### ✅ Implemented
- User authentication (register/login)
- Product catalog with categories
- Shopping cart
- Two-step checkout (delivery + payment)
- Stripe payment integration
- Order management with unique codes
- Order confirmation page
- Email notifications (logged to console)
- Responsive design

### 🎨 Sample Data
On startup, the app creates:
- **4 categories**: Echipamente Sudură, Consumabile, Protecție, Accesorii
- **24 products**: Various welding equipment and supplies

---

## 🛠️ Troubleshooting

### Port 8080 already in use
```powershell
# Find and stop the process
Get-NetTCPConnection -LocalPort 8080 | Select-Object OwningProcess
Stop-Process -Id <PID> -Force
```

### Frontend dependencies issue
```powershell
cd frontend
npm install --legacy-peer-deps
```

### Database connection error
- Ensure PostgreSQL is running
- Check database `sudexpert` exists
- Verify credentials in `application.properties`
- Or use H2 with `-Dspring-boot.run.profiles=dev`

### Stripe payment not working
- Check both keys are set correctly
- Ensure using test mode keys (start with `pk_test_` and `sk_test_`)
- Restart both frontend and backend after changing keys

---

## 📧 Email Notifications

Currently, order confirmation emails are **logged to the backend console**.

To enable actual email sending:
1. Add Spring Mail dependency to `pom.xml`
2. Configure SMTP in `application.properties`
3. Uncomment email sending code in `EmailService.java`

See `POST_CHECKOUT_FEATURES.md` for details.

---

## 🎉 You're Ready!

The application is now fully functional with:
- Complete e-commerce flow
- Secure payments via Stripe
- Order management
- Professional UI/UX

Happy coding! 🚀

