import { useLocation } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';
import { AuthModal } from './AuthModal';

interface RequireAuthProps {
  children: React.ReactNode;
}

export function RequireAuth({ children }: RequireAuthProps) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="animate-pulse w-full h-32 bg-zinc-800 rounded-md"></div>;
  }

  if (!user) {
    return <AuthModal onClose={() => {}} />;
  }

  return <>{children}</>;
}