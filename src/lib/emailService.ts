import nodemailer from 'nodemailer';

interface EmailData {
  token: string;
  name: string;
  email: string;
  message: string;
}

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// Email template
const createEmailTemplate = (data: EmailData) => {
  const { token, name, email, message } = data;
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Token Form Submission</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
        .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #555; }
        .value { background: white; padding: 10px; border-radius: 4px; border-left: 4px solid #667eea; }
        .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🔐 Token Form Submission</h1>
          <p>New message from Sudexpert website</p>
        </div>
        <div class="content">
          <div class="field">
            <div class="label">Token:</div>
            <div class="value">${token}</div>
          </div>
          <div class="field">
            <div class="label">Name:</div>
            <div class="value">${name}</div>
          </div>
          <div class="field">
            <div class="label">Email:</div>
            <div class="value">${email}</div>
          </div>
          <div class="field">
            <div class="label">Message:</div>
            <div class="value">${message}</div>
          </div>
        </div>
        <div class="footer">
          <p>This email was sent from the Sudexpert website contact form.</p>
          <p>Timestamp: ${new Date().toLocaleString('ro-RO')}</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Send email function
export const sendTokenEmail = async (data: EmailData): Promise<{ success: boolean; message: string }> => {
  try {
    // Validate environment variables
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.EMAIL_TO) {
      throw new Error('Email configuration is missing');
    }

    const transporter = createTransporter();
    const emailTemplate = createEmailTemplate(data);

    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: `Token Form Submission - ${data.name}`,
      html: emailTemplate,
      text: `
        Token Form Submission
        
        Token: ${data.token}
        Name: ${data.name}
        Email: ${data.email}
        Message: ${data.message}
        
        Sent from Sudexpert website on ${new Date().toLocaleString('ro-RO')}
      `,
    };

    await transporter.sendMail(mailOptions);

    return {
      success: true,
      message: 'Email sent successfully'
    };

  } catch (error) {
    console.error('Email sending error:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to send email'
    };
  }
};

// Validate email data
export const validateEmailData = (data: any): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!data.token || data.token.trim().length === 0) {
    errors.push('Token is required');
  }

  if (!data.name || data.name.trim().length === 0) {
    errors.push('Name is required');
  }

  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('Valid email is required');
  }

  if (!data.message || data.message.trim().length === 0) {
    errors.push('Message is required');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}; 