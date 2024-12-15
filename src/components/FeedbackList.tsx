import { useState } from 'react';
import { Trash2, CheckCircle, XCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import type { Feedback } from '../utils/feedback';

interface FeedbackListProps {
  feedback: Array<Feedback & { id: string }>;
  onDelete: (id: string) => void;
}

export function FeedbackList({ feedback, onDelete }: FeedbackListProps) {
  const [selectedType, setSelectedType] = useState<Feedback['type'] | 'all'>('all');

  const filteredFeedback = feedback.filter(
    item => selectedType === 'all' || item.type === selectedType
  );

  return (
    <div className="space-y-4">
      <div className="flex space-x-2 mb-4">
        {(['all', 'suggestion', 'bug', 'other'] as const).map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`px-3 py-1 rounded-full text-sm font-silkscreen transition-colors ${
              selectedType === type
                ? 'bg-amber-400 text-black'
                : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
            }`}
          >
            {type.toUpperCase()}
          </button>
        ))}
      </div>

      {filteredFeedback.length === 0 ? (
        <p className="text-zinc-400 font-silkscreen">NO FEEDBACK FOUND</p>
      ) : (
        <div className="space-y-4">
          {filteredFeedback.map((item) => (
            <div key={item.id} className="bg-zinc-800 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-silkscreen ${
                      item.type === 'bug' ? 'bg-red-900/50 text-red-200' :
                      item.type === 'suggestion' ? 'bg-blue-900/50 text-blue-200' :
                      'bg-zinc-700 text-zinc-200'
                    }`}>
                      {item.type.toUpperCase()}
                    </span>
                    <span className="text-zinc-400 text-sm">
                      {formatDistanceToNow(item.timestamp, { addSuffix: true })}
                    </span>
                    <span className={`flex items-center space-x-1 text-sm ${
                      item.status === 'resolved' ? 'text-green-400' :
                      item.status === 'rejected' ? 'text-red-400' :
                      'text-zinc-400'
                    }`}>
                      {item.status === 'resolved' ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : item.status === 'rejected' ? (
                        <XCircle className="w-4 h-4" />
                      ) : null}
                      <span className="font-silkscreen">
                        {item.status.toUpperCase()}
                      </span>
                    </span>
                  </div>
                  <p className="text-white whitespace-pre-wrap">{item.message}</p>
                </div>
                <button
                  onClick={() => onDelete(item.id)}
                  className="text-red-400 hover:text-red-300 transition-colors"
                  title="Delete feedback"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}