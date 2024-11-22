import { formatDistanceToNow } from 'date-fns';
import type { Comment as CommentType } from '../types';
import { useState } from 'react';

interface CommentProps {
  comment: CommentType;
  level?: number;
}

export function Comment({ comment, level = 0 }: CommentProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`ml-${level * 4} mt-4`}>
      <div className="text-sm">
        <span className="text-gray-500 hover:underline cursor-pointer" onClick={() => setCollapsed(!collapsed)}>
          {comment.by} {formatDistanceToNow(comment.time * 1000)} ago
        </span>
      </div>
      {!collapsed && (
        <>
          <div 
            className="mt-1 text-gray-800 prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: comment.text }}
          />
          {/* Replies would be rendered here recursively */}
        </>
      )}
    </div>
  );
}