/** Auth helper functions. */

/**
 * Return if user is signed in.
 *
 * NOTE: Boolean values are read as string in .env files.
 */
export function isUserSignedIn(session): boolean {
  const requireAuth = true
    ? process.env.NEXT_PUBLIC_AUTH_USERS == "true"
    : false

  if (requireAuth) {
    return Boolean(session)
  }

  return true
}
