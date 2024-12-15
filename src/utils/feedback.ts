import { ref, push, remove } from 'firebase/database';
import { db } from '../firebase';

export interface Feedback {
  message: string;
  type: 'suggestion' | 'bug' | 'other';
  timestamp: number;
  status: 'pending' | 'resolved' | 'rejected';
}

export async function submitFeedback(feedback: Feedback): Promise<void> {
  const feedbackRef = ref(db, 'feedback');
  await push(feedbackRef, feedback);
}

export async function deleteFeedback(id: string): Promise<void> {
  const feedbackRef = ref(db, `feedback/${id}`);
  await remove(feedbackRef);
}