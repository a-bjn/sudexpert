const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

type RequestMethod = "GET" | "POST" | "PUT" | "DELETE";

let csrfTokenFromResponse: string | null = null;

function getCsrfToken(): string | null {
  if (typeof document !== "undefined") {
    const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
    if (match) return decodeURIComponent(match[1]);
  }
  return csrfTokenFromResponse;
}

async function request<T>(
  endpoint: string,
  method: RequestMethod = "GET",
  body?: unknown
): Promise<T> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  const csrfToken = getCsrfToken();
  if (csrfToken && method !== "GET") {
    headers["X-XSRF-TOKEN"] = csrfToken;
  }

  const config: RequestInit = {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
    credentials: "include",
  };

  let response = await fetch(`${API_URL}${endpoint}`, config);

  const newToken = response.headers.get("X-CSRF-TOKEN");
  if (newToken) csrfTokenFromResponse = newToken;

  if (response.status === 403 && method !== "GET" && !csrfToken) {
    const retryResponse = await fetch(`${API_URL}/auth/me`, {
      method: "GET",
      credentials: "include",
    });
    const retryToken = retryResponse.headers.get("X-CSRF-TOKEN");
    if (retryToken) {
      csrfTokenFromResponse = retryToken;
      const retryHeaders: HeadersInit = { ...headers, "X-XSRF-TOKEN": retryToken };
      response = await fetch(`${API_URL}${endpoint}`, {
        ...config,
        headers: retryHeaders,
      });
      const retryNewToken = response.headers.get("X-CSRF-TOKEN");
      if (retryNewToken) csrfTokenFromResponse = retryNewToken;
    }
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error((errorData as { message?: string }).message || `Request failed with status ${response.status}`);
  }

  if (response.status === 204 || response.headers.get('content-length') === '0') {
    return {} as T;
  }

  const text = await response.text();
  if (!text || text.trim() === '') {
    return {} as T;
  }

  return JSON.parse(text);
}

interface AuthResponse {
  email: string;
}

export const api = {
  auth: {
    register: (data: { firstName: string; lastName: string; email: string; password: string }) =>
      request<AuthResponse>("/auth/register", "POST", data),
    login: (data: { email: string; password: string }) =>
      request<AuthResponse>("/auth/authenticate", "POST", data),
    me: () => request<AuthResponse>("/auth/me", "GET"),
    logout: () => request("/auth/logout", "POST"),
  },
  products: {
    getAll: () => request("/products"),
    getById: (id: string) => request(`/products/${id}`),
    getByCategory: (categoryId: string) => request(`/products/category/${categoryId}`),
  },
  categories: {
    getAll: () => request("/categories"),
  },
  orders: {
    create: (data: unknown) => request("/orders", "POST", data),
    getMyOrders: () => request("/orders", "GET"),
    getById: (id: number) => request(`/orders/${id}`, "GET"),
    getByCode: (orderCode: string) => request(`/orders/code/${orderCode}`, "GET"),
  },
  payments: {
    createPaymentIntent: (data: { orderId: number; currency?: string }) =>
      request("/payments/create-payment-intent", "POST", data),
    confirmSuccess: (paymentIntentId: string) =>
      request(`/payments/success?paymentIntentId=${paymentIntentId}`, "POST"),
    confirmFailure: (paymentIntentId: string) =>
      request(`/payments/failure?paymentIntentId=${paymentIntentId}`, "POST"),
  },
};
