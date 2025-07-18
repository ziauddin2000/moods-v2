import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";

const monthNames = [
  "januari",
  "februari",
  "maart",
  "april",
  "mei",
  "juni",
  "juli",
  "augustus",
  "september",
  "oktober",
  "november",
  "december",
];

export default function HomeCalendar(): React.ReactElement {
  const [date, setDate] = useState<Date>(new Date());

  // date calculations
  const safeDate =
    date && date instanceof Date && !isNaN(date as unknown as number) ? date : new Date();
  const day = safeDate.getDate();
  const month = monthNames[safeDate.getMonth()];

  // Safe date selection handler
  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate && selectedDate instanceof Date && !isNaN(selectedDate as unknown as number)) {
      setDate(selectedDate);
    }
  };

  return (
    <div className="bg-linear-to-bl from-[#0C221B] to-[#5C7E6C] rounded-xl p-5 h-full">
      <div className="flex flex-col sm:flex-row justify-center sm:justify-evenly rounded-xl items-center h-full gap-2">
        {/* Left: Current Date */}
        <div className="flex flex-1 flex-col items-center justify-center  text-center text-primary-beige">
          <span className="text-5xl font-medium">{day}</span>
          <span className="text-2xl lowercase">{month}</span>
        </div>
        {/* Divider */}
        <div className="hidden sm:block xl:hidden 2xl:block h-[200px] border-l border-white/30 mx-4" />
        {/* Right: Calendar */}
        <div className="home-calendar max-w-[350px] w-full">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            className="rounded-lg bg-transparent text-primary-beige w-full "
            classNames={{
              day: "relative w-full h-full p-0 text-center select-none text-xs rounded-full",
              week: "flex w-full mt-0.5",
              weekdays: "flex w-full",
              weekday:
                "flex-1 text-center text-[10px] font-normal text-primary-beige/70",
              month: "flex flex-col w-full gap-2",
            }}
          />
        </div>
      </div>
    </div>
  );
}
