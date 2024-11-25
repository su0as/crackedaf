import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStories } from '../context/StoryContext';
import type { StoryCategory } from '../types';
import { CheckCircle2 } from 'lucide-react';

const CATEGORIES: StoryCategory[] = ['HUMANS', 'CONTENT', 'PROJECTS', 'CHALLENGES&GRANTS', 'PARTIES&EVENTS'];

export function Submit() {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [category, setCategory] = useState<StoryCategory>('CONTENT');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  const { addStory } = useStories();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      addStory({
        title: title.trim(),
        url: url.trim() || undefined,
        category
      });
      setIsSubmitted(true);
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit story');
      setIsSubmitted(false);
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

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto mt-16 px-4 text-center">
        <div className="bg-zinc-900 rounded-lg p-8">
          <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-xl font-silkscreen mb-4">SUBMISSION RECEIVED</h2>
          <p className="text-zinc-400 mb-6">
            Your submission is pending admin approval. Once approved, it will appear on the site.
          </p>
          <p className="text-zinc-500 text-sm">
            Redirecting to homepage...
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="max-w-2xl mx-auto mt-8 px-4">
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4 mb-6">
        <p className="text-zinc-400 text-sm font-silkscreen">
          NOTE: ALL SUBMISSIONS REQUIRE ADMIN REVIEW BEFORE APPEARING ON THE SITE
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-900/50 text-red-200 rounded-md text-sm border border-red-800">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="category" className="block text-sm font-['Silkscreen'] text-zinc-300">
            CATEGORY
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value as StoryCategory)}
            className="mt-1 block w-full rounded-md bg-zinc-800 border-zinc-700 text-white shadow-sm focus:border-white focus:ring-white font-['Silkscreen']"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat} className="font-['Silkscreen']">
                {cat.replace('&', ' & ')}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="title" className="block text-sm font-['Silkscreen'] text-zinc-300">
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
          <label htmlFor="url" className="block text-sm font-['Silkscreen'] text-zinc-300">
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
          className="w-full bg-white text-black py-2 px-4 rounded-md hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-['Silkscreen']"
        >
          {isLoading ? 'SUBMITTING...' : 'SUBMIT'}
        </button>
      </form>
    </main>
  );
}