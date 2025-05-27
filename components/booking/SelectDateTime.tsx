import { useState } from "react";
import { Calendar } from "@heroui/react";
import { parseDate } from "@internationalized/date";
import { useBookingInfo } from "@/hooks/useBookingInfo";
import { BookingInfo } from "@/lib/definitions/definitions";

const times = [
  "12:00 am",
  "1:00 am",
  "2:00 am",
  "3:00 am",
  "4:00 am",
  "5:00 am",
  "6:00 am",
  "7:00 am",
  "8:00 am",
  "9:00 am",
  "10:00 am",
  "11:00 am",
];

interface SelectDateTimeProps {
  availableDates: any[];
  setAvailableDates: (dates: any) => void;
}

const SelectDateTime = ({
  availableDates,
  setAvailableDates,
}: SelectDateTimeProps) => {
  let [value, setValue] = useState<any>(parseDate("2025-05-07"));
  const { bookingInfo, setBookingInfo } = useBookingInfo();
  const { selectedDate, selectedTime } = bookingInfo;

  const handleDateChange = (value: any) => {
    setBookingInfo((prevState: BookingInfo) => ({
      ...prevState,
      selectedDate: value.toString(),
    }));
    setValue(value);
  };

  const handleSelectTime = (e: any) => {
    setBookingInfo((prevState: BookingInfo) => ({
      ...prevState,
      selectedTime: e.target.value,
    }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 ">
      <div className="flex justify-center ">
        <Calendar
          aria-label="Date (Controlled)"
          value={value}
          onChange={handleDateChange}
          classNames={{
            base: "!bg-transparent rounded-none shadow-none",
            title: "font-semibold text-small text-default-700",
            headerWrapper: "py-2 bg-transparent",
            content: "",
            gridHeader: "shadow-none bg-transparent",
            gridHeaderCell: "text-default-400 font-medium  m-1 text-xs",

            cellButton:
              "m-1 data-[selected]:bg-blue-600  data-[selected]:rounded-xl data-[selected]:shadow-[0_2px_12px_0] data-[selected]:shadow-blue-600 data-[selected]:font-bold data-[hover]:rounded-xl",
          }}
          weekdayStyle="short"
          calendarWidth={370}
        />
      </div>
      <div className="flex flex-col justify-start items-center w-full">
        <div className="my-1 mx-2 p-2 text-left w-full max-w-[370px] ">
          <p className="text-sm text-default-700 font-semibold ">Sun 26</p>
        </div>
        {/* TIMES CONTAINER */}
        <div className="max-w-[370px] w-full">
          {availableDates.length !== 0 ? (
            <div className="my-2 mx-2 grid grid-cols-1 gap-y-2 max-h-[260px] overflow-scroll ">
              {availableDates.map((time: any) => (
                <button
                  key={time.startAt}
                  type="button"
                  value={time.startAt}
                  onClick={handleSelectTime}
                  className={`w-full text-center cursor-pointer hover:bg-default-200 text-xs font-semibold leading-4 text-default-500 p-4 rounded-xl transition duration-300 ${
                    selectedTime === time ? "bg-default-200 " : "bg-default-100"
                  }`}
                >
                  {time.startAt}
                </button>
              ))}
            </div>
          ) : (
            <p className="text-md font-semibold">No available dates.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectDateTime;
