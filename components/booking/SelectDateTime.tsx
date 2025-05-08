import { useState } from "react";
import { Calendar } from "@heroui/react";
import { parseDate } from "@internationalized/date";

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

const SelectDateTime = () => {
  let [value, setValue] = useState<any>(parseDate("2025-05-07"));
  const handleChange = (value: any) => {
    setValue(value);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 ">
      <div className="flex justify-center ">
        <Calendar
          aria-label="Date (Controlled)"
          value={value}
          onChange={handleChange}
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
      <div className="flex flex-col justify-center items-center w-full">
        <div className="my-1 mx-2 p-2">
          <p className="text-sm text-default-700 font-semibold">Sun 26</p>
        </div>
        {/* TIMES CONTAINER */}
        <div className="my-2 mx-2 grid grid-cols-1 gap-y-2 max-h-[260px] overflow-scroll max-w-[370px] w-full">
          {times.map((time) => (
            <button
              key={time}
              type="button"
              className="w-full bg-default-100 hover:bg-default-200 text-xs font-semibold leading-4 text-default-500 p-2 rounded-xl transition duration-300"
            >
              <p className="p-2 text-center cursor-pointer">{time}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectDateTime;
