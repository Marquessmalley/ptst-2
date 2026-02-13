import { renderHook } from "@testing-library/react";
import { useBookingInfo } from "../useBookingInfo";
import { BookingInfo } from "@/lib/definitions/definitions";
import { BookingProvider } from "@/context/BookingContext";
import { ReactNode } from "react";

describe("Booking Hook", () => {
  it("Throws error when outside of provider", () => {
    expect(() => renderHook(() => useBookingInfo()).result).toThrow(
      "No Booking Context!",
    );
  });

  it("returns all the booking info context", () => {
    const wrapper = ({ children }: { children: ReactNode }) => {
      return <BookingProvider>{children}</BookingProvider>;
    };
    const { result } = renderHook(() => useBookingInfo(), { wrapper });

    expect(result.current).toHaveProperty("bookingInfo");
    expect(result.current).toHaveProperty("setBookingInfo");
    expect(typeof result.current.bookingInfo).toBe("object");
    expect(typeof result.current.setBookingInfo).toBe("function");
  });
});
