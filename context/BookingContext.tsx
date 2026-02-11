"use client";
import { createContext, useState } from "react";
import { BookingInfo } from "@/lib/definitions/definitions";

export type BookingContextType = {
  bookingInfo: BookingInfo;
  setBookingInfo: (bookingInfo: any) => void;
};

export const BookingContext = createContext<BookingContextType | undefined>(
  undefined,
);

export const BookingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [bookingInfo, setBookingInfo] = useState({
    selectedVehicle: "",
    selectedPackage: {},
    selectedDate: "",
    selectedTime: "",
    userInfo: {
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      additionalComments: "",
    },
  });
  return (
    <BookingContext.Provider value={{ bookingInfo, setBookingInfo }}>
      {children}
    </BookingContext.Provider>
  );
};
