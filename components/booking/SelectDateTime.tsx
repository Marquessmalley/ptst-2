import { useState } from "react";
import { Calendar } from "@heroui/react";
import { parseDate } from "@internationalized/date";
import type { DateValue } from "@heroui/react";

const SelectDateTime = () => {
  let [value, setValue] = useState<any>(parseDate("2024-03-07"));
  const handleChange = (value: any) => {
    setValue(value);
  };
  return (
    <div className="grid grid-cols-2 ">
      <div className="flex justify-center">
        <Calendar
          aria-label="Date (Controlled)"
          value={value}
          onChange={handleChange}
          classNames={{
            header: "text-lg font-bold",
          }}
        />
      </div>
      <div className="flex justify-center">
        <p>Date and time.</p>
      </div>
    </div>
  );
};

export default SelectDateTime;
