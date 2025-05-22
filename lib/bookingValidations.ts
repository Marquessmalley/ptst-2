import { BookingInfo } from "@/lib/definitions";

// FUNCTIONS THAT CHECK IF SELECTIONS ARE VALID
export const vehicleTypeSelected = (bookingInfo: BookingInfo) => {
  const { selectedVehicle } = bookingInfo;

  if (selectedVehicle === "") return false;
  return true;
};
export const packageSelected = (bookingInfo: BookingInfo) => {
  const { selectedPackage } = bookingInfo;
  if (selectedPackage.packageName === undefined) return false;
  return true;
};
export const dateTimeSelected = (bookingInfo: BookingInfo) => {
  const { selectedDate, selectedTime } = bookingInfo;
  if (selectedDate === "" || selectedTime === "") return false;
  return true;
};
