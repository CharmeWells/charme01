/** Calls the authentication API and always includes the HttpOnly session cookie. */
export type User = { id: number; username: string; display_name: string; created_at: string }
const API_BASE = import.meta.env.VITE_API_URL ?? ''

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_BASE}/api/auth${path}`, { ...options, credentials: 'include', headers: { 'Content-Type': 'application/json', ...options.headers } })
  if (!response.ok) {
    const body = await response.json().catch(() => null)
    throw new Error(typeof body?.detail === 'string' ? body.detail : '请求失败，请稍后重试')
  }
  return response.status === 204 ? undefined as T : response.json()
}

export const authApi = {
  register: (username: string, password: string, confirmPassword: string) => request<{ user: User }>('/register', { method: 'POST', body: JSON.stringify({ username, password, confirm_password: confirmPassword }) }),
  login: (username: string, password: string) => request<{ user: User }>('/login', { method: 'POST', body: JSON.stringify({ username, password }) }),
  me: () => request<User>('/me'),
  logout: () => request<void>('/logout', { method: 'POST' }),
}
