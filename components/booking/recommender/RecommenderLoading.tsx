import { useEffect, useRef } from 'react';
import { Spinner } from '@heroui/react';
import { Loader2Icon } from 'lucide-react';
import { animate } from 'animejs';

const RecommenderLoading = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      animate(containerRef.current, {
        opacity: [0, 1],
        scale: [0.9, 1],
        duration: 500,
        ease: 'outExpo',
      });

      const dots = containerRef.current.querySelector('[data-dots]');
      if (dots) {
        animate(dots, {
          opacity: [0.4, 1, 0.4],
          duration: 1500,
          loop: true,
          ease: 'inOutSine',
        });
      }
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center justify-center py-10"
      style={{ opacity: 0 }}
    >
      <div className="relative flex items-center justify-center">
        <Spinner
          size="lg"
          classNames={{
            circle1: 'border-b-sky-500',
            circle2: 'border-b-sky-300',
          }}
        />
        <Loader2Icon className="absolute size-5 animate-spin text-sky-400" />
      </div>
      <p className="mt-4 text-sm font-semibold text-slate-700 sm:text-base">
        Finding your perfect package...
      </p>
      <p
        data-dots
        className="mt-1 text-xs text-slate-400 sm:text-sm"
      >
        Our AI is analyzing your answers
      </p>
    </div>
  );
};

export default RecommenderLoading;
