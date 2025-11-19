export interface JwtPayload {
  unique_name?: string; /*ClaimTypes.Name*/ 
  role?: string; /**ClaimTypes.Role */
  exp?: number; /**fecha de expiración del token (en formato UNIX timestamp). */
}