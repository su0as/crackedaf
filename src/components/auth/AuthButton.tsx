import { useState } from 'react';
import { LogIn, LogOut, User } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { AuthModal } from './AuthModal';

export function AuthButton() {
  const [showModal, setShowModal] = useState(false);
  const { user, logout } = useAuth();

  if (user) {
    return (
      <div className="relative group">
        <button className="flex items-center space-x-2 text-zinc-400 hover:text-white transition-colors">
          <User className="w-5 h-5" />
          <span className="font-silkscreen">{user.email?.split('@')[0]}</span>
        </button>
        <div className="absolute right-0 mt-2 w-48 bg-zinc-900 rounded-md shadow-lg py-1 hidden group-hover:block">
          <button
            onClick={logout}
            className="flex items-center w-full px-4 py-2 text-sm text-zinc-400 hover:text-white transition-colors"
          >
            <LogOut className="w-4 h-4 mr-2" />
            <span className="font-silkscreen">SIGN OUT</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="flex items-center space-x-2 text-zinc-400 hover:text-white transition-colors"
      >
        <LogIn className="w-5 h-5" />
        <span className="font-silkscreen">SIGN IN</span>
      </button>
      {showModal && <AuthModal onClose={() => setShowModal(false)} />}
    </>
  );
}