package com.backend.sudexpert.service;

import com.backend.sudexpert.dto.OrderResponse;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.format.DateTimeFormatter;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    public void sendOrderConfirmationEmail(OrderResponse order) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(fromEmail);
            helper.setTo(order.getDeliveryEmail());
            helper.setSubject("Confirmare Comandă #" + order.getOrderCode() + " - Sudexpert");
            helper.setText(buildOrderConfirmationEmail(order), true);

            mailSender.send(message);
            log.info("Order confirmation email sent to {} for order {}", order.getDeliveryEmail(), order.getOrderCode());
        } catch (MessagingException e) {
            log.error("Failed to send order confirmation email: {}", e.getMessage());
            throw new RuntimeException("Failed to send email", e);
        }
    }

    private String buildOrderConfirmationEmail(OrderResponse order) {
        StringBuilder itemsHtml = new StringBuilder();
        BigDecimal total = BigDecimal.ZERO;

        for (OrderResponse.OrderItemResponse item : order.getItems()) {
            BigDecimal subtotal = item.getPrice().multiply(BigDecimal.valueOf(item.getQuantity()));
            total = total.add(subtotal);
            
            itemsHtml.append(String.format(
                "<tr>" +
                "  <td style='padding: 12px; border-bottom: 1px solid #e5e7eb;'>%s</td>" +
                "  <td style='padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: center;'>%d</td>" +
                "  <td style='padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right;'>%.2f RON</td>" +
                "  <td style='padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right; font-weight: 600;'>%.2f RON</td>" +
                "</tr>",
                item.getProductName(),
                item.getQuantity(),
                item.getPrice(),
                subtotal
            ));
        }

        String orderDate = order.getCreatedAt() != null 
            ? order.getCreatedAt().format(DateTimeFormatter.ofPattern("dd.MM.yyyy HH:mm"))
            : "";

        return String.format("""
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f3f4f6;">
                <table width="100%%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6; padding: 20px;">
                    <tr>
                        <td align="center">
                            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                                <!-- Header -->
                                <tr>
                                    <td style="background: linear-gradient(135deg, #1f2937 0%%, #111827 100%%); padding: 40px 30px; text-align: center;">
                                        <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">SUDEXPERT</h1>
                                        <p style="color: #f97316; margin: 10px 0 0 0; font-size: 16px;">Confirmare Comandă</p>
                                    </td>
                                </tr>
                                
                                <!-- Content -->
                                <tr>
                                    <td style="padding: 40px 30px;">
                                        <h2 style="color: #111827; margin: 0 0 20px 0; font-size: 24px;">Mulțumim pentru comandă!</h2>
                                        <p style="color: #4b5563; margin: 0 0 30px 0; line-height: 1.6;">
                                            Comanda dumneavoastră a fost înregistrată cu succes și este în curs de procesare. 
                                            Veți primi un email de confirmare când comanda va fi expediată.
                                        </p>
                                        
                                        <!-- Order Details -->
                                        <table width="100%%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px;">
                                            <tr>
                                                <td style="padding: 15px; background-color: #f9fafb; border-radius: 6px;">
                                                    <table width="100%%" cellpadding="0" cellspacing="0">
                                                        <tr>
                                                            <td style="color: #6b7280; font-size: 14px; padding-bottom: 8px;">Număr comandă:</td>
                                                            <td style="color: #111827; font-size: 14px; font-weight: 600; text-align: right; padding-bottom: 8px;">%s</td>
                                                        </tr>
                                                        <tr>
                                                            <td style="color: #6b7280; font-size: 14px; padding-bottom: 8px;">Data:</td>
                                                            <td style="color: #111827; font-size: 14px; text-align: right; padding-bottom: 8px;">%s</td>
                                                        </tr>
                                                        <tr>
                                                            <td style="color: #6b7280; font-size: 14px;">Status:</td>
                                                            <td style="text-align: right;">
                                                                <span style="background-color: #dbeafe; color: #1e40af; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 600;">
                                                                    În procesare
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                        
                                        <!-- Order Items -->
                                        <h3 style="color: #111827; margin: 0 0 15px 0; font-size: 18px;">Produse comandate</h3>
                                        <table width="100%%" cellpadding="0" cellspacing="0" style="border: 1px solid #e5e7eb; border-radius: 6px; overflow: hidden; margin-bottom: 30px;">
                                            <thead>
                                                <tr style="background-color: #f9fafb;">
                                                    <th style="padding: 12px; text-align: left; color: #6b7280; font-size: 12px; font-weight: 600; text-transform: uppercase;">Produs</th>
                                                    <th style="padding: 12px; text-align: center; color: #6b7280; font-size: 12px; font-weight: 600; text-transform: uppercase;">Cantitate</th>
                                                    <th style="padding: 12px; text-align: right; color: #6b7280; font-size: 12px; font-weight: 600; text-transform: uppercase;">Preț</th>
                                                    <th style="padding: 12px; text-align: right; color: #6b7280; font-size: 12px; font-weight: 600; text-transform: uppercase;">Subtotal</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                %s
                                                <tr>
                                                    <td colspan="3" style="padding: 15px; text-align: right; font-weight: 600; color: #111827; font-size: 16px; border-top: 2px solid #e5e7eb;">Total:</td>
                                                    <td style="padding: 15px; text-align: right; font-weight: 700; color: #f97316; font-size: 18px; border-top: 2px solid #e5e7eb;">%.2f RON</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        
                                        <!-- Delivery Address -->
                                        <h3 style="color: #111827; margin: 0 0 15px 0; font-size: 18px;">Adresă de livrare</h3>
                                        <div style="padding: 15px; background-color: #f9fafb; border-radius: 6px; margin-bottom: 30px;">
                                            <p style="margin: 0 0 8px 0; color: #111827; font-weight: 600;">%s</p>
                                            <p style="margin: 0 0 5px 0; color: #4b5563;">%s</p>
                                            <p style="margin: 0 0 5px 0; color: #4b5563;">%s, %s %s</p>
                                            <p style="margin: 0 0 5px 0; color: #4b5563;">%s</p>
                                            <p style="margin: 0 0 5px 0; color: #4b5563;">Tel: %s</p>
                                            <p style="margin: 0; color: #4b5563;">Email: %s</p>
                                        </div>
                                        
                                        <!-- Contact Info -->
                                        <div style="padding: 20px; background-color: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 6px;">
                                            <p style="margin: 0 0 10px 0; color: #92400e; font-weight: 600;">Aveți întrebări?</p>
                                            <p style="margin: 0; color: #92400e; font-size: 14px; line-height: 1.6;">
                                                Echipa noastră este aici să vă ajute! Contactați-ne la 
                                                <a href="mailto:contact@sudexpert.ro" style="color: #f59e0b; text-decoration: none;">contact@sudexpert.ro</a>
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                                
                                <!-- Footer -->
                                <tr>
                                    <td style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
                                        <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 14px;">
                                            © 2024 Sudexpert. Toate drepturile rezervate.
                                        </p>
                                        <p style="margin: 0; color: #9ca3af; font-size: 12px;">
                                            Acest email a fost trimis automat. Vă rugăm să nu răspundeți la acest mesaj.
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </body>
            </html>
            """,
            order.getOrderCode(),
            orderDate,
            itemsHtml.toString(),
            order.getTotal(),
            order.getDeliveryName(),
            order.getDeliveryAddress(),
            order.getDeliveryCity(),
            order.getDeliveryCounty() != null ? order.getDeliveryCounty() : "",
            order.getDeliveryPostalCode() != null ? order.getDeliveryPostalCode() : "",
            order.getDeliveryCountry(),
            order.getDeliveryPhone(),
            order.getDeliveryEmail()
        );
    }
}
