import { useState } from 'react';
import { ref, push } from 'firebase/database';
import { db } from '../firebase';

export function Breakout() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const waitlistRef = ref(db, 'waitlist');
      await push(waitlistRef, {
        email,
        timestamp: Date.now(),
      });
      
      setStatus('success');
      setEmail('');
    } catch (error) {
      setStatus('error');
      setErrorMessage('Failed to join waitlist. Please try again.');
    }
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 font-silkscreen bg-gradient-to-r from-orange-500 to-pink-500 text-transparent bg-clip-text">
          BREAKOUT LEADS
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
          Get exclusive access to recently funded companies, upcoming breakouts, and high-impact opportunities.
          Join our waitlist to be the first to know when we launch.
        </p>
      </div>

      <div className="bg-zinc-900 rounded-lg p-8 max-w-xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-silkscreen text-zinc-300 mb-2">
              EMAIL ADDRESS
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500 transition-colors"
              required
            />
          </div>

          {status === 'error' && (
            <div className="text-red-500 text-sm">{errorMessage}</div>
          )}

          {status === 'success' && (
            <div className="bg-green-900/20 border border-green-900 text-green-300 px-4 py-2 rounded-md">
              Thanks for joining! We'll notify you when we launch.
            </div>
          )}

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-2 px-4 rounded-md hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed font-silkscreen"
          >
            {status === 'loading' ? 'JOINING...' : 'JOIN WAITLIST'}
          </button>
        </form>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-zinc-900 p-6 rounded-lg">
          <h3 className="text-lg font-silkscreen mb-2 text-orange-500">FUNDED COMPANIES</h3>
          <p className="text-zinc-400">
            Get insights into recently funded startups and their growth trajectories.
          </p>
        </div>
        <div className="bg-zinc-900 p-6 rounded-lg">
          <h3 className="text-lg font-silkscreen mb-2 text-pink-500">BREAKOUT POTENTIAL</h3>
          <p className="text-zinc-400">
            Discover companies on the verge of explosive growth and market disruption.
          </p>
        </div>
        <div className="bg-zinc-900 p-6 rounded-lg">
          <h3 className="text-lg font-silkscreen mb-2 text-purple-500">HIGH IMPACT</h3>
          <p className="text-zinc-400">
            Track companies making significant waves in their industries.
          </p>
        </div>
      </div>
    </main>
  );
}