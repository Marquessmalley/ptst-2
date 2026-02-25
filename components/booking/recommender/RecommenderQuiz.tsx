export type QuizAnswers = {
  lastDetail: string;
  mainConcern: string;
  budget: string;
};

type RecommenderQuizProps = {
  onSubmit: (answers: QuizAnswers) => void;
};

const RecommenderQuiz = ({ onSubmit }: RecommenderQuizProps) => {
  // TODO: implement
  return null;
};

export default RecommenderQuiz;
