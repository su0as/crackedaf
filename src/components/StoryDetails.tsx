import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { ArrowLeft, ExternalLink, ArrowUp } from 'lucide-react';
import { useStories } from '../context/StoryContext';
import { storage } from '../utils/storage';
import { LoadingSpinner } from '../components/LoadingSpinner';
import type { Story as StoryType } from '../types';

export function StoryDetails() {
  const { id } = useParams();
  const { stories, upvoteStory } = useStories();
  const [isLoading, setIsLoading] = useState(true);

  const story = stories.find(s => s.id === id);
  const hasUpvoted = story ? storage.hasUpvoted(story.id) : false;

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleUpvote = () => {
    if (story && !hasUpvoted) {
      upvoteStory(story.id);
      storage.addUpvote(story.id);
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (!story) return <div className="text-center mt-8">Story not found</div>;

  const { title, url, score, time, category } = story;
  const hostname = url ? new URL(url).hostname : null;
  const timeAgo = formatDistanceToNow(new Date(time * 1000), { addSuffix: true });

  return (
    <main className="max-w-3xl mx-auto px-4 py-6">
      <Link to="/" className="inline-flex items-center text-zinc-400 hover:text-white mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to stories
      </Link>

      <div className="bg-zinc-900 rounded-lg p-6">
        <div className="flex items-start space-x-4">
          <button 
            onClick={handleUpvote}
            disabled={hasUpvoted}
            className={`${
              hasUpvoted 
                ? 'text-orange-500 cursor-not-allowed' 
                : 'text-zinc-500 hover:text-white cursor-pointer'
            } transition-colors pt-1`}
            title={hasUpvoted ? 'Already upvoted' : 'Upvote'}
          >
            <ArrowUp className="w-5 h-5" />
          </button>

          <div className="flex-1">
            <div className="flex items-baseline space-x-2 flex-wrap">
              <h1 className="text-xl font-semibold text-white">
                {url ? (
                  <a
                    href={url}
                    className="hover:text-zinc-300 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {title}
                  </a>
                ) : (
                  title
                )}
              </h1>
              {hostname && (
                <span className="text-sm text-zinc-500 flex items-center">
                  <ExternalLink className="w-4 h-4 mr-1" />
                  {hostname}
                </span>
              )}
            </div>

            <div className="mt-2 text-sm text-zinc-400">
              {score} points · {timeAgo}
              <span className="mx-2">·</span>
              <span className="px-2 py-1 bg-zinc-800 rounded-full text-xs">
                {category.replace('&', ' & ')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}