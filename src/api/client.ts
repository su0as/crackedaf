import { HN_ITEM_URL, HN_TOP_STORIES_URL } from './constants';
import type { Story, ApiError, SubmitStoryData } from './types';

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error: ApiError = {
      message: `API Error: ${response.statusText}`,
      status: response.status,
    };
    throw error;
  }
  return response.json();
}

export async function fetchItem<T>(id: number): Promise<T> {
  try {
    const response = await fetch(`${HN_ITEM_URL}/${id}.json`);
    return handleResponse<T>(response);
  } catch (error) {
    throw {
      message: 'Failed to fetch item',
      status: 500,
    } as ApiError;
  }
}

export async function fetchTopStories(page = 1, limit = 30): Promise<Story[]> {
  try {
    const response = await fetch(HN_TOP_STORIES_URL);
    const ids = await handleResponse<number[]>(response);
    
    const start = (page - 1) * limit;
    const end = start + limit;
    const pageIds = ids.slice(start, end);
    
    const stories = await Promise.all(
      pageIds.map(id => fetchItem<Story>(id))
    );
    
    return stories.filter(story => story !== null);
  } catch (error) {
    throw {
      message: 'Failed to fetch top stories',
      status: 500,
    } as ApiError;
  }
}

export async function submitStory(data: SubmitStoryData): Promise<Story> {
  try {
    // Since we can't actually post to HN's API, we'll simulate a successful response
    // In a real app, this would make an actual API call
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
    
    if (!data.title) {
      throw new Error('Title is required');
    }

    if (!data.url && !data.text) {
      throw new Error('URL or text is required');
    }

    // Simulate a successful response
    const story: Story = {
      id: Math.floor(Math.random() * 1000000),
      title: data.title,
      url: data.url,
      text: data.text,
      score: 1,
      by: 'user', // This would come from the authenticated user
      time: Math.floor(Date.now() / 1000),
      descendants: 0,
      type: 'story'
    };

    return story;
  } catch (error) {
    throw {
      message: error instanceof Error ? error.message : 'Failed to submit story',
      status: 500,
    } as ApiError;
  }
}