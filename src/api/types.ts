export interface Story {
  id: number;
  title: string;
  url?: string;
  text?: string;
  score: number;
  by: string;
  time: number;
  descendants: number;
  kids?: number[];
  type: 'story' | 'job' | 'comment';
}

export interface ApiError {
  message: string;
  status?: number;
}

export interface SubmitStoryData {
  title: string;
  url?: string;
  text?: string;
}