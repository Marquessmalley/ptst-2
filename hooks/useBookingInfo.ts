import { BookingContextType, BookingContext } from "@/context/BookingContext";
import { useContext } from "react";

export const useBookingInfo = (): BookingContextType => {
  const context = useContext(BookingContext);
  if (!context) throw new Error("No Booking Context!");

  return context;
};
