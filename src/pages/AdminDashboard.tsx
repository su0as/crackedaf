import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, X, Trash2, Cpu } from 'lucide-react';
import { useStories } from '../context/StoryContext';
import { useAdmin } from '../context/AdminContext';
import { formatDistanceToNow } from 'date-fns';

export function AdminDashboard() {
  const { pendingStories, approveStory, rejectStory, removeStory } = useStories();
  const { isAdmin, logout } = useAdmin();
  const navigate = useNavigate();
  const [selectedStories, setSelectedStories] = useState<Set<string>>(new Set());
  
  if (!isAdmin) {
    navigate('/admin/login');
    return null;
  }

  const toggleSiliconValley = (id: string) => {
    const newSelected = new Set(selectedStories);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedStories(newSelected);
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-silkscreen text-white">ADMIN DASHBOARD</h1>
        <button
          onClick={() => {
            logout();
            navigate('/');
          }}
          className="px-4 py-2 text-sm text-zinc-400 hover:text-white transition-colors font-silkscreen"
        >
          LOGOUT
        </button>
      </div>

      <div className="bg-zinc-900 rounded-lg p-6">
        <h2 className="text-xl font-silkscreen mb-4">PENDING SUBMISSIONS ({pendingStories.length})</h2>
        
        {pendingStories.length === 0 ? (
          <p className="text-zinc-400 font-silkscreen">NO PENDING SUBMISSIONS</p>
        ) : (
          <div className="space-y-4">
            {pendingStories.map(story => (
              <div key={story.id} className="border border-zinc-800 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium">
                      {story.url ? (
                        <a
                          href={story.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white hover:text-zinc-300 transition-colors"
                        >
                          {story.title}
                        </a>
                      ) : (
                        story.title
                      )}
                    </h3>
                    <p className="text-sm text-zinc-400 mt-1">
                      Submitted {formatDistanceToNow(story.time * 1000)} ago
                    </p>
                    <p className="text-sm text-zinc-400 mt-1 font-silkscreen">
                      CATEGORY: {story.category.replace('&', ' & ')}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => toggleSiliconValley(story.id)}
                      className={`p-2 transition-colors ${
                        selectedStories.has(story.id)
                          ? 'text-blue-500 hover:text-blue-400'
                          : 'text-zinc-500 hover:text-zinc-400'
                      }`}
                      title="Mark as Silicon Valley"
                    >
                      <Cpu className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => {
                        approveStory(story.id, selectedStories.has(story.id));
                        setSelectedStories(prev => {
                          const next = new Set(prev);
                          next.delete(story.id);
                          return next;
                        });
                      }}
                      className="p-2 text-green-500 hover:text-green-400 transition-colors"
                      title="Approve"
                    >
                      <Check className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => rejectStory(story.id)}
                      className="p-2 text-red-500 hover:text-red-400 transition-colors"
                      title="Reject"
                    >
                      <X className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => removeStory(story.id)}
                      className="p-2 text-zinc-500 hover:text-zinc-400 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}