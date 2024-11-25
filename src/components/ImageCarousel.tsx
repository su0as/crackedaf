import { useEffect, useRef, useState } from 'react';

// Import all images
import el from '/crackedimg/El.jpeg';
import starship from '/crackedimg/starship.png';
import raptorEngine from '/crackedimg/raptor engine.jpeg';
import spaceXRaptor3 from '/crackedimg/SpaceX Raptor 3.jpeg';
import maxar2Mission from '/crackedimg/SpaceX Maxar 2 Mission.jpeg';
import starshipFlight5 from '/crackedimg/SpaceX Starship Flight 5.jpeg';
import img33bcc from '/crackedimg/33bcc865-6607-4ccf-a7ef-5be4444366e9.jpeg';
import img5bf96 from '/crackedimg/5bf96ca7-fd3f-41bc-ab74-6a3584453e90.jpeg';
import img90b9d from '/crackedimg/90b9d343-729e-4828-aa1e-dfaaa4df7131.jpeg';
import img9ea1b from '/crackedimg/9ea1bdd3-e812-4e49-b940-50a805b68eaf.jpeg';
import bookmarksX from '/crackedimg/Bookmarks X.jpeg';
import bookmarksX1 from '/crackedimg/Bookmarks X (1).jpeg';
import gwynneShotwell from '/crackedimg/Gwynne Shotwell on X.jpeg';
import imageFromTwitter from '/crackedimg/Image from Twitter.jpeg';
import postImageX1 from '/crackedimg/Post Image from X (1).jpeg';
import trendingNowX from '/crackedimg/Trending Now X.jpeg';

const images = [
  el,
  starship,
  raptorEngine,
  spaceXRaptor3,
  maxar2Mission,
  starshipFlight5,
  img33bcc,
  img5bf96,
  img90b9d,
  img9ea1b,
  bookmarksX,
  bookmarksX1,
  gwynneShotwell,
  imageFromTwitter,
  postImageX1,
  trendingNowX
];

export function ImageCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scroll = () => {
      const scrollAmount = -1;
      container.scrollLeft += scrollAmount;

      if (container.scrollLeft <= 0) {
        container.scrollLeft = container.scrollWidth / 2;
      }
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY <= lastScrollY.current || currentScrollY < 100);
      lastScrollY.current = currentScrollY;
    };

    const intervalId = setInterval(scroll, 30);
    window.addEventListener('scroll', handleScroll);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`fixed bottom-0 left-0 right-0 bg-black border-t border-zinc-800 transition-transform duration-300 ${
      isVisible ? 'translate-y-0' : 'translate-y-full'
    }`}>
      <div className="relative w-screen overflow-hidden">
        <div
          ref={containerRef}
          className="flex space-x-4 py-2 overflow-x-hidden"
          style={{ width: '200%' }}
        >
          {[...images, ...images, ...images].map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Carousel image ${index + 1}`}
              className="h-16 w-auto object-cover rounded-lg flex-none md:h-32"
              draggable={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
}