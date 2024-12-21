import { useState } from 'react';
import { useAuth } from '../providers/AuthProvider';
import { AuthModal } from './AuthModal';
import { LogOut } from 'lucide-react';

export function AuthButton() {
  const [showModal, setShowModal] = useState(false);
  const { user, logout, loading } = useAuth();

  if (loading) {
    return <div className="animate-pulse w-20 h-8 bg-zinc-800 rounded-md"></div>;
  }

  if (user) {
    return (
      <div className="flex items-center space-x-4">
        <span className="text-zinc-400 text-sm">{user.email}</span>
        <button
          onClick={() => logout()}
          className="text-zinc-400 hover:text-white transition-colors"
          title="Sign out"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="text-sm font-silkscreen text-amber-400 hover:text-amber-300 transition-colors"
      >
        SIGN IN
      </button>
      {showModal && <AuthModal onClose={() => setShowModal(false)} />}
    </>
  );
}