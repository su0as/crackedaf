import { useEffect } from 'react';
import { ref, push } from 'firebase/database';
import { db } from '../firebase';
import { useStories } from '../context/StoryContext';

export function TestFirebase() {
  const { stories, pendingStories } = useStories();

  const addTestStory = async () => {
    const testStory = {
      title: `Test Story ${Date.now()}`,
      url: 'https://example.com',
      category: 'CONTENT',
      time: Date.now() / 1000,
      score: 1,
      approved: false,
      isSiliconValley: false
    };

    try {
      await push(ref(db, 'pendingStories'), testStory);
      console.log('Test story added successfully');
    } catch (error) {
      console.error('Error adding test story:', error);
    }
  };

  useEffect(() => {
    console.log('Current stories:', stories);
    console.log('Pending stories:', pendingStories);
  }, [stories, pendingStories]);

  return (
    <div className="p-4">
      <button
        onClick={addTestStory}
        className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-200"
      >
        Add Test Story
      </button>
      <div className="mt-4">
        <h2 className="text-xl font-bold mb-2">Stories in Database:</h2>
        <pre className="bg-zinc-900 p-4 rounded-lg overflow-auto max-h-96">
          {JSON.stringify({ stories, pendingStories }, null, 2)}
        </pre>
      </div>
    </div>
  );
}