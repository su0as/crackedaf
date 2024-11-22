import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import type { User } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

interface AuthContextType extends AuthState {
  login: (username: string, password: string) => Promise<void>;
  signup: (username: string, password: string) => Promise<void>;
  logout: () => void;
  getAnonymousId: () => string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const getStoredAnonymousId = () => {
  const storedId = localStorage.getItem('anonymousId');
  if (storedId) return storedId;
  
  const newId = `anon_${Math.random().toString(36).substr(2, 9)}`;
  localStorage.setItem('anonymousId', newId);
  return newId;
};

// Load users from localStorage
const loadUsers = () => {
  const stored = localStorage.getItem('users');
  return stored ? new Map(JSON.parse(stored)) : new Map();
};

// Save users to localStorage
const saveUsers = (users: Map<string, any>) => {
  localStorage.setItem('users', JSON.stringify(Array.from(users.entries())));
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState(() => loadUsers());
  const [authState, setAuthState] = useState<AuthState>(() => {
    const stored = localStorage.getItem('authState');
    return stored ? JSON.parse(stored) : { user: null, isAuthenticated: false };
  });

  // Persist auth state
  useEffect(() => {
    localStorage.setItem('authState', JSON.stringify(authState));
  }, [authState]);

  const login = async (username: string, password: string) => {
    const user = users.get(username);
    if (!user || user.password !== password) {
      throw new Error('Invalid username or password');
    }
    
    setAuthState({
      user: { id: username, karma: user.karma, created: user.created },
      isAuthenticated: true,
    });
  };

  const signup = async (username: string, password: string) => {
    if (users.has(username)) {
      throw new Error('Username already exists');
    }

    if (username.length < 3) {
      throw new Error('Username must be at least 3 characters');
    }

    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }

    const newUser = {
      password,
      karma: 1,
      created: Date.now() / 1000,
    };

    const updatedUsers = new Map(users);
    updatedUsers.set(username, newUser);
    setUsers(updatedUsers);
    saveUsers(updatedUsers);
    
    setAuthState({
      user: { id: username, karma: newUser.karma, created: newUser.created },
      isAuthenticated: true,
    });
  };

  const logout = () => {
    setAuthState({
      user: null,
      isAuthenticated: false,
    });
  };

  const getAnonymousId = () => {
    return getStoredAnonymousId();
  };

  return (
    <AuthContext.Provider value={{ 
      ...authState, 
      login, 
      signup, 
      logout, 
      getAnonymousId 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}