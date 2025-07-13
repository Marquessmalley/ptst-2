'use client';
import { useState, useEffect } from 'react';
import { Calendar } from '@heroui/react';
import { parseDate, today, getLocalTimeZone } from '@internationalized/date';
import { useBookingInfo } from '@/hooks/useBookingInfo';
import { BookingInfo } from '@/lib/definitions/definitions';
import dayjs from 'dayjs';
import { formatTimeFromRFC3339 } from '@/lib/utils/formatRFC3339';
import TimeSlotsSkeleton from '../ui/skeletons/TimeSlotsSkeleton';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

const todaysDate = new Date().toISOString().split('T')[0];

interface SelectDateTimeProps {
  availableDates: any[];
  setAvailableDates: (dates: any) => void;
}

const SelectDateTime = ({
  availableDates,
  setAvailableDates,
}: SelectDateTimeProps) => {
  let [value, setValue] = useState<any>(parseDate(todaysDate));
  let [minDate, setMinDate] = useState<any>(today(getLocalTimeZone()));
  const [selectedDayOnly, setSelectedDayOnly] = useState(''); // YYYY-MM-DD
  const [loading, setLoading] = useState(availableDates.length === 0);
  const { bookingInfo, setBookingInfo } = useBookingInfo();
  const { selectedDate, selectedTime } = bookingInfo;

  const handleDateChange = (value: any) => {
    const dayOnly = dayjs(`${value.year}-${value.month}-${value.day}`).format(
      'YYYY-MM-DD',
    );

    setSelectedDayOnly(dayOnly);
    setBookingInfo((prevState: BookingInfo) => ({
      ...prevState,
      selectedDate: dayjs(`${dayOnly}T09:00:00.000`).format(
        'YYYY-MM-DDTHH:mm:ss.SSSZ',
      ),
    }));
    setValue(value);
  };

  const handleSelectTime = (e: any) => {
    const rawTime = e.target.value?.trim();

    if (!rawTime || !value?.year || !value?.month || !value?.day) {
      console.error('Missing input values');
      return;
    }

    const timeString = rawTime
      .toUpperCase()
      .replace(/\s+/g, '') // remove accidental spaces
      .replace(/^(\d{1,2}:\d{2})(AM|PM)$/, '$1 $2');

    const dateTimeString = `${value.year}-${String(value.month).padStart(
      2,
      '0',
    )}-${String(value.day).padStart(2, '0')} ${timeString}`;

    const localTime = dayjs.tz(
      dateTimeString,
      'YYYY-MM-DD h:mm A',
      'America/New_York',
    );

    if (!localTime.isValid()) {
      console.error('Invalid date-time parsed:', dateTimeString);
      return;
    }

    const utcTime = localTime.utc();

    setBookingInfo((prevState: BookingInfo) => ({
      ...prevState,
      selectedDate: utcTime.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
      selectedTime: rawTime,
    }));
  };

  const getFormattedDayAndDate = () => {
    const x = new Date(value.year, value.month - 1, value.day)
      .toString()
      .split(' ');
    const day = x[0];
    const date = x[2];
    return `${day} ${date}`;
  };

  const fecthAvailabilities = async () => {
    setLoading(true);
    const response = await fetch('api/square/searchAvailabilities', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingInfo),
    });

    const data = response.json();

    return data;
  };

  useEffect(() => {
    if (availableDates.length > 0) {
      setLoading(false);
    }

    fecthAvailabilities()
      .then((data) => {
        //FETCH LIST BOOKINGS AND SEE IF BOOKED SLOT === AVAILABILITY SLOT
        //IF SO REMOVE THAT SLOT

        const formattedTime =
          data.length > 0
            ? data.map((date: any) => {
                return {
                  ...date,
                  startAt: formatTimeFromRFC3339(date.startAt),
                };
              })
            : [];

        setAvailableDates(formattedTime);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }, [selectedDayOnly]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div className="flex justify-center">
        <Calendar
          aria-label="Date (Controlled)"
          value={value}
          onChange={handleDateChange}
          minValue={minDate}
          classNames={{
            base: '!bg-transparent rounded-none shadow-none',
            title: 'font-semibold text-small text-default-700',
            headerWrapper: 'py-2 bg-transparent',
            content: '',
            gridHeader: 'shadow-none bg-transparent',
            gridHeaderCell: 'text-default-400 font-medium  m-1 text-xs',

            cellButton:
              'm-1 data-[selected]:bg-blue-600  data-[selected]:rounded-xl data-[selected]:shadow-[0_2px_12px_0] data-[selected]:shadow-blue-600 data-[selected]:font-bold data-[hover]:rounded-xl',
          }}
          weekdayStyle="short"
          calendarWidth={370}
        />
      </div>
      <div className="flex w-full flex-col items-center justify-start">
        <div className="mx-2 my-1 w-full max-w-[370px] p-2 text-left">
          <p className="text-sm font-semibold text-default-700">
            {getFormattedDayAndDate()}
          </p>
        </div>
        {/* TIMES CONTAINER */}
        <div className="w-full max-w-[370px]">
          {loading === true ? (
            <TimeSlotsSkeleton />
          ) : availableDates.length !== 0 ? (
            <div className="mx-2 my-2 grid max-h-[260px] grid-cols-1 gap-y-2 overflow-scroll">
              {availableDates.map((time: any) => (
                <button
                  key={time.startAt}
                  type="button"
                  value={time.startAt}
                  onClick={handleSelectTime}
                  className={`w-full cursor-pointer rounded-xl p-4 text-center text-xs font-semibold leading-4 text-default-500 transition duration-300 hover:bg-default-200 ${
                    selectedTime === time.startAt
                      ? 'bg-default-200'
                      : 'bg-default-100'
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
