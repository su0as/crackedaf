import { useState } from 'react';
import { MessageSquarePlus } from 'lucide-react';
import { FeedbackModal } from './FeedbackModal';

export function FeedbackButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed right-6 bottom-24 bg-amber-400 text-black p-3 rounded-full shadow-lg hover:bg-amber-300 transition-colors z-50"
        aria-label="Provide Feedback"
      >
        <MessageSquarePlus className="w-6 h-6" />
      </button>
      
      {isModalOpen && (
        <FeedbackModal onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
}