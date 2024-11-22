import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';

export function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAdmin();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (login(username, password)) {
      navigate('/admin');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <main className="max-w-md mx-auto mt-16 px-4">
      <div className="bg-zinc-900 rounded-lg p-6">
        <h1 className="text-2xl mb-6 text-center font-silkscreen">ADMIN LOGIN</h1>
        
        {error && (
          <div className="mb-4 p-3 bg-red-900/50 text-red-200 rounded-md text-sm font-silkscreen">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm text-zinc-300 font-silkscreen">
              USERNAME
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full rounded-md bg-zinc-800 border-zinc-700 text-white shadow-sm focus:border-white focus:ring-white font-silkscreen"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm text-zinc-300 font-silkscreen">
              PASSWORD
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md bg-zinc-800 border-zinc-700 text-white shadow-sm focus:border-white focus:ring-white font-silkscreen"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-white text-black py-2 px-4 rounded-md hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-zinc-900 transition-colors font-silkscreen"
          >
            LOGIN
          </button>
        </form>
      </div>
    </main>
  );
}