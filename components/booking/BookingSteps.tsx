"use client";
import { Suspense } from "react";
import { useStepper } from "@/hooks/useStepper";
import SelectVehicle from "./SelectVehicle";
import SelectPackage from "./SelectPackage";
import SelectDateTime from "./SelectDateTime";
import BookingSummary from "./BookingSummary";

interface BookingStepsProps {
  servicesPromise: Promise<any>;
}

const BookingSteps = ({ servicesPromise }: BookingStepsProps) => {
  const { step } = useStepper();
  return (
    <>
      {step === 0 && (
        <div>
          <SelectVehicle />
        </div>
      )}
      {step === 1 && (
        <Suspense fallback={<div>Loading packages...</div>}>
          <SelectPackage servicesPromise={servicesPromise} />
        </Suspense>
      )}
      {step === 2 && (
        <div>
          <SelectDateTime />
        </div>
      )}
      {step === 3 && (
        <div>
          <BookingSummary />
        </div>
      )}
    </>
  );
};

export default BookingSteps;
