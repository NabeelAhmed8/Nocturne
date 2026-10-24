// Determine API URL safely:
// In browser on HTTPS, never fallback to insecure http://localhost (prevents Mixed Content).
// In local development (http://localhost:5173), fallback to http://localhost:5003 for dev convenience.
const getBaseApiUrl = () => {
  const envUrl = (import.meta.env.VITE_API_URL || '').trim();
  const isHttpsPage = typeof window !== 'undefined' && window.location.protocol === 'https:';

  if (envUrl) {
    if (isHttpsPage && envUrl.startsWith('http://') && !envUrl.includes('localhost')) {
      return envUrl.replace('http://', 'https://').replace(/\/+$/, '');
    }
    if (isHttpsPage && envUrl.includes('localhost')) {
      return '';
    }
    return envUrl.replace(/\/+$/, '');
  }

  if (import.meta.env.DEV && !isHttpsPage) {
    return 'http://localhost:5003';
  }

  return '';
};

const BASE_URL = getBaseApiUrl();
export const isBackendConfigured = Boolean(BASE_URL);

const buildUrl = (endpoint = '') => {
  if (!endpoint) return BASE_URL;
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${BASE_URL}${cleanEndpoint}`;
};

const getHeaders = () => {
  const headers = {
    'Content-Type': 'application/json',
  };

  try {
    const storage = localStorage.getItem('nocturne-storage');
    if (storage) {
      const parsed = JSON.parse(storage);
      if (parsed?.state?.user?.token) {
        headers['Authorization'] = `Bearer ${parsed.state.user.token}`;
      }
    }
  } catch {
    // Ignore JSON parse errors
  }

  return headers;
};

// Safe wrapper to detect if backend server is offline
const handleFetchError = (err) => {
  if (
    err.name === 'TypeError' ||
    err.message?.toLowerCase().includes('fetch') ||
    err.message?.toLowerCase().includes('network') ||
    err.message?.toLowerCase().includes('failed to fetch')
  ) {
    throw new Error('Server is offline');
  }
  throw err;
};

export const api = {
  checkHealth: async () => {
    if (!isBackendConfigured) return false;
    try {
      const res = await fetch(buildUrl('/health'), { method: 'GET' });
      return res.ok;
    } catch {
      return false;
    }
  },

  get: async (endpoint) => {
    if (!isBackendConfigured) {
      throw new Error('Server is offline');
    }
    try {
      const res = await fetch(buildUrl(endpoint), {
        method: 'GET',
        headers: getHeaders(),
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || `Request failed with status ${res.status}`);
      }
      return await res.json();
    } catch (err) {
      handleFetchError(err);
    }
  },

  post: async (endpoint, data) => {
    if (!isBackendConfigured) {
      throw new Error('Server is offline');
    }
    try {
      const res = await fetch(buildUrl(endpoint), {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || `Request failed with status ${res.status}`);
      }
      return await res.json();
    } catch (err) {
      handleFetchError(err);
    }
  },

  put: async (endpoint, data) => {
    if (!isBackendConfigured) {
      throw new Error('Server is offline');
    }
    try {
      const res = await fetch(buildUrl(endpoint), {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || `Request failed with status ${res.status}`);
      }
      return await res.json();
    } catch (err) {
      handleFetchError(err);
    }
  },

  delete: async (endpoint) => {
    if (!isBackendConfigured) {
      throw new Error('Server is offline');
    }
    try {
      const res = await fetch(buildUrl(endpoint), {
        method: 'DELETE',
        headers: getHeaders(),
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || `Request failed with status ${res.status}`);
      }
      return await res.json();
    } catch (err) {
      handleFetchError(err);
    }
  },

  upload: async (endpoint, formData) => {
    if (!isBackendConfigured) {
      throw new Error('Server is offline');
    }
    try {
      const headers = getHeaders();
      delete headers['Content-Type'];
      const res = await fetch(buildUrl(endpoint), {
        method: 'POST',
        headers,
        body: formData,
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || `Upload failed with status ${res.status}`);
      }
      return await res.json();
    } catch (err) {
      handleFetchError(err);
    }
  },
};
