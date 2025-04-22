"use client";
import { createContext, useState } from "react";
import { BookingInfo } from "@/lib/definitions";

export type BookingContextType = {
  bookingInfo: BookingInfo;
  setBookingInfo: (bookingInfo: any) => void;
};

export const BookingContext = createContext<BookingContextType | undefined>(
  undefined
);

export const BookingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [bookingInfo, setBookingInfo] = useState({
    selectedVehicle: "",
    selectedService: "",
  });
  return (
    <BookingContext.Provider value={{ bookingInfo, setBookingInfo }}>
      {children}
    </BookingContext.Provider>
  );
};
