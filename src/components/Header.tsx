import { Link, useLocation } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';
import { Menu, X, Rocket } from 'lucide-react';
import { useState } from 'react';
import { AuthButton } from './auth/AuthButton';
import crackedafLogo from '/crackedaf.png';

export function Header({ siliconValleyOnly, setSiliconValleyOnly }: {
  siliconValleyOnly: boolean;
  setSiliconValleyOnly: (value: boolean) => void;
}) {
  const location = useLocation();
  const { isAdmin } = useAdmin();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-black border-b border-zinc-800 fixed top-0 left-0 right-0 z-50">
      <nav className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/new" className="group relative">
            <img src={crackedafLogo} alt="CrackedAF" className="h-8" />
            <span className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-black text-white px-4 py-2 rounded-md text-sm font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none border border-zinc-800">
              To be absolutely insane (really good) in a certain activity.
            </span>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-4 text-sm font-normal font-silkscreen">
              <Link 
                to="/breakout"
                className="text-amber-400 hover:text-amber-300 transition-colors flex items-center space-x-1"
              >
                <span>BREAKOUT</span>
                
              </Link>
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
                to="/top" 
                className={`transition-colors ${
                  location.pathname === '/top'
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
            
            <AuthButton />
            {isAdmin && (
              <Link
                to="/admin"
                className="text-sm font-silkscreen transition-colors text-zinc-400 hover:text-white"
              >
                ADMIN
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-3 pb-3 font-silkscreen">
            <Link
              to="/breakout"
              onClick={() => setIsMenuOpen(false)}
              className="block w-full text-left px-2 py-1 text-amber-400 hover:text-amber-300 flex items-center space-x-1"
            >
              
              <span>BREAKOUT</span>
            </Link>
            <button
              onClick={() => {
                setSiliconValleyOnly(!siliconValleyOnly);
                setIsMenuOpen(false);
              }}
              className={`block w-full text-left px-2 py-1 ${
                siliconValleyOnly ? 'text-white' : 'text-zinc-400'
              }`}
            >
              SILICON VALLEY
            </button>
            <Link
              to="/top"
              onClick={() => setIsMenuOpen(false)}
              className={`block px-2 py-1 ${
                location.pathname === '/top' ? 'text-white' : 'text-zinc-400'
              }`}
            >
              TOP
            </Link>
            <Link
              to="/new"
              onClick={() => setIsMenuOpen(false)}
              className={`block px-2 py-1 ${
                location.pathname === '/new' ? 'text-white' : 'text-zinc-400'
              }`}
            >
              NEW
            </Link>
            <Link
              to="/submit"
              onClick={() => setIsMenuOpen(false)}
              className={`block px-2 py-1 ${
                location.pathname === '/submit' ? 'text-white' : 'text-zinc-400'
              }`}
            >
              SUBMIT
            </Link>
            <a
              href="https://x.com/suhasxi"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMenuOpen(false)}
              className="block px-2 py-1 text-zinc-400"
            >
              X
            </a>
            <div className="px-2 py-1">
              <AuthButton />
            </div>
            {isAdmin && (
              <Link
                to="/admin"
                onClick={() => setIsMenuOpen(false)}
                className="block px-2 py-1 text-zinc-400"
              >
                ADMIN
              </Link>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}