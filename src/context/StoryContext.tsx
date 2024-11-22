import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Story, StoryCategory } from '../types';
import { storage } from '../utils/storage';

interface StoryContextType {
  stories: Story[];
  pendingStories: Story[];
  addStory: (story: Omit<Story, 'id' | 'time' | 'score' | 'approved' | 'isSiliconValley'>) => void;
  removeStory: (id: string) => void;
  approveStory: (id: string, isSiliconValley: boolean) => void;
  rejectStory: (id: string) => void;
  upvoteStory: (id: string) => void;
  filterStoriesByCategory: (category: StoryCategory, siliconValleyOnly: boolean) => Story[];
  getLatestStories: (siliconValleyOnly: boolean) => Story[];
}

const StoryContext = createContext<StoryContextType | undefined>(undefined);

const INITIAL_STORIES: Story[] = [
  {
    id: '1',
    title: 'Welcome to Our News Platform',
    url: 'https://example.com',
    score: 42,
    time: Date.now() / 1000,
    category: 'CONTENT',
    approved: true,
    isSiliconValley: false
  }
];

export function StoryProvider({ children }: { children: ReactNode }) {
  const [stories, setStories] = useState<Story[]>(() => {
    const stored = storage.get('stories');
    return stored || INITIAL_STORIES;
  });

  const [pendingStories, setPendingStories] = useState<Story[]>(() => {
    const stored = storage.get('pendingStories');
    return stored || [];
  });

  useEffect(() => {
    storage.set('stories', stories);
    storage.set('pendingStories', pendingStories);
  }, [stories, pendingStories]);

  const addStory = (newStory: Omit<Story, 'id' | 'time' | 'score' | 'approved' | 'isSiliconValley'>) => {
    const story: Story = {
      ...newStory,
      id: Math.random().toString(36).substr(2, 9),
      time: Date.now() / 1000,
      score: 1,
      approved: false,
      isSiliconValley: false
    };
    setPendingStories(prev => [story, ...prev]);
  };

  const removeStory = (id: string) => {
    setStories(prev => prev.filter(story => story.id !== id));
    setPendingStories(prev => prev.filter(story => story.id !== id));
  };

  const approveStory = (id: string, isSiliconValley: boolean) => {
    const story = pendingStories.find(s => s.id === id);
    if (story) {
      const approvedStory = { ...story, approved: true, isSiliconValley };
      setStories(prev => [approvedStory, ...prev]);
      setPendingStories(prev => prev.filter(s => s.id !== id));
    }
  };

  const rejectStory = (id: string) => {
    setPendingStories(prev => prev.filter(s => s.id !== id));
  };

  const upvoteStory = (id: string) => {
    setStories(prev =>
      prev.map(story => {
        if (story.id === id) {
          return {
            ...story,
            score: story.score + 1
          };
        }
        return story;
      })
    );
  };

  const filterStoriesByCategory = (category: StoryCategory, siliconValleyOnly: boolean) => {
    const approvedStories = stories.filter(story => 
      story.approved && 
      (!siliconValleyOnly || story.isSiliconValley)
    );
    
    if (category === 'ALL') return [...approvedStories].sort((a, b) => b.score - a.score);
    return [...approvedStories]
      .filter(story => story.category === category)
      .sort((a, b) => b.score - a.score);
  };

  const getLatestStories = (siliconValleyOnly: boolean) => {
    return [...stories]
      .filter(story => 
        story.approved && 
        (!siliconValleyOnly || story.isSiliconValley)
      )
      .sort((a, b) => b.time - a.time);
  };

  return (
    <StoryContext.Provider value={{ 
      stories, 
      pendingStories,
      addStory,
      removeStory,
      approveStory,
      rejectStory,
      upvoteStory, 
      filterStoriesByCategory,
      getLatestStories 
    }}>
      {children}
    </StoryContext.Provider>
  );
}

export function useStories() {
  const context = useContext(StoryContext);
  if (!context) {
    throw new Error('useStories must be used within a StoryProvider');
  }
  return context;
}