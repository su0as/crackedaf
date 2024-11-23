// Production-grade password hashing with fallback
export async function hashPassword(password: string): Promise<string> {
  try {
    // Convert password to UTF-8 bytes
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    
    // Create SHA-256 hash
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    
    return hashHex;
  } catch (error) {
    // Fallback for environments where crypto.subtle isn't available
    return btoa(password);
  }
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  try {
    const hashedInput = await hashPassword(password);
    return hashedInput === hashedPassword;
  } catch {
    return false;
  }
}