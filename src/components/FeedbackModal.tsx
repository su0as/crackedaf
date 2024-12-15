import { useState } from 'react';
import { X } from 'lucide-react';
import { submitFeedback } from '../utils/feedback';

interface FeedbackModalProps {
  onClose: () => void;
}

export function FeedbackModal({ onClose }: FeedbackModalProps) {
  const [message, setMessage] = useState('');
  const [type, setType] = useState<'suggestion' | 'bug' | 'other'>('suggestion');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      await submitFeedback({
        message,
        type,
        timestamp: Date.now(),
        status: 'pending'
      });
      onClose();
    } catch (err) {
      setError('Failed to submit feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-zinc-900 rounded-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-zinc-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-silkscreen mb-4 text-amber-400">FEEDBACK</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-900/50 text-red-200 rounded-md text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-silkscreen text-zinc-300 mb-2">
              TYPE
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as typeof type)}
              className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white focus:outline-none focus:border-amber-400"
            >
              <option value="suggestion">Suggestion</option>
              <option value="bug">Bug Report</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-silkscreen text-zinc-300 mb-2">
              MESSAGE
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white focus:outline-none focus:border-amber-400 min-h-[100px]"
              placeholder="Tell us what you think..."
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !message.trim()}
            className="w-full bg-amber-400 text-black py-2 px-4 rounded-md hover:bg-amber-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-silkscreen"
          >
            {isSubmitting ? 'SENDING...' : 'SEND FEEDBACK'}
          </button>
        </form>
      </div>
    </div>
  );
}