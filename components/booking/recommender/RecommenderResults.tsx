import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';
import RecommendationCard from './RecommendationCard';

export type Recommendation = {
  packageName: string;
  price: string;
  reason: string;
};

type RecommenderResultsProps = {
  recommendations: Recommendation[];
  vehicleType: string;
  onSelect: (pkg: any) => void;
};

const vehicleLabels: Record<string, string> = {
  sedan: 'Sedan',
  truck: 'Truck',
  'suv-2-rows': 'SUV (2 Rows)',
  'suv-3-rows': 'SUV (3 Rows)',
};

const RecommenderResults = ({
  recommendations,
  vehicleType,
  onSelect,
}: RecommenderResultsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const header = containerRef.current.querySelector('[data-header]');
      if (header) {
        animate(header, {
          opacity: [0, 1],
          translateY: [-10, 0],
          duration: 400,
          ease: 'outExpo',
        });
      }

      const cards = containerRef.current.querySelectorAll('[data-card]');
      animate(cards, {
        opacity: [0, 1],
        translateX: [-30, 0],
        delay: stagger(150, { start: 200 }),
        duration: 600,
        ease: 'outExpo',
      });
    }
  }, [recommendations]);

  return (
    <div ref={containerRef}>
      <div className="mb-4" data-header style={{ opacity: 0 }}>
        <p className="text-lg font-bold text-slate-800 sm:text-xl">
          🎯 Based on your answers, we recommend:
        </p>
        <p className="mt-1 text-xs text-slate-500 sm:text-sm">
          For your {vehicleLabels[vehicleType] || vehicleType} · Tap a package
          to select it
        </p>
      </div>
      <div className="space-y-3">
        {recommendations.map((rec, index) => (
          <div key={rec.packageName} data-card style={{ opacity: 0 }}>
            <RecommendationCard
              recommendation={rec}
              rank={index}
              onSelect={onSelect}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommenderResults;
