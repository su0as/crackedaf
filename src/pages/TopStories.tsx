import { useState } from 'react';
import { Link } from 'react-router-dom';
import { StoryItem } from '../components/StoryItem';
import { useStories } from '../context/StoryContext';
import type { StoryCategory } from '../types';

const CATEGORIES: StoryCategory[] = ['ALL', 'HUMANS', 'CONTENT', 'PROJECTS', 'CHALLENGES&GRANTS', 'PARTIES&EVENTS'];

interface TopStoriesProps {
  siliconValleyOnly: boolean;
  view: 'top' | 'new';
}

export function TopStories({ siliconValleyOnly, view }: TopStoriesProps) {
  const { filterStoriesByCategory, getLatestStories } = useStories();
  const [selectedCategory, setSelectedCategory] = useState<StoryCategory>('ALL');
  const [page, setPage] = useState(1);
  const storiesPerPage = 30;
  
  const stories = view === 'new'
    ? filterStoriesByCategory(selectedCategory, siliconValleyOnly, true)
    : filterStoriesByCategory(selectedCategory, siliconValleyOnly, false);
    
  const paginatedStories = stories.slice((page - 1) * storiesPerPage, page * storiesPerPage);
  const hasMore = stories.length > page * storiesPerPage;

  return (
    <main className="max-w-3xl mx-auto px-4 py-6">
      <div className="mb-6 inline-flex flex-wrap gap-2">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => {
              setSelectedCategory(category);
              setPage(1);
            }}
            className={`px-3 py-1 rounded-full text-sm font-silkscreen transition-colors whitespace-nowrap ${
              selectedCategory === category
                ? 'bg-white text-black'
                : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
            }`}
          >
            {category.replace('&', ' & ')}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {paginatedStories.map((story, index) => (
          <StoryItem 
            key={story.id} 
            story={story} 
            rank={(page - 1) * storiesPerPage + index + 1}
            siliconValleyOnly={siliconValleyOnly}
          />
        ))}
      </div>
      
      <div className="mt-6 flex justify-between">
        {page > 1 && (
          <button
            onClick={() => setPage(p => p - 1)}
            className="text-white hover:text-zinc-300 transition-colors font-silkscreen"
          >
            PREVIOUS
          </button>
        )}
        <div className="flex items-center space-x-4 text-xs font-silkscreen">
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
        {hasMore && (
          <button
            onClick={() => setPage(p => p + 1)}
            className="ml-auto text-white hover:text-zinc-300 transition-colors font-silkscreen"
          >
            MORE
          </button>
        )}
      </div>
    </main>
  );
}