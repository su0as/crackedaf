export type StoryCategory = 'ALL' | 'HUMANS' | 'CONTENT' | 'PROJECTS' | 'CHALLENGES&GRANTS' | 'PARTIES&EVENTS';

export interface Story {
  id: string;
  title: string;
  url?: string;
  text?: string;
  score: number;
  time: number;
  category: StoryCategory;
  approved: boolean;
  isSiliconValley?: boolean;
  upvotedBy: string[];
}

export interface Admin {
  username: string;
  password: string;
}