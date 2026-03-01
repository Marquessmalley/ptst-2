import { Recommendation } from './RecommenderResults';

type RecommendationCardProps = {
  recommendation: Recommendation;
  rank: number;
  onSelect: (pkg: Recommendation) => void;
};

const RecommendationCard = ({
  recommendation,
  rank,
  onSelect,
}: RecommendationCardProps) => {
  const { packageName, price, reason } = recommendation;
  const isBestMatch = rank === 0;

  const label = isBestMatch ? 'Best Match' : 'Alternative Pick';

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 shadow-sm">
      <div
        className={`px-3 py-1.5 sm:px-4 sm:py-2 ${
          isBestMatch
            ? 'bg-gradient-to-r from-sky-500 to-sky-400'
            : 'bg-gradient-to-r from-slate-600 to-slate-500'
        }`}
      >
        <p className="text-[10px] font-bold tracking-wide text-white sm:text-xs">
          {label}
        </p>
      </div>

      <div className="p-3 sm:p-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-bold text-slate-800 sm:text-base">
            {packageName}
          </p>
          <p className="text-sm font-semibold text-sky-500 sm:text-base">
            {price}
          </p>
        </div>

        <p className="mt-1.5 text-[11px] leading-relaxed text-slate-500 sm:text-xs">
          {reason}
        </p>

        <button
          type="button"
          onClick={() => onSelect(recommendation)}
          className={`mt-3 w-full rounded-lg py-1.5 text-[11px] font-bold text-white shadow-sm transition sm:py-2 sm:text-xs ${
            isBestMatch
              ? 'bg-gradient-to-r from-sky-500 to-sky-400 hover:from-sky-600 hover:to-sky-500'
              : 'bg-slate-700 hover:bg-slate-800'
          }`}
        >
          Select This Package
        </button>
      </div>
    </div>
  );
};

export default RecommendationCard;
