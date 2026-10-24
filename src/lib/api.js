const RAW_API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5003';
const BASE_URL = RAW_API_URL.replace(/\/+$/, '');

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
    try {
      const res = await fetch(buildUrl('/health'), { method: 'GET' });
      return res.ok;
    } catch {
      return false;
    }
  },

  get: async (endpoint) => {
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
    try {
      const headers = getHeaders();
      // Remove Content-Type so the browser automatically sets multipart/form-data boundary
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

