# 💳 Stripe API Keys Guide

## How Stripe Keys Work in This Project

### 🔑 Two Types of Stripe Keys

Stripe uses **two different keys** for security:

1. **Secret Key** (Backend only) - `sk_test_...` or `sk_live_...`
   - Used on the **server** (backend)
   - Can create charges, refunds, access customer data
   - **NEVER expose to frontend/browser!**

2. **Publishable Key** (Frontend only) - `pk_test_...` or `pk_live_...`
   - Used in the **browser** (frontend)
   - Safe to expose publicly
   - Only used to initialize Stripe Elements (payment form)

---

## 🔄 How They Work Together

### **Payment Flow:**

```
1. User clicks "Pay" on frontend
   ↓
2. Frontend (with Publishable Key) → Creates payment form
   ↓
3. Frontend → Backend API: "Create payment intent"
   ↓
4. Backend (with Secret Key) → Stripe API: Creates PaymentIntent
   ↓
5. Backend → Frontend: Returns clientSecret
   ↓
6. Frontend (with Publishable Key) → Stripe: Submits payment
   ↓
7. Stripe processes payment
   ↓
8. Backend (with Secret Key) → Updates order status
```

---

## 📍 Where Keys Are Used

### **Backend (Secret Key)**

#### 1. Configuration (`StripeConfig.java`)
```java
@Value("${external.api.key:sk_test_your_stripe_secret_key_here}")
private String stripeApiKey;

@PostConstruct
public void init() {
    Stripe.apiKey = stripeApiKey;  // Sets global Stripe API key
}
```

**Location:** `backend/src/main/java/com/backend/sudexpert/config/StripeConfig.java`

**Environment Variable:** `EXTERNAL_API_KEY`

**Used For:**
- Creating PaymentIntents
- Retrieving payment information
- Updating order status after payment

#### 2. Service (`StripeService.java`)
```java
// Uses the global Stripe.apiKey set in StripeConfig
PaymentIntent paymentIntent = PaymentIntent.create(paramsBuilder.build());
```

**What it does:**
- Creates payment intents (amount, currency, metadata)
- Retrieves payment status
- Handles payment success/failure

---

### **Frontend (Publishable Key)**

#### 1. Checkout Page (`checkout/page.tsx`)
```typescript
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 
  "pk_test_your_publishable_key_here"
);
```

**Location:** `frontend/src/app/checkout/page.tsx`

**Environment Variable:** `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

**Used For:**
- Initializing Stripe Elements (payment form)
- Submitting payment securely
- Displaying payment UI

#### 2. Checkout Form (`CheckoutForm.tsx`)
```typescript
const stripe = useStripe();  // Uses the publishable key
const elements = useElements();

await stripe.confirmPayment({
  elements,
  // ...
});
```

**What it does:**
- Renders payment form (card input)
- Validates card details
- Submits payment to Stripe

---

## 🔐 Security Model

### **Why Two Keys?**

| Key Type | Location | Security Level | What It Can Do |
|----------|----------|----------------|---------------|
| **Secret Key** | Backend only | 🔴 Highly Sensitive | Create charges, refunds, access all data |
| **Publishable Key** | Frontend (browser) | 🟢 Safe to expose | Only initialize payment forms |

### **Security Rules:**
1. ✅ **Secret Key** stays on backend (never in frontend code)
2. ✅ **Publishable Key** can be in frontend (safe for browser)
3. ✅ All sensitive operations happen on backend
4. ✅ Frontend only handles payment form UI

---

## 🛠️ Configuration

### **Backend Setup**

#### Option 1: Environment Variable (Recommended)
```powershell
$env:EXTERNAL_API_KEY="sk_test_51AbC123..."
cd backend
.\mvnw.cmd spring-boot:run
```

#### Option 2: .env File
Create `backend/.env`:
```env
EXTERNAL_API_KEY=sk_test_51AbC123...
```

#### Option 3: application.properties
```properties
external.api.key=${EXTERNAL_API_KEY:sk_test_your_stripe_secret_key_here}
```

---

### **Frontend Setup**

#### Option 1: Environment Variable
Create `frontend/.env.local`:
```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51XyZ789...
```

#### Option 2: Hardcoded (Not Recommended)
```typescript
const stripePromise = loadStripe("pk_test_51XyZ789...");
```

**Note:** `NEXT_PUBLIC_*` prefix makes it available in the browser.

---

## 🧪 Test vs Live Keys

### **Test Keys** (Development)
```
Secret:     sk_test_51AbC123...
Publishable: pk_test_51XyZ789...
```
- Use for development/testing
- No real money charged
- Test card: `4242 4242 4242 4242`

### **Live Keys** (Production)
```
Secret:     sk_live_51AbC123...
Publishable: pk_live_51XyZ789...
```
- Use for real payments
- Real money charged
- **Only use in production!**

---

## 📝 How to Get Your Keys

### **Step 1: Create Stripe Account**
1. Go to https://stripe.com
2. Sign up for free account

### **Step 2: Get Test Keys**
1. Go to https://dashboard.stripe.com/test/apikeys
2. Copy **Publishable key** → Use in frontend
3. Click "Reveal test key" → Copy **Secret key** → Use in backend

### **Step 3: Get Live Keys (Production)**
1. Go to https://dashboard.stripe.com/apikeys
2. Switch to "Live mode" toggle
3. Copy **Publishable key** and **Secret key**

---

## 🔍 Current Configuration

### **Backend:**
```properties
# application.properties
external.api.key=${EXTERNAL_API_KEY:sk_test_your_stripe_secret_key_here}
```

**Status:** ⚠️ Using placeholder - needs real key

### **Frontend:**
```typescript
// checkout/page.tsx
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 
  "pk_test_your_publishable_key_here"
);
```

**Status:** ⚠️ Using placeholder - needs real key

---

## ✅ Setup Checklist

- [ ] Get Stripe account (free)
- [ ] Copy test Secret Key → Set `EXTERNAL_API_KEY` in backend
- [ ] Copy test Publishable Key → Set `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` in frontend
- [ ] Test payment with test card: `4242 4242 4242 4242`
- [ ] For production: Switch to live keys

---

## 🧪 Testing

### **Test Card Numbers:**
```
Success:     4242 4242 4242 4242
Decline:    4000 0000 0000 0002
3D Secure:  4000 0025 0000 3155
```

### **Test Flow:**
1. Add products to cart
2. Go to checkout
3. Use test card: `4242 4242 4242 4242`
4. Any future expiry date (e.g., 12/25)
5. Any 3-digit CVC (e.g., 123)
6. Any ZIP code (e.g., 12345)

---

## 🚨 Common Issues

### **"Invalid API Key"**
- Check if key starts with `sk_test_` or `sk_live_`
- Verify no extra spaces
- Ensure correct key type (secret vs publishable)

### **"Payment failed"**
- Check if using test keys with test card
- Verify backend has correct secret key
- Check Stripe dashboard for error logs

### **"Stripe not initialized"**
- Verify `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` is set
- Check browser console for errors
- Ensure key starts with `pk_test_` or `pk_live_`

---

## 📚 Additional Resources

- [Stripe API Keys Documentation](https://stripe.com/docs/keys)
- [Stripe Test Cards](https://stripe.com/docs/testing)
- [Stripe Dashboard](https://dashboard.stripe.com)

---

**Remember:** 
- 🔴 Secret Key = Backend only (never in frontend!)
- 🟢 Publishable Key = Frontend safe (can be in browser)

