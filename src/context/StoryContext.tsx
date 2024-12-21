import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ref, onValue, push, remove, update, set } from 'firebase/database';
import { db } from '../firebase';
import type { Story, StoryCategory } from '../types';

interface StoryContextType {
  stories: Story[];
  pendingStories: Story[];
  addStory: (story: Omit<Story, 'id' | 'time' | 'score' | 'upvotedBy' | 'approved' | 'isSiliconValley'>) => void;
  removeStory: (id: string) => void;
  approveStory: (id: string, isSiliconValley: boolean) => void;
  rejectStory: (id: string) => void;
  upvoteStory: (id: string, userId: string) => void;
  filterStoriesByCategory: (category: StoryCategory, siliconValleyOnly: boolean, sortByTime?: boolean) => Story[];
  getLatestStories: (siliconValleyOnly: boolean) => Story[];
}

const StoryContext = createContext<StoryContextType | undefined>(undefined);

export function StoryProvider({ children }: { children: ReactNode }) {
  const [stories, setStories] = useState<Story[]>([]);
  const [pendingStories, setPendingStories] = useState<Story[]>([]);

  useEffect(() => {
    const storiesRef = ref(db, 'stories');
    const pendingRef = ref(db, 'pendingStories');

    const storiesUnsubscribe = onValue(storiesRef, (snapshot) => {
      const data = snapshot.val();
      const storyList = data ? Object.entries(data).map(([id, story]) => ({
        ...(story as any),
        id,
        upvotedBy: (story as any).upvotedBy || []
      })) : [];
      setStories(storyList);
    });

    const pendingUnsubscribe = onValue(pendingRef, (snapshot) => {
      const data = snapshot.val();
      const pendingList = data ? Object.entries(data).map(([id, story]) => ({
        ...(story as any),
        id
      })) : [];
      setPendingStories(pendingList);
    });

    return () => {
      storiesUnsubscribe();
      pendingUnsubscribe();
    };
  }, []);

  const addStory = async (newStory: Omit<Story, 'id' | 'time' | 'score' | 'upvotedBy' | 'approved' | 'isSiliconValley'>) => {
    const story = {
      ...newStory,
      time: Date.now() / 1000,
      score: 1,
      upvotedBy: [],
      approved: false,
      isSiliconValley: false
    };
    
    await push(ref(db, 'pendingStories'), story);
  };

  const removeStory = async (id: string) => {
    await remove(ref(db, `stories/${id}`));
    await remove(ref(db, `pendingStories/${id}`));
  };

  const approveStory = async (id: string, isSiliconValley: boolean) => {
    const story = pendingStories.find(s => s.id === id);
    if (story) {
      const approvedStory = { ...story, approved: true, isSiliconValley, upvotedBy: [] };
      await set(ref(db, `stories/${id}`), approvedStory);
      await remove(ref(db, `pendingStories/${id}`));
    }
  };

  const rejectStory = async (id: string) => {
    await remove(ref(db, `pendingStories/${id}`));
  };

  const upvoteStory = async (id: string, userId: string) => {
    const story = stories.find(s => s.id === id);
    if (story && !story.upvotedBy.includes(userId)) {
      const updatedUpvotes = [...story.upvotedBy, userId];
      await update(ref(db, `stories/${id}`), {
        score: story.score + 1,
        upvotedBy: updatedUpvotes
      });
    }
  };

  const filterStoriesByCategory = (category: StoryCategory, siliconValleyOnly: boolean, sortByTime = false) => {
    const approvedStories = stories.filter(story => 
      story.approved && 
      (!siliconValleyOnly || story.isSiliconValley)
    );
    
    const filteredStories = category === 'ALL' 
      ? approvedStories 
      : approvedStories.filter(story => story.category === category);

    return sortByTime 
      ? [...filteredStories].sort((a, b) => b.time - a.time)
      : [...filteredStories].sort((a, b) => b.score - a.score);
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