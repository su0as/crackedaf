import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export function WaitlistBanner() {
  return (
    <Link 
      to="/breakout" 
      className="block bg-amber-400 py-1.5 mt-14 border-y border-amber-500/20"
    >
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap">
          <Sparkles className="w-3.5 h-3.5 text-black flex-shrink-0" />
          <p className="text-black font-silkscreen text-xs md:text-sm truncate">
            Join Breakout AI waitlist - Get early access to latest funded startups with high growth potential
          </p>
          <ArrowRight className="w-3.5 h-3.5 text-black flex-shrink-0" />
        </div>
      </div>
    </Link>
  );
}