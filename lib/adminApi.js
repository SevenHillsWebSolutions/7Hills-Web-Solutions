/**
 * lib/adminApi.js
 * Wrapper around fetch for admin portal calls.
 * If any call returns 401 Unauthorized, automatically redirects to /admin/login.
 */
export async function adminFetch(url, options = {}) {
  try {
    const res = await fetch(url, options);
    if (res.status === 401) {
      if (typeof window !== 'undefined') {
        const currentPath = window.location.pathname;
        if (currentPath !== '/admin/login') {
          window.location.href = '/admin/login?redirect=' + encodeURIComponent(currentPath);
        }
      }
    }
    return res;
  } catch (err) {
    console.error('adminFetch network error:', err);
    throw err;
  }
}
