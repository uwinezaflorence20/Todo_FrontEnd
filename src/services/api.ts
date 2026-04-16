const BASE_URL = import.meta.env.PROD
  ? 'https://backend-todo-list-8tnv.onrender.com'
  : '';

function getToken(): string {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No authentication token found. Please sign in again.');
  return token;
}

function authHeaders() {
  return {
    'accept': '*/*',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getToken()}`,
  };
}

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    if (res.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/auth';
      throw new Error('Session expired. Please sign in again.');
    }

    const statusMessages: Record<number, string> = {
      400: 'Invalid request. Please check your input.',
      403: 'You do not have permission to perform this action.',
      404: 'The requested resource was not found.',
      409: 'A conflict occurred. The resource may already exist.',
      422: 'Validation failed. Please check your input.',
      429: 'Too many requests. Please wait a moment and try again.',
      500: 'Server error. Please try again later.',
      503: 'Service unavailable. Please try again later.',
    };

    let message = statusMessages[res.status] || `Request failed (${res.status})`;
    try {
      const data = await res.json();
      message = data.message || data.error || message;
    } catch { /* ignore */ }
    throw new Error(message);
  }
  const text = await res.text();
  return text ? JSON.parse(text) : ({} as T);
}

// ─── Task Types ────────────────────────────────────────────────────────────────

export type TaskStatus = 'Pending' | 'Doing' | 'Done';

export interface Task {
  id: number;
  title: string;
  description?: string;
  category: string;
  status: TaskStatus;
  progress: number;
  dueDate?: string;
}

export interface CreateTaskPayload {
  title: string;
  description?: string;
  category: string;
  status: TaskStatus;
  progress: number;
  dueDate?: string;
}

export interface UpdateTaskPayload extends Partial<CreateTaskPayload> {}

// ─── Task API ──────────────────────────────────────────────────────────────────

export const taskApi = {
  getAll: async (): Promise<Task[]> => {
    const res = await fetch(`${BASE_URL}/api/tasks`, {
      headers: authHeaders(),
    });
    return handleResponse<Task[]>(res);
  },

  create: async (payload: CreateTaskPayload): Promise<Task> => {
    const res = await fetch(`${BASE_URL}/api/tasks`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(payload),
    });
    return handleResponse<Task>(res);
  },

  update: async (id: number, payload: UpdateTaskPayload): Promise<Task> => {
    const res = await fetch(`${BASE_URL}/api/tasks/${id}`, {
      method: 'PUT',
      headers: authHeaders(),
      body: JSON.stringify(payload),
    });
    return handleResponse<Task>(res);
  },

  delete: async (id: number): Promise<void> => {
    const res = await fetch(`${BASE_URL}/api/tasks/${id}`, {
      method: 'DELETE',
      headers: authHeaders(),
    });
    await handleResponse<void>(res);
  },
};

// ─── User Types ────────────────────────────────────────────────────────────────

export interface ApiUser {
  id: number;
  username: string;
  email: string;
  role: string;
}

export interface UpdateUserPayload {
  username?: string;
  email?: string;
  role?: string;
}

// ─── User API ──────────────────────────────────────────────────────────────────

export const userApi = {
  getAll: async (): Promise<ApiUser[]> => {
    const res = await fetch(`${BASE_URL}/api/users`, {
      headers: authHeaders(),
    });
    return handleResponse<ApiUser[]>(res);
  },

  update: async (id: number, payload: UpdateUserPayload): Promise<ApiUser> => {
    const res = await fetch(`${BASE_URL}/api/users/${id}`, {
      method: 'PUT',
      headers: authHeaders(),
      body: JSON.stringify(payload),
    });
    return handleResponse<ApiUser>(res);
  },

  delete: async (id: number): Promise<void> => {
    const res = await fetch(`${BASE_URL}/api/users/${id}`, {
      method: 'DELETE',
      headers: authHeaders(),
    });
    await handleResponse<void>(res);
  },
};
