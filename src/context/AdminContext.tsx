import { createContext, useContext, useState, ReactNode } from 'react';
import { storage } from '../utils/storage';
import { hashPassword, verifyPassword } from '../utils/crypto';

interface AdminContextType {
  isAdmin: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

// Get admin credentials from environment variables
const ADMIN_USERNAME = import.meta.env.VITE_ADMIN_USERNAME;
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

// Hash the admin password for secure storage
const HASHED_ADMIN_PASSWORD = hashPassword(ADMIN_PASSWORD);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(() => {
    const token = storage.get('adminToken');
    return token ? verifyAdminToken(token) : false;
  });

  const login = (username: string, password: string) => {
    if (username === ADMIN_USERNAME && verifyPassword(password, HASHED_ADMIN_PASSWORD)) {
      const token = generateAdminToken();
      storage.set('adminToken', token);
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    storage.remove('adminToken');
    setIsAdmin(false);
  };

  return (
    <AdminContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}

// Helper functions for token management
function generateAdminToken(): string {
  return btoa(JSON.stringify({
    username: ADMIN_USERNAME,
    timestamp: Date.now(),
    // Add additional security measures as needed
  }));
}

function verifyAdminToken(token: string): boolean {
  try {
    const decoded = JSON.parse(atob(token));
    const tokenAge = Date.now() - decoded.timestamp;
    // Token expires after 24 hours
    return decoded.username === ADMIN_USERNAME && tokenAge < 24 * 60 * 60 * 1000;
  } catch {
    return false;
  }
}