package com.backend.sudexpert.service;

import com.backend.sudexpert.dto.OrderResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {

    /**
     * Send order confirmation email to customer
     * Note: This is a placeholder implementation. In production, integrate with:
     * - Spring Mail (JavaMailSender)
     * - SendGrid
     * - AWS SES
     * - Mailgun
     * etc.
     */
    public void sendOrderConfirmationEmail(OrderResponse order) {
        try {
            String emailContent = buildOrderConfirmationEmail(order);
            
            // TODO: Implement actual email sending
            // For now, just log the email content
            log.info("=== ORDER CONFIRMATION EMAIL ===");
            log.info("To: {}", order.getDeliveryEmail());
            log.info("Subject: Order Confirmation - {}", order.getOrderCode());
            log.info("Content:\n{}", emailContent);
            log.info("================================");
            
            // Example implementation with Spring Mail:
            // MimeMessage message = mailSender.createMimeMessage();
            // MimeMessageHelper helper = new MimeMessageHelper(message, true);
            // helper.setTo(order.getDeliveryEmail());
            // helper.setSubject("Order Confirmation - " + order.getOrderCode());
            // helper.setText(emailContent, true);
            // mailSender.send(message);
            
        } catch (Exception e) {
            log.error("Failed to send order confirmation email for order {}: {}", 
                    order.getOrderCode(), e.getMessage());
        }
    }

    private String buildOrderConfirmationEmail(OrderResponse order) {
        StringBuilder sb = new StringBuilder();
        
        sb.append("<!DOCTYPE html>");
        sb.append("<html><head><style>");
        sb.append("body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }");
        sb.append(".container { max-width: 600px; margin: 0 auto; padding: 20px; }");
        sb.append(".header { background: #2563eb; color: white; padding: 20px; text-align: center; }");
        sb.append(".content { padding: 20px; background: #f9fafb; }");
        sb.append(".order-details { background: white; padding: 15px; margin: 10px 0; border-radius: 5px; }");
        sb.append(".item { padding: 10px 0; border-bottom: 1px solid #e5e7eb; }");
        sb.append(".total { font-size: 18px; font-weight: bold; padding: 15px 0; }");
        sb.append(".footer { text-align: center; padding: 20px; color: #6b7280; font-size: 12px; }");
        sb.append("</style></head><body>");
        
        sb.append("<div class='container'>");
        sb.append("<div class='header'>");
        sb.append("<h1>Mulțumim pentru comandă!</h1>");
        sb.append("</div>");
        
        sb.append("<div class='content'>");
        sb.append("<p>Bună ").append(order.getDeliveryName()).append(",</p>");
        sb.append("<p>Comanda ta a fost plasată cu succes!</p>");
        
        sb.append("<div class='order-details'>");
        sb.append("<h2>Detalii Comandă</h2>");
        sb.append("<p><strong>Număr comandă:</strong> ").append(order.getOrderCode()).append("</p>");
        sb.append("<p><strong>Data:</strong> ").append(order.getCreatedAt()).append("</p>");
        sb.append("<p><strong>Status:</strong> ").append(order.getStatus()).append("</p>");
        sb.append("</div>");
        
        sb.append("<div class='order-details'>");
        sb.append("<h3>Produse comandate:</h3>");
        for (OrderResponse.OrderItemResponse item : order.getItems()) {
            sb.append("<div class='item'>");
            sb.append("<p><strong>").append(item.getProductName()).append("</strong></p>");
            sb.append("<p>Cantitate: ").append(item.getQuantity());
            sb.append(" × ").append(item.getPrice()).append(" RON");
            sb.append(" = ").append(item.getSubtotal()).append(" RON</p>");
            sb.append("</div>");
        }
        sb.append("<div class='total'>Total: ").append(order.getTotal()).append(" RON</div>");
        sb.append("</div>");
        
        sb.append("<div class='order-details'>");
        sb.append("<h3>Adresa de livrare:</h3>");
        sb.append("<p>").append(order.getDeliveryName()).append("</p>");
        sb.append("<p>").append(order.getDeliveryAddress()).append("</p>");
        sb.append("<p>").append(order.getDeliveryCity());
        if (order.getDeliveryCounty() != null) {
            sb.append(", ").append(order.getDeliveryCounty());
        }
        if (order.getDeliveryPostalCode() != null) {
            sb.append(", ").append(order.getDeliveryPostalCode());
        }
        sb.append("</p>");
        sb.append("<p>").append(order.getDeliveryCountry()).append("</p>");
        sb.append("<p>Telefon: ").append(order.getDeliveryPhone()).append("</p>");
        if (order.getDeliveryNotes() != null && !order.getDeliveryNotes().isEmpty()) {
            sb.append("<p><strong>Note:</strong> ").append(order.getDeliveryNotes()).append("</p>");
        }
        sb.append("</div>");
        
        sb.append("<p>Vei primi un email când comanda ta va fi expediată.</p>");
        sb.append("<p>Dacă ai întrebări, te rugăm să ne contactezi.</p>");
        sb.append("</div>");
        
        sb.append("<div class='footer'>");
        sb.append("<p>© 2025 SudExpert. Toate drepturile rezervate.</p>");
        sb.append("<p>Acest email a fost trimis automat. Te rugăm să nu răspunzi.</p>");
        sb.append("</div>");
        
        sb.append("</div></body></html>");
        
        return sb.toString();
    }
}

