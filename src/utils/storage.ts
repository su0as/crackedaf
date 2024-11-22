export const storage = {
  get: (key: string) => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  },
  
  set: (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  
  remove: (key: string) => {
    localStorage.removeItem(key);
  },

  getUpvotes: (): Set<string> => {
    const stored = localStorage.getItem('upvoted_stories');
    return stored ? new Set(JSON.parse(stored)) : new Set();
  },

  addUpvote: (storyId: string): void => {
    const upvotes = storage.getUpvotes();
    upvotes.add(storyId);
    localStorage.setItem('upvoted_stories', JSON.stringify(Array.from(upvotes)));
  },

  hasUpvoted: (storyId: string): boolean => {
    return storage.getUpvotes().has(storyId);
  }
};