// Simple password hashing and verification
// In a production environment, use a proper hashing library like bcrypt
export function hashPassword(password: string): string {
  return btoa(password); // Basic encoding for demo purposes
}

export function verifyPassword(password: string, hashedPassword: string): boolean {
  return hashPassword(password) === hashedPassword;
}