import { NextRequest, NextResponse } from 'next/server';
import { sendTokenEmail, validateEmailData } from '@/lib/emailService';

// Rate limiting store (in production, use Redis or database)
const requestCounts = new Map<string, { count: number; resetTime: number }>();

// Rate limiting function
const checkRateLimit = (ip: string): boolean => {
  const now = Date.now();
  const hour = 60 * 60 * 1000; // 1 hour in milliseconds
  const maxRequests = parseInt(process.env.MAX_REQUESTS_PER_HOUR || '10');

  const userRequests = requestCounts.get(ip);
  
  if (!userRequests || now > userRequests.resetTime) {
    requestCounts.set(ip, { count: 1, resetTime: now + hour });
    return true;
  }

  if (userRequests.count >= maxRequests) {
    return false;
  }

  userRequests.count++;
  return true;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function POST(_request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = _request.headers.get('x-forwarded-for') || 
               _request.headers.get('x-real-ip') || 
               'unknown';
    
    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Too many requests. Please try again later.' 
        },
        { status: 429 }
      );
    }

    // Parse request body
    const body = await _request.json();
    console.log(body);
    // Validate input data
    const validation = validateEmailData(body);
    console.log(validation);
    console.log(body);
    if (!validation.isValid) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid data provided',
          errors: validation.errors 
        },
        { status: 400 }
      );
    }

    // Send email
    const result = await sendTokenEmail({
      token: body.token,
      name: body.name,
      email: body.email,
      message: body.message,
    });

    if (result.success) {
      return NextResponse.json(
        { 
          success: true, 
          message: 'Email sent successfully' 
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { 
          success: false, 
          message: result.message 
        },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error' 
      },
      { status: 500 }
    );
  }
}

// Handle OPTIONS request for CORS
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
} 