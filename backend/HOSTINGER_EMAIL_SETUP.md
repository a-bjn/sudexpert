# Hostinger Email Setup Guide

## ✅ What's Already Configured

- EmailService is fully implemented and integrated
- Emails are automatically sent after successful payment
- Professional HTML email template with order details
- Hostinger SMTP configuration in `application.properties`

## 📝 Quick Setup Steps

### 1. Get Your Hostinger Email Credentials

You mentioned you've already created the `noreply` email in Hostinger. You'll need:
- **Full email address**: `noreply@yourdomain.com` (replace with your actual domain)
- **Email password**: The password you set when creating the email account

### 2. Create/Update `.env` File

Create a file named `.env` in the `backend` folder (if it doesn't exist) and add:

```env
MAIL_USERNAME=noreply@yourdomain.com
MAIL_PASSWORD=your-email-password
```

**Important**: 
- Replace `yourdomain.com` with your actual domain
- Replace `your-email-password` with the actual password
- Use the **full email address** as the username (not just "noreply")

### 3. Restart Backend Server

After updating the `.env` file, restart your Spring Boot backend server.

## 🧪 Test It

1. Complete a test order on your website
2. Use Stripe test card: `4242 4242 4242 4242`
3. Check the delivery email inbox
4. You should receive a confirmation email!

## 📧 Current Email Configuration

The system is configured to use:
- **SMTP Host**: `smtp.hostinger.com`
- **Port**: `587` (TLS)
- **From Address**: Uses the email in `MAIL_USERNAME`
- **To Address**: The delivery email provided at checkout

## ❌ Troubleshooting

### "Authentication failed"
- Verify you're using the **full email address** as username
- Check the password is correct (no typos)
- Ensure the email account is active in Hostinger

### "Connection timeout"
- Check if port 587 is blocked by firewall
- Try port 465 with SSL (update `application.properties` if needed)
- Verify `smtp.hostinger.com` is accessible

### Emails go to spam
- This is normal initially for automated emails
- Set up SPF/DKIM records in Hostinger DNS settings
- Use a proper domain email (not free email services)

### "Could not connect to SMTP host"
- Verify SMTP is enabled in your Hostinger plan
- Check if your hosting plan includes email functionality
- Contact Hostinger support if issues persist

## 📋 Email Content

The confirmation email includes:
- Order number (e.g., ORD-20241212-0001)
- Order date and status
- Complete list of products with prices
- Total amount
- Delivery address details
- Contact information

## 🔧 Alternative: Use Port 465 (SSL)

If port 587 doesn't work, you can use SSL on port 465. Update `application.properties`:

```properties
spring.mail.port=465
spring.mail.properties.mail.smtp.ssl.enable=true
spring.mail.properties.mail.smtp.ssl.required=true
spring.mail.properties.mail.smtp.starttls.enable=false
spring.mail.properties.mail.smtp.starttls.required=false
```

## 📚 Files Modified

- `backend/src/main/resources/application.properties` - SMTP configuration
- `backend/src/main/java/com/backend/sudexpert/service/EmailService.java` - Email sending logic
- `backend/src/main/java/com/backend/sudexpert/service/StripeService.java` - Calls email service after payment

## ✅ Next Steps

1. ✅ Create `.env` file with your Hostinger email credentials
2. ✅ Restart backend server
3. ✅ Test with a sample order
4. ✅ Check email inbox (and spam folder)

That's it! Your email system should now be working with Hostinger.

