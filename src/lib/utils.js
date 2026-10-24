export { cn } from "cn";

// Safe backend base URL resolver
const getBackendBase = () => {
  const envUrl = (import.meta.env.VITE_API_URL || '').trim();
  const isHttpsPage = typeof window !== 'undefined' && window.location.protocol === 'https:';

  if (envUrl) {
    if (isHttpsPage && envUrl.includes('localhost')) return '';
    return envUrl.replace(/\/api\/?$/, '').replace(/\/+$/, '');
  }
  if (import.meta.env.DEV && !isHttpsPage) {
    return 'http://localhost:5003';
  }
  return '';
};

const BACKEND_BASE = getBackendBase();

// Inline SVG placeholder (Zero network calls, 100% offline-ready, no Mixed Content)
export const ATELIER_PLACEHOLDER =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="800" viewBox="0 0 600 800" fill="%23111"><rect width="600" height="800" fill="%23111111"/><text x="50%" y="49%" dominant-baseline="middle" text-anchor="middle" fill="%23444444" font-family="serif" font-size="20" letter-spacing="4">NOCTURNE</text><text x="50%" y="53%" dominant-baseline="middle" text-anchor="middle" fill="%232b2b2b" font-family="sans-serif" font-size="10" letter-spacing="3">ATELIER ARCHIVE</text></svg>';

/**
 * Resolves product image URLs cleanly.
 * If backend is not deployed/configured, returns clean inline atelier placeholder.
 */
export const getImageUrl = (image) => {
  if (!image || typeof image !== 'string') {
    return ATELIER_PLACEHOLDER;
  }
  if (image.startsWith('https://') || image.startsWith('data:')) {
    return image;
  }
  if (image.startsWith('http://')) {
    const isHttpsPage = typeof window !== 'undefined' && window.location.protocol === 'https:';
    if (isHttpsPage && image.includes('localhost')) {
      return ATELIER_PLACEHOLDER;
    }
    if (isHttpsPage) {
      return image.replace('http://', 'https://');
    }
    return image;
  }
  if (BACKEND_BASE) {
    const cleanFilename = image.replace(/^\/?(uploads\/)?/, '');
    return `${BACKEND_BASE}/uploads/${cleanFilename}`;
  }
  return ATELIER_PLACEHOLDER;
};

/**
 * Safe image error fallback (never calls localhost or insecure HTTP fallback)
 */
export const handleImageError = (e) => {
  if (e?.target && e.target.src !== ATELIER_PLACEHOLDER) {
    e.target.src = ATELIER_PLACEHOLDER;
  }
};
