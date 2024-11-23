import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { storage } from '../utils/storage';
import { hashPassword, verifyPassword } from '../utils/crypto';

interface AdminContextType {
  isAdmin: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

// Default admin credentials for development
const DEFAULT_ADMIN = {
  username: 'admin',
  password: 'admin'
};

// Get admin credentials from environment variables or use defaults
const ADMIN_USERNAME = import.meta.env.VITE_ADMIN_USERNAME || DEFAULT_ADMIN.username;
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || DEFAULT_ADMIN.password;

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [hashedPassword, setHashedPassword] = useState<string | null>(null);

  // Initialize hashed password
  useEffect(() => {
    const initializeHash = async () => {
      try {
        const hashed = await hashPassword(ADMIN_PASSWORD);
        setHashedPassword(hashed);
        
        // Check for existing valid token
        const token = storage.get('adminToken');
        if (token) {
          setIsAdmin(verifyAdminToken(token));
        }
      } catch (error) {
        console.error('Failed to initialize admin hash:', error);
      }
    };
    
    initializeHash();
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      if (!hashedPassword) {
        throw new Error('Admin system not initialized');
      }

      if (username === ADMIN_USERNAME && await verifyPassword(password, hashedPassword)) {
        const token = generateAdminToken();
        storage.set('adminToken', token);
        setIsAdmin(true);
        return true;
      }
    } catch (error) {
      console.error('Login failed:', error);
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
  const tokenData = {
    username: ADMIN_USERNAME,
    timestamp: Date.now(),
    nonce: Array.from(crypto.getRandomValues(new Uint8Array(16)))
      .map(b => b.toString(16).padStart(2, '0'))
      .join(''),
    version: '1.0'
  };
  
  return btoa(JSON.stringify(tokenData));
}

function verifyAdminToken(token: string): boolean {
  try {
    const decoded = JSON.parse(atob(token));
    const tokenAge = Date.now() - decoded.timestamp;
    const maxAge = 12 * 60 * 60 * 1000; // 12 hours
    
    // Validate token format and version
    if (!decoded.version || decoded.version !== '1.0') {
      return false;
    }

    // Validate token age
    if (tokenAge > maxAge) {
      storage.remove('adminToken');
      return false;
    }

    return decoded.username === ADMIN_USERNAME;
  } catch {
    return false;
  }
}