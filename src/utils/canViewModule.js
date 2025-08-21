// utils/permissions.js

/**
 * Checks if a user can view a module based on site host
 * - Superadmin -> always true
 * - Admin -> only if the given site host is assigned
 *
 * @param {Object} user - auth object
 * @param {string} siteHost - site host to check (e.g. "meatatag.com")
 * @returns {boolean}
 */
export function canViewModule(user, siteHost) {
  if (!user) return false;

  // Superadmin always has access
  if (user.isSuperAdmin) return true;

  // Admin: check if site with given host is assigned
  if (Array.isArray(user.allSites)) {
    return user.allSites.some((site) => site.host?.toLowerCase() === siteHost.toLowerCase());
  }

  return false;
}
