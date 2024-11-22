import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { ArrowLeft, ExternalLink, ArrowUp, MessageSquare } from 'lucide-react';
import { useStories } from '../context/StoryContext';
import { useAuth } from '../context/AuthContext';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { CommentThread } from '../components/CommentThread';
import type { Story as StoryType } from '../types';

export function StoryDetails() {
  const { id } = useParams();
  const { stories, upvoteStory } = useStories();
  const { isAuthenticated, user, getAnonymousId } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  const story = stories.find(s => s.id === id);
  const userId = isAuthenticated ? user?.id : getAnonymousId();
  const hasUpvoted = story ? story.upvotedBy.includes(userId) : false;

  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <LoadingSpinner />;
  if (!story) return <div className="text-center mt-8">Story not found</div>;

  const { title, url, score, by, time, comments, category } = story;
  const hostname = url ? new URL(url).hostname : null;
  const timeAgo = formatDistanceToNow(new Date(time * 1000), { addSuffix: true });

  return (
    <main className="max-w-3xl mx-auto px-4 py-6">
      <Link to="/" className="inline-flex items-center text-zinc-400 hover:text-white mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to stories
      </Link>

      <div className="bg-zinc-900 rounded-lg p-6 mb-6">
        <div className="flex items-start space-x-4">
          <button 
            onClick={() => upvoteStory(story.id)}
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
              {score} points by{' '}
              <Link to={`/user/${by}`} className="hover:text-white">
                {by}
              </Link>{' '}
              {timeAgo}
              <span className="mx-2">·</span>
              <span className="inline-flex items-center">
                <MessageSquare className="w-4 h-4 mr-1" />
                {comments} comments
              </span>
              <span className="mx-2">·</span>
              <span className="px-2 py-1 bg-zinc-800 rounded-full text-xs">
                {category.replace('&', ' & ')}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <CommentThread storyId={story.id} />
      </div>
    </main>
  );
}