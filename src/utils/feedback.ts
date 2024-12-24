import { ref, push, remove, get } from 'firebase/database';
import { db } from '../firebase';

export interface Feedback {
  message: string;
  type: 'suggestion' | 'bug' | 'other';
  timestamp: number;
  status: 'pending' | 'resolved' | 'rejected';
}

export async function submitFeedback(feedback: Feedback): Promise<void> {
  try {
    const feedbackRef = ref(db, 'feedback');
    await push(feedbackRef, {
      ...feedback,
      createdAt: Date.now()
    });
  } catch (error) {
    console.error('Submit feedback error:', error);
    throw new Error('Failed to submit feedback');
  }
}

export async function deleteFeedback(id: string): Promise<void> {
  try {
    const feedbackRef = ref(db, `feedback/${id}`);
    await remove(feedbackRef);
  } catch (error) {
    console.error('Delete feedback error:', error);
    throw new Error('Failed to delete feedback');
  }
}

export async function getFeedback(): Promise<Array<Feedback & { id: string }>> {
  try {
    const feedbackRef = ref(db, 'feedback');
    const snapshot = await get(feedbackRef);
    const data = snapshot.val() || {};
    
    return Object.entries(data).map(([id, value]: [string, any]) => ({
      id,
      ...value
    }));
  } catch (error) {
    console.error('Get feedback error:', error);
    throw new Error('Failed to fetch feedback');
  }
}