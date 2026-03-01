import { useState } from 'react';
import { Modal, ModalContent, ModalBody } from '@heroui/react';
import RecommenderQuiz from './RecommenderQuiz';
import RecommenderLoading from './RecommenderLoading';
import RecommenderResults from './RecommenderResults';
import { QuizAnswers } from '@/lib/definitions/definitions';
import { useBookingInfo } from '@/hooks/useBookingInfo';

type RecommenderModalProps = {
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
  services: any[];
};

const RecommenderModal = ({
  isOpen,
  onOpenChange,
  onClose,
  services,
}: RecommenderModalProps) => {
  const [step, setStep] = useState<'quiz' | 'loading' | 'results'>('quiz');
  const [reccomendations, setRecommendations] = useState<any[]>([]);

  const { bookingInfo, setBookingInfo } = useBookingInfo();

  const onSubmit = async (answers: QuizAnswers) => {
    setStep('loading');
    const response = await fetch('/api/openai/recommend', {
      method: 'POST',
      body: JSON.stringify({
        vehicleType: bookingInfo.selectedVehicle,
        answers: answers,
      }),
    });

    if (response.ok) {
      setStep('results');
      const data = await response.json();
      setRecommendations(data.recommendations);
    }
  };

  const onSelect = (pkg: any) => {
    const match = services.find((s: any) => s.name === pkg.packageName);
    if (match) {
      const { id, version } = match.variations;
      const { priceMoney, serviceDuration, teamMemberIds } =
        match.variations.itemVariationData;

      setBookingInfo((prevState: any) => ({
        ...prevState,
        selectedPackage: {
          name: match.name,
          price: priceMoney.amount,
          serviceDuration,
          variationId: id,
          variationVersion: version,
          teamMembers: teamMemberIds,
        },
      }));
    }
    setStep('quiz');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      className="rounded-xl border shadow-lg"
      backdrop="blur"
      hideCloseButton
      placement="center"
    >
      <ModalContent>
        {(onClose) => (
          <ModalBody>
            {step === 'quiz' && <RecommenderQuiz onSubmit={onSubmit} />}
            {step === 'loading' && <RecommenderLoading />}
            {step === 'results' && (
              <RecommenderResults
                recommendations={reccomendations}
                vehicleType={bookingInfo.selectedVehicle}
                onSelect={onSelect}
              />
            )}
          </ModalBody>
        )}
      </ModalContent>
    </Modal>
  );
};

export default RecommenderModal;
