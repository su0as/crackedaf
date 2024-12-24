import { useState } from 'react';
import { ref, push, get } from 'firebase/database';
import { db } from '../firebase';

export function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      // Check if email already exists
      const waitlistRef = ref(db, 'waitlist');
      const snapshot = await get(waitlistRef);
      const entries = snapshot.val() || {};
      
      const emailExists = Object.values(entries).some(
        (entry: any) => entry.email === email
      );

      if (emailExists) {
        setStatus('error');
        setErrorMessage('This email is already on the waitlist');
        return;
      }

      // Add new entry
      await push(waitlistRef, {
        email,
        timestamp: Date.now(),
        status: 'pending'
      });
      
      setStatus('success');
      setEmail('');
    } catch (error) {
      console.error('Waitlist error:', error);
      setStatus('error');
      setErrorMessage('Failed to join waitlist. Please try again.');
    }
  };

  return (
    <div className="bg-zinc-900 rounded-lg p-8 max-w-xl mx-auto border border-zinc-800">
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
            className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors"
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
          className="w-full bg-gradient-to-r from-amber-400 to-amber-500 text-black py-2 px-4 rounded-md hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed font-silkscreen"
        >
          {status === 'loading' ? 'JOINING...' : 'JOIN WAITLIST'}
        </button>
      </form>
    </div>
  );
}