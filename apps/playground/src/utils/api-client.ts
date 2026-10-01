/**
 * Git Academy Vietnam — Centralized Cloud API Client (Sprint 8)
 * Automatically connects to Render / Railway / Managed Backend via VITE_API_URL.
 */

export const API_BASE_URL: string =
  typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_API_URL
    ? (import.meta as any).env.VITE_API_URL.replace(/\/+$/, '')
    : (typeof import.meta !== 'undefined' && (import.meta as any).env?.DEV ? 'http://127.0.0.1:3001' : '');

export async function apiFetch<T = any>(
  path: string,
  options: RequestInit = {}
): Promise<{ ok: boolean; status: number; data?: T; error?: string }> {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const url = `${API_BASE_URL}${normalizedPath}`;

  const token = typeof localStorage !== 'undefined' ? localStorage.getItem('git_academy_token') : null;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };

  if (token && !headers['Authorization']) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const res = await fetch(url, {
      ...options,
      headers,
      credentials: 'include',
    });

    const isJson = res.headers.get('content-type')?.includes('application/json');
    const data = isJson ? await res.json() : await res.text();

    if (!res.ok) {
      return {
        ok: false,
        status: res.status,
        error: (data as any)?.message || (data as any)?.error || `HTTP ${res.status}`,
        data,
      };
    }

    return {
      ok: true,
      status: res.status,
      data,
    };
  } catch (err: any) {
    return {
      ok: false,
      status: 0,
      error: err.message || 'Lỗi kết nối tới máy chủ API',
    };
  }
}
