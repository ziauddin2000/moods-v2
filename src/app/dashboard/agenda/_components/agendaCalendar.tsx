"use client";

import React from "react";
import { Calendar } from "@/components/ui/calendar";

interface AgendaCalendarProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}

export default function AgendaCalendar({ date, setDate }: AgendaCalendarProps) {
  // Safe date selection handler
  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (
      selectedDate &&
      selectedDate instanceof Date &&
      !isNaN(selectedDate.getTime())
    ) {
      setDate(selectedDate);
    }
  };

  return (
    <div className="home-calendar max-w-[500px] w-full mx-auto lg:mx-0">
      <Calendar
        mode="single"
        selected={date}
        onSelect={handleDateSelect}
        className="rounded-lg bg-transparent text-primary-beige  w-full mx-auto"
        classNames={{
          day: "relative w-full h-full p-0 text-center select-none text-xs ",
          week: "flex w-full mt-0.5",
          weekdays: "flex w-full",
          weekday:
            "flex-1 text-center text-[10px] font-normal text-primary-beige/70",
          month: "flex flex-col w-full gap-2",
        }}
      />
    </div>
  );
}
