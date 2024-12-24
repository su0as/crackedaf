import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStories } from '../context/StoryContext';
import { useAuth } from '../providers/AuthProvider';
import { X } from 'lucide-react';
import type { StoryCategory } from '../types';

const CATEGORIES: StoryCategory[] = ['HUMANS', 'CONTENT', 'PROJECTS', 'CHALLENGES&GRANTS', 'PARTIES&EVENTS'];

export function Submit() {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [category, setCategory] = useState<StoryCategory>('CONTENT');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { addStory } = useStories();
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setError('You must be logged in to submit a story');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      await addStory({
        title: title.trim(),
        url: url.trim(),
        category,
        authorId: user.uid,
        authorName: user.email || 'Anonymous'
      });
      navigate('/new');
    } catch (err) {
      console.error('Submit error:', err);
      setError(err instanceof Error ? err.message : 'Failed to submit story');
    } finally {
      setIsLoading(false);
    }
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const isSubmitDisabled = 
    isLoading || 
    !title.trim() || 
    !url.trim() || 
    !isValidUrl(url);

  return (
    <main className="max-w-2xl mx-auto mt-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-silkscreen text-white">SUBMIT STORY</h1>
        <button
          onClick={() => navigate('/new')}
          className="text-zinc-400 hover:text-white transition-colors"
          title="Close"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-900/50 text-red-200 rounded-md text-sm border border-red-800">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="category" className="block text-sm font-silkscreen text-zinc-300">
            CATEGORY
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value as StoryCategory)}
            className="mt-1 block w-full rounded-md bg-zinc-800 border-zinc-700 text-white shadow-sm focus:border-white focus:ring-white font-silkscreen"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat} className="font-silkscreen">
                {cat.replace('&', ' & ')}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="title" className="block text-sm font-silkscreen text-zinc-300">
            TITLE
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md bg-zinc-800 border-zinc-700 text-white shadow-sm focus:border-white focus:ring-white font-inter"
            required
            maxLength={80}
          />
          <p className="mt-1 text-sm text-zinc-500 font-inter">
            {80 - title.length} characters remaining
          </p>
        </div>

        <div>
          <label htmlFor="url" className="block text-sm font-silkscreen text-zinc-300">
            URL
          </label>
          <input
            type="url"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="mt-1 block w-full rounded-md bg-zinc-800 border-zinc-700 text-white shadow-sm focus:border-white focus:ring-white font-inter"
            placeholder="https://"
            required
          />
          {url && !isValidUrl(url) && (
            <p className="mt-1 text-sm text-red-400 font-inter">Please enter a valid URL</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitDisabled}
          className="w-full bg-white text-black py-2 px-4 rounded-md hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-silkscreen"
        >
          {isLoading ? 'SUBMITTING...' : 'SUBMIT'}
        </button>
      </form>
    </main>
  );
}