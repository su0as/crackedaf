import { ExternalLink, ArrowUp, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useStories } from '../context/StoryContext';
import { useAdmin } from '../context/AdminContext';
import { useAuth } from '../providers/AuthProvider';
import { AuthModal } from './AuthModal';
import type { Story } from '../types';
import { formatDistanceToNow } from 'date-fns';
import { useState } from 'react';

interface StoryItemProps {
  story: Story;
  rank: number;
  siliconValleyOnly: boolean;
}

export function StoryItem({ story, rank, siliconValleyOnly }: StoryItemProps) {
  const { title, url, score, time, category, isSiliconValley } = story;
  const { upvoteStory, removeStory } = useStories();
  const { isAdmin } = useAdmin();
  const { user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const hostname = url ? new URL(url).hostname : null;
  const timeAgo = formatDistanceToNow(new Date(time * 1000), { addSuffix: true });

  const handleUpvote = () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    upvoteStory(story.id, user.uid);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this story?')) {
      removeStory(story.id);
    }
  };

  const opacity = siliconValleyOnly && !isSiliconValley ? 'opacity-30' : 'opacity-100';

  return (
    <>
      <div className={`flex items-start space-x-2 py-2 border-b border-zinc-800 transition-all ${opacity} px-2`}>
        <span className="text-zinc-500 w-8 text-right font-inter">{rank}.</span>
        <button 
          onClick={handleUpvote}
          className="text-zinc-500 hover:text-white cursor-pointer transition-colors"
          title={user ? 'Upvote' : 'Sign in to upvote'}
        >
          <ArrowUp className="w-4 h-4" />
        </button>
        <div className="flex-1">
          <div className="flex items-baseline space-x-2 flex-wrap">
            <h2 className="text-base font-normal font-inter">
              {url ? (
                <a
                  href={url}
                  className="text-white hover:text-zinc-300 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {title}
                </a>
              ) : (
                <Link to={`/item/${story.id}`} className="text-white hover:text-zinc-300 transition-colors">
                  {title}
                </Link>
              )}
            </h2>
            {hostname && (
              <span className="text-xs text-zinc-500 flex items-center font-inter">
                <ExternalLink className="w-3 h-3 mr-1" />
                {hostname}
              </span>
            )}
            <span className="text-xs px-2 py-1 bg-zinc-800 rounded-full text-zinc-300 font-silkscreen">
              {category.replace('&', ' & ')}
            </span>
            {isAdmin && (
              <button
                onClick={handleDelete}
                className="text-red-500 hover:text-red-400 transition-colors ml-2"
                title="Delete story"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
          <div className="text-xs text-zinc-500 mt-1 font-inter">
            {score} points · {timeAgo}
          </div>
        </div>
      </div>
      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </>
  );
}