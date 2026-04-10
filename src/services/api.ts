const BASE_URL = 'https://backend-todo-list-8tnv.onrender.com';

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
    let message = `Request failed: ${res.statusText}`;
    try {
      const data = await res.json();
      message = data.message || message;
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
