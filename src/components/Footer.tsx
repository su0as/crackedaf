import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="fixed bottom-16 left-0 right-0 bg-black border-t border-zinc-800 py-4">
      <div className="max-w-6xl mx-auto px-4 flex justify-center space-x-6 text-sm font-silkscreen">
        <Link to="/privacy-policy" className="text-zinc-400 hover:text-white transition-colors">
          PRIVACY
        </Link>
        <Link to="/terms" className="text-zinc-400 hover:text-white transition-colors">
          TERMS
        </Link>
        <Link to="/refund" className="text-zinc-400 hover:text-white transition-colors">
          REFUND
        </Link>
      </div>
    </footer>
  );
}