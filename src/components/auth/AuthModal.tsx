import { useState } from 'react';
import { X, Mail, Lock, LogIn } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface AuthModalProps {
  onClose: () => void;
  mode?: 'signin' | 'signup';
}

export function AuthModal({ onClose, mode = 'signin' }: AuthModalProps) {
  const [isSignIn, setIsSignIn] = useState(mode === 'signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signInWithGoogle, signInWithEmail, signUpWithEmail, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignIn) {
      await signInWithEmail(email, password);
    } else {
      await signUpWithEmail(email, password);
    }
    if (!error) onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-zinc-900 rounded-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-zinc-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-silkscreen mb-6 text-amber-400">
          {isSignIn ? 'SIGN IN' : 'CREATE ACCOUNT'}
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-900/50 text-red-200 rounded-md text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-silkscreen text-zinc-300 mb-2">
              EMAIL
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white focus:outline-none focus:border-amber-400"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-silkscreen text-zinc-300 mb-2">
              PASSWORD
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white focus:outline-none focus:border-amber-400"
                required
                minLength={6}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-amber-400 text-black py-2 px-4 rounded-md hover:bg-amber-300 transition-colors font-silkscreen flex items-center justify-center space-x-2"
          >
            <LogIn className="w-5 h-5" />
            <span>{isSignIn ? 'SIGN IN' : 'CREATE ACCOUNT'}</span>
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-800"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-zinc-900 text-zinc-400 font-silkscreen">
                OR
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={signInWithGoogle}
            className="w-full bg-white text-black py-2 px-4 rounded-md hover:bg-zinc-100 transition-colors font-silkscreen flex items-center justify-center space-x-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span>CONTINUE WITH GOOGLE</span>
          </button>

          <div className="text-center mt-4">
            <button
              type="button"
              onClick={() => setIsSignIn(!isSignIn)}
              className="text-amber-400 hover:text-amber-300 transition-colors text-sm font-silkscreen"
            >
              {isSignIn ? 'CREATE AN ACCOUNT' : 'ALREADY HAVE AN ACCOUNT?'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}