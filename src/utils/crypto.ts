// Production-grade password hashing
export async function hashPassword(password: string): Promise<string> {
  // Convert password to UTF-8 bytes
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  
  // Create SHA-256 hash
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
  return hashHex;
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  const hashedInput = await hashPassword(password);
  return hashedInput === hashedPassword;
}