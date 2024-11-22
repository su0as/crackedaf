import { useEffect, useRef, useState } from 'react';

const images = [
  '/El.jpeg',
  '/starship.png',
  '/raptor-engine.jpeg',
  '/SpaceX-Raptor-3.jpeg',
  '/SpaceX-Maxar-2-Mission.jpeg',
  '/SpaceX-Starship-Flight-5.jpeg',
  '/33bcc865-6607-4ccf-a7ef-5be4444366e9.jpeg',
  '/5bf96ca7-fd3f-41bc-ab74-6a3584453e90.jpeg',
  '/90b9d343-729e-4828-aa1e-dfaaa4df7131.jpeg',
  '/9ea1bdd3-e812-4e49-b940-50a805b68eaf.jpeg',
  '/Bookmarks-X.jpeg',
  '/Bookmarks-X-1.jpeg',
  '/Gwynne-Shotwell-on-X.jpeg',
  '/Image-from-Twitter.jpeg',
  '/Post-Image-from-X-1.jpeg',
  '/Trending-Now-X.jpeg',
  '/Screenshot-2024-11-22-at-3-51-17-PM.png',
  '/Screenshot-2024-11-22-at-3-51-36-PM.png',
  '/Screenshot-2024-11-22-at-3-51-55-PM.png',
  '/Screenshot-2024-11-22-at-3-58-30-PM.png'
];

export function ImageCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState(0);

  useEffect(() => {
    const imagePromises = images.map(src => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          setLoadedImages(prev => prev + 1);
          resolve(null);
        };
        img.onerror = () => resolve(null);
      });
    });

    Promise.all(imagePromises).then(() => {
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || isLoading) return;

    const scroll = () => {
      const scrollAmount = -1;
      container.scrollLeft += scrollAmount;

      if (container.scrollLeft <= 0) {
        container.scrollLeft = container.scrollWidth / 2;
      }
    };

    const intervalId = setInterval(scroll, 30);
    return () => clearInterval(intervalId);
  }, [isLoading]);

  if (isLoading) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-zinc-800 h-40 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-white border-t-transparent"></div>
          <p className="text-zinc-400 mt-2 text-sm">Loading images... {Math.round((loadedImages / images.length) * 100)}%</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-zinc-800">
      <div className="relative w-screen overflow-hidden">
        <div
          ref={containerRef}
          className="flex space-x-4 py-4 overflow-x-hidden"
          style={{ width: '200%' }}
        >
          {[...images, ...images, ...images].map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Carousel image ${index + 1}`}
              className="h-32 w-auto object-cover rounded-lg flex-none"
              draggable={false}
              loading="eager"
              decoding="async"
            />
          ))}
        </div>
      </div>
    </div>
  );
}