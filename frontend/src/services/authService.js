const API_URL = import.meta.env.VITE_API_URL;

export async function loginWithGoogle(credential) {
  const response = await fetch(`${API_URL}/auth/google`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ credential }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);

    throw new Error(
      errorData?.message || 'Error iniciando sesión con Google',
    );
  }

  return response.json();
}

export async function getMe() {
  const token = getAccessToken();

  if (!token) {
    return null;
  }

  const response = await fetch(`${API_URL}/auth/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    logout();
    return null;
  }

  return response.json();
}

export function saveSession(data) {
  localStorage.setItem('accessToken', data.accessToken);
  localStorage.setItem('user', JSON.stringify(data.user));
}

export function getAccessToken() {
  return localStorage.getItem('accessToken');
}

export function getCurrentUser() {
  const user = localStorage.getItem('user');

  if (!user) {
    return null;
  }

  return JSON.parse(user);
}

export function logout() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('user');
}