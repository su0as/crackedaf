import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { MessageSquare, ChevronDown, ChevronUp } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import type { Comment } from '../types';

interface CommentThreadProps {
  storyId: string;
}

const DEMO_COMMENTS: Comment[] = [
  {
    id: '1',
    text: 'This is a great post! Really insightful.',
    by: 'user1',
    time: Date.now() / 1000 - 3600,
    replies: [
      {
        id: '2',
        text: 'I agree, especially about the technical aspects.',
        by: 'user2',
        time: Date.now() / 1000 - 1800,
        replies: []
      }
    ]
  },
  {
    id: '3',
    text: 'Interesting perspective. Would love to see more content like this.',
    by: 'user3',
    time: Date.now() / 1000 - 7200,
    replies: []
  }
];

function CommentItem({ comment }: { comment: Comment }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { isAuthenticated } = useAuth();

  return (
    <div className="border-l-2 border-zinc-800 pl-4 mb-4">
      <div className="flex items-center space-x-2 text-sm text-zinc-400">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hover:text-white transition-colors"
        >
          {isCollapsed ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronUp className="w-4 h-4" />
          )}
        </button>
        <span className="font-medium text-zinc-300">{comment.by}</span>
        <span>·</span>
        <span>{formatDistanceToNow(comment.time * 1000, { addSuffix: true })}</span>
      </div>

      {!isCollapsed && (
        <>
          <div className="mt-2 text-zinc-200 whitespace-pre-wrap">{comment.text}</div>
          
          {comment.replies.length > 0 && (
            <div className="mt-4 ml-4">
              {comment.replies.map(reply => (
                <CommentItem key={reply.id} comment={reply} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export function CommentThread({ storyId }: CommentThreadProps) {
  const [newComment, setNewComment] = useState('');
  const { isAuthenticated } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the comment to an API
    setNewComment('');
  };

  return (
    <div className="bg-zinc-900 rounded-lg p-6">
      <div className="flex items-center space-x-2 mb-6">
        <MessageSquare className="w-5 h-5 text-zinc-400" />
        <h2 className="text-lg font-semibold text-white">Comments</h2>
      </div>

      {isAuthenticated && (
        <form onSubmit={handleSubmit} className="mb-8">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="What are your thoughts?"
            className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-md text-white placeholder-zinc-500 focus:outline-none focus:border-white transition-colors"
            rows={3}
          />
          <div className="mt-2 flex justify-end">
            <button
              type="submit"
              disabled={!newComment.trim()}
              className="px-4 py-2 bg-white text-black rounded-md hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Comment
            </button>
          </div>
        </form>
      )}

      <div className="space-y-6">
        {DEMO_COMMENTS.map(comment => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
}