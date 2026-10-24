export { cn } from "cn";

const RAW_API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5003';
const BACKEND_BASE = RAW_API_URL.replace(/\/api\/?$/, '').replace(/\/+$/, '');

/**
 * Resolves product image URLs.
 * If the image is a local filename (e.g. "oversized-trench-coat.jpg"),
 * it prepends the backend static uploads path (http://localhost:5003/uploads/...).
 * If it's already an external URL (http/https/data), it returns it as is.
 */
export const getImageUrl = (image) => {
  if (!image || typeof image !== 'string') {
    return `${BACKEND_BASE}/uploads/oversized-trench-coat.jpg`;
  }
  if (image.startsWith('http://') || image.startsWith('https://') || image.startsWith('data:')) {
    return image;
  }
  const cleanFilename = image.replace(/^\/?(uploads\/)?/, '');
  return `${BACKEND_BASE}/uploads/${cleanFilename}`;
};

/**
 * Fallback handler for broken image tags to load backend fallback
 */
export const handleImageError = (e) => {
  const fallback = `${BACKEND_BASE}/uploads/oversized-trench-coat.jpg`;
  if (e?.target && e.target.src !== fallback) {
    e.target.src = fallback;
  }
};
