import { useEffect, useRef } from 'react';

const images = [
  '/crackedimg/El.jpeg',
  '/crackedimg/starship.png',
  '/crackedimg/raptor engine.jpeg',
  '/crackedimg/SpaceX Raptor 3.jpeg',
  '/crackedimg/SpaceX Maxar 2 Mission.jpeg',
  '/crackedimg/SpaceX Starship Flight 5.jpeg',
  '/crackedimg/33bcc865-6607-4ccf-a7ef-5be4444366e9.jpeg',
  '/crackedimg/5bf96ca7-fd3f-41bc-ab74-6a3584453e90.jpeg',
  '/crackedimg/90b9d343-729e-4828-aa1e-dfaaa4df7131.jpeg',
  '/crackedimg/9ea1bdd3-e812-4e49-b940-50a805b68eaf.jpeg',
  '/crackedimg/Bookmarks X.jpeg',
  '/crackedimg/Bookmarks X (1).jpeg',
  '/crackedimg/Gwynne Shotwell on X.jpeg',
  '/crackedimg/Image from Twitter.jpeg',
  '/crackedimg/Post Image from X (1).jpeg',
  '/crackedimg/Trending Now X.jpeg',
  '/crackedimg/Screenshot 2024-11-22 at 3.51.17 PM.png',
  '/crackedimg/Screenshot 2024-11-22 at 3.51.36 PM.png',
  '/crackedimg/Screenshot 2024-11-22 at 3.51.55 PM.png',
  '/crackedimg/Screenshot 2024-11-22 at 3.58.30 PM.png'
];

export function ImageCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scroll = () => {
      const scrollAmount = -1; // Negative value for right-to-left movement
      container.scrollLeft += scrollAmount;

      // Reset scroll position when reaching the start
      if (container.scrollLeft <= 0) {
        container.scrollLeft = container.scrollWidth / 2;
      }
    };

    const intervalId = setInterval(scroll, 30);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-zinc-800">
      <div className="relative w-screen overflow-hidden">
        <div
          ref={containerRef}
          className="flex space-x-4 py-4 overflow-x-hidden"
          style={{ width: '200%' }} // Make the container twice as wide
        >
          {/* Duplicate the images to create a seamless loop */}
          {[...images, ...images, ...images].map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Carousel image ${index + 1}`}
              className="h-32 w-auto object-cover rounded-lg flex-none"
              draggable={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
}