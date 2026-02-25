export type Recommendation = {
  packageName: string;
  price: string;
  reason: string;
};

type RecommenderResultsProps = {
  recommendations: Recommendation[];
  services: any[];
  onSelect: (pkg: any) => void;
};

const RecommenderResults = ({
  recommendations,
  services,
  onSelect,
}: RecommenderResultsProps) => {
  // TODO: implement
  return null;
};

export default RecommenderResults;
