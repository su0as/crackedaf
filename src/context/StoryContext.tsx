import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Story, StoryCategory } from '../types';

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

// WebSocket connection
const wsProtocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
const wsUrl = `${wsProtocol}//${window.location.host}/ws`;

let ws: WebSocket | null = null;

function connectWebSocket(
  onMessage: (data: any) => void,
  onReconnect: () => void
) {
  if (ws) return;

  ws = new WebSocket(wsUrl);

  ws.onopen = () => {
    console.log('WebSocket connected');
    // Request initial data
    sendMessage({ type: 'REQUEST_DATA' });
  };

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    onMessage(data);
  };

  ws.onclose = () => {
    console.log('WebSocket disconnected');
    ws = null;
    // Attempt to reconnect after 3 seconds
    setTimeout(() => {
      connectWebSocket(onMessage, onReconnect);
      onReconnect();
    }, 3000);
  };

  ws.onerror = (error) => {
    console.error('WebSocket error:', error);
    ws?.close();
  };
}

function sendMessage(data: any) {
  if (ws?.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify(data));
  } else {
    console.warn('WebSocket not connected, message not sent:', data);
  }
}

export function StoryProvider({ children }: { children: ReactNode }) {
  const [stories, setStories] = useState<Story[]>([]);
  const [pendingStories, setPendingStories] = useState<Story[]>([]);

  useEffect(() => {
    const handleMessage = (data: any) => {
      console.log('Received message:', data);
      if (data.type === 'INIT' || data.type === 'UPDATE') {
        setStories(data.data.stories);
        setPendingStories(data.data.pendingStories);
      }
    };

    const handleReconnect = () => {
      sendMessage({ type: 'REQUEST_DATA' });
    };

    connectWebSocket(handleMessage, handleReconnect);

    return () => {
      if (ws) {
        ws.close();
        ws = null;
      }
    };
  }, []);

  const addStory = (newStory: Omit<Story, 'id' | 'time' | 'score' | 'approved' | 'isSiliconValley'>) => {
    const story = {
      ...newStory,
      id: Math.random().toString(36).substr(2, 9),
      time: Date.now() / 1000,
      score: 1,
      approved: false,
      isSiliconValley: false
    };
    
    sendMessage({
      type: 'ADD_STORY',
      story
    });
  };

  const removeStory = (id: string) => {
    sendMessage({
      type: 'REMOVE_STORY',
      id
    });
  };

  const approveStory = (id: string, isSiliconValley: boolean) => {
    sendMessage({
      type: 'APPROVE_STORY',
      id,
      isSiliconValley
    });
  };

  const rejectStory = (id: string) => {
    sendMessage({
      type: 'REJECT_STORY',
      id
    });
  };

  const upvoteStory = (id: string) => {
    sendMessage({
      type: 'UPVOTE_STORY',
      id
    });
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