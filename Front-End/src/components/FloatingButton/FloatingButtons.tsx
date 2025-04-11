import { useEffect, useState, useCallback } from "react";
import { FaArrowUp } from "react-icons/fa";

export default function FloatingButton() {
  const [showArrow, setShowArrow] = useState(false);

  const handleScroll = useCallback(() => {
    setShowArrow(window.scrollY > 200);
  }, []);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    handleScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, [handleScroll]);

  const scrollToTop = useCallback(() => {
    const start = window.scrollY;
    const duration = 800;
    const startTime = performance.now();

    const easeInOutQuad = (t: number) =>
      t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

    const animateScroll = (currentTime: number) => {
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const ease = easeInOutQuad(progress);

      window.scrollTo(0, start * (1 - ease));

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  }, []);

  return (
    <div className="fixed right-3 bottom-4 z-50 flex flex-col gap-2 items-end">
      <a
        href="https://zalo.me/0392406660"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-white p-1 rounded-full shadow-md hover:scale-105 transition-transform duration-200 will-change-transform"
      >
        <img
          src="/zalo.png"
          alt="Zalo"
          className="w-10 h-10 object-cover"
          loading="lazy"
          width={40}
          height={40}
        />
      </a>

      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className={`bg-[#d70018] cursor-pointer hover:scale-105  w-10 h-10 flex items-center justify-center text-white rounded-full shadow-md hover:bg-red-600 transition-all duration-300 will-change-transform ${
          showArrow
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible translate-y-2"
        }`}
      >
        <FaArrowUp className="text-sm font-bold" />
      </button>
    </div>
  );
}
