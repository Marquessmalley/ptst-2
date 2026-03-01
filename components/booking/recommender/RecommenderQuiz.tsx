import { useEffect, useRef, useState } from 'react';
import { QuizAnswers } from '@/lib/definitions/definitions';
import { animate, stagger } from 'animejs';

const quizQuestions = [
  {
    id: 'lastDetail',
    question: 'When was your last professional detail?',
    options: [
      'Never',
      'Within 3 months',
      '3-6 months ago',
      'Over 6 months ago',
    ],
  },
  {
    id: 'mainConcern',
    question: "What's your main concern?",
    options: [
      'Dirty/stained interior',
      'Dull or dirty exterior',
      'Both interior and exterior',
      'Just a maintenance wash',
    ],
  },
  {
    id: 'budget',
    question: "What's your budget?",
    options: ['Under $100', '$100–$200', '$200+'],
  },
];

type RecommenderQuizProps = {
  onSubmit: (answers: QuizAnswers) => void;
};

const RecommenderQuiz = ({ onSubmit }: RecommenderQuizProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [answers, setAnswers] = useState<QuizAnswers>({
    lastDetail: '',
    mainConcern: '',
    budget: '',
  });

  const allAnswered =
    answers.lastDetail && answers.mainConcern && answers.budget;

  useEffect(() => {
    if (containerRef.current) {
      const items = containerRef.current.querySelectorAll('[data-animate]');
      animate(items, {
        opacity: [0, 1],
        translateY: [20, 0],
        delay: stagger(100),
        duration: 500,
        ease: 'outExpo',
      });
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="space-y-4 rounded-2xl bg-white/20 p-3 backdrop-blur-xl sm:space-y-5 sm:p-5"
    >
      <div data-animate style={{ opacity: 0 }}>
        <p className="text-lg font-bold text-slate-800 sm:text-xl">
          ✨ Help me choose
        </p>
        <p className="mt-1 text-xs font-normal text-slate-500 sm:text-sm">
          Answer 3 quick questions and we&apos;ll recommend the best package for
          your vehicle.
        </p>
      </div>
      {quizQuestions.map((question, idx) => (
        <div key={question.id} data-animate style={{ opacity: 0 }}>
          <p className="mb-1.5 text-xs font-semibold text-slate-800 sm:mb-2 sm:text-sm">
            {idx + 1}. {question.question}
          </p>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {question.options.map((option) => {
              const isSelected =
                answers[question.id as keyof QuizAnswers] === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() =>
                    setAnswers({ ...answers, [question.id]: option })
                  }
                  className={`rounded-full border px-2.5 py-1 text-[11px] font-medium transition sm:px-3.5 sm:py-1.5 sm:text-sm ${
                    isSelected
                      ? 'border-sky-500 bg-sky-500/20 text-sky-700 shadow-sm'
                      : 'border-sky-300 bg-white/40 text-slate-600 hover:border-sky-400 hover:bg-sky-50/50'
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      <button
        data-animate
        style={{ opacity: 0 }}
        type="button"
        disabled={!allAnswered}
        onClick={() => onSubmit(answers)}
        className="w-full rounded-xl bg-gradient-to-r from-sky-500 to-sky-400 py-2 text-xs font-bold text-white shadow-md transition hover:from-sky-600 hover:to-sky-500 disabled:cursor-not-allowed disabled:opacity-40 sm:py-2.5 sm:text-sm"
      >
        Get Recommendation
      </button>
    </div>
  );
};

export default RecommenderQuiz;
