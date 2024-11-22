import { Link, useLocation } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';
import crackedafLogo from '/crackedaf.png';

interface HeaderProps {
  siliconValleyOnly: boolean;
  setSiliconValleyOnly: (value: boolean) => void;
}

export function Header({ siliconValleyOnly, setSiliconValleyOnly }: HeaderProps) {
  const location = useLocation();
  const { isAdmin } = useAdmin();

  return (
    <header className="bg-black border-b border-zinc-800">
      <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="group relative">
          <img src={crackedafLogo} alt="CrackedAF" className="h-8" />
          <span className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-black text-white px-4 py-2 rounded-md text-sm font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none border border-zinc-800">
            To be absolutely insane (really good) in a certain activity.
          </span>
        </Link>
        
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-4 text-sm font-normal font-silkscreen">
            <button
              onClick={() => setSiliconValleyOnly(!siliconValleyOnly)}
              className={`transition-colors ${
                siliconValleyOnly
                  ? 'text-white'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              SILICON VALLEY
            </button>
            <Link 
              to="/" 
              className={`transition-colors ${
                location.pathname === '/'
                  ? 'text-white'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              TOP
            </Link>
            <Link 
              to="/new" 
              className={`transition-colors ${
                location.pathname === '/new'
                  ? 'text-white'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              NEW
            </Link>
            <Link 
              to="/submit" 
              className={`transition-colors ${
                location.pathname === '/submit'
                  ? 'text-white'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              SUBMIT
            </Link>
            <a
              href="https://x.com/suhasxi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white transition-colors group relative"
            >
              X
              <span className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-black text-white px-4 py-2 rounded-md text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none border border-zinc-800 font-silkscreen">
                DOIN SOMETHING CRACKED! SEND A DM
              </span>
            </a>
          </div>
          
          {isAdmin && (
            <Link
              to="/admin"
              className="text-sm font-silkscreen transition-colors text-zinc-400 hover:text-white"
            >
              ADMIN
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}