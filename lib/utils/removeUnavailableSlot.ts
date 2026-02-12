// Chnage to remove UnavailableTimeSlots
const removeUnavailableSlot = (
  bookings: any,
  availabilities: any,
  serviceDuration: string,
) => {
  const allSlots = availabilities;

  //   Converting service duration to a number
  const durationMs = Number(serviceDuration);

  if (isNaN(durationMs)) {
    throw new Error('Invalid serviceDuration');
  }

  // Looping through available slots
  const openSlots = allSlots.availabilities.filter((slot: any) => {
    // Getting the slot start time in date format
    const slotStartTime = new Date(slot.startAt).getTime();
    const slotEndTime = slotStartTime + durationMs;

    // .some loop and test that atleast one of the conditions return true else false
    const isTaken = bookings.data.some((booking: any) => {
      // Booking startTime in date format
      const bookingStartTime = new Date(booking.startAt).getTime();
      const bookingSegment = booking.appointmentSegments[0];

      if (!bookingSegment) return false;

      const bookingDurationMs = bookingSegment.durationMinutes * 60 * 1000;
      const bookingEndTime = bookingStartTime + bookingDurationMs;

      //   return checks if the slot doesn't start during booking end time
      // and checks that slot doesn't start when booking start or during
      return slotStartTime < bookingEndTime && slotEndTime > bookingStartTime;
    });
    return !isTaken;
  });

  return openSlots;
};

export default removeUnavailableSlot;
