"use client";
import React, { useRef, useState } from "react";

import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { FiMinus } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import { RxCross1 } from "react-icons/rx";

import AgendaCalendar from "./_components/AgendaCalendar";
import Profile from "./_components/Profile";
import Image from "next/image";
import CalendarIc from "../../../../public/icons/CalendarIc";
import ClockIc from "../../../../public/icons/ClockIc";

function isSameDay(dateA, dateB) {
  return (
    dateA.getFullYear() === dateB.getFullYear() &&
    dateA.getMonth() === dateB.getMonth() &&
    dateA.getDate() === dateB.getDate()
  );
}

export default function Agenda() {
  const calendarRef = useRef(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [successModal, setsuccessModal] = useState(false);
  const [selectedTherapist, setSelectedTherapist] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);

  // Showning Current Date and Day in popup - formatted way in Dutch
  function formatDutchDate(date) {
    return date.toLocaleDateString("nl-NL", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
  }

  const [formattedDate, setformattedDate] = useState(new Date());

  // state for minutes
  const [minutes, setMinutes] = useState(15);

  // selected time
  const timeSlots = [
    { slot: "09:30", booked: false },
    { slot: "10:00", booked: true },
    { slot: "10:30", booked: true },
    { slot: "11:00", booked: true },
    { slot: "11:30", booked: true },
    { slot: "12:00", booked: false },
    { slot: "12:30", booked: true },
    { slot: "13:00", booked: true },
    { slot: "13:30", booked: false },
    { slot: "14:00", booked: true },
    { slot: "14:30", booked: true },
    { slot: "15:00", booked: false },
    { slot: "15:30", booked: true },
    { slot: "16:00", booked: false },
    { slot: "16:30", booked: false },
    { slot: "17:00", booked: true },
    { slot: "17:30", booked: false },
    { slot: "18:00", booked: true },
    { slot: "18:30", booked: true },
    { slot: "19:00", booked: false },
    { slot: "19:30", booked: false },
    { slot: "20:00", booked: true },
    { slot: "20:30", booked: true },
    { slot: "21:00", booked: false },
    { slot: "21:30", booked: false },
    { slot: "22:00", booked: true },
    { slot: "22:30", booked: true },
    { slot: "23:00", booked: false },
    { slot: "23:30", booked: true },
    { slot: "24:00", booked: false },
  ];

  const [selectedTime, setSelectedTime] = useState(timeSlots[0]);

  // Functions to handle increment/decrement
  const handleIncrement = () => setMinutes((prev) => prev + 15);
  const handleDecrement = () =>
    setMinutes((prev) => (prev > 15 ? prev - 15 : prev));

  // Open popup on date click
  const handleDateClick = (info) => {
    setSelectedDate(info.dateStr);
    setSelectedTime(timeSlots[0]);
    setIsPopupOpen(true);

    const date = new Date(info.dateStr);
    setformattedDate(formatDutchDate(date));
  };

  // events data
  const dummyEvents = [
    {
      title: "1010 - ZPM Behandeling",
      start: "2025-07-12T08:30:00",
      end: "2025-07-12T10:00:00",
      description: "4e behandelgesprek",
      therapist: "Noa Zegers",
      client: "Ava Richardson",
    },
    {
      title: "Conference",
      start: "2025-07-15",
      end: "2025-07-15",
      description: "4e behandelgesprek",
      therapist: "Daan Hoogstra",
      client: "Liam Montgomery",
    },
    {
      title: "Long Event",
      start: "2025-07-13",
      end: "2025-07-13",
      description: "4e behandelgesprek",
      therapist: "Femke Meulendijk",
      client: "Isabella Harris",
    },
    {
      title: "Long Event",
      start: "2025-07-14T08:30:00",
      end: "2025-07-14T09:30:00",
      description: "Event no - 1",
      therapist: "Tijn van de Velde",
      client: "Mason Cruz",
    },
    {
      title: "Long Event",
      start: "2025-07-14T12:30:00",
      end: "2025-07-14T16:30:00",
      description: "Event no - 2",
      therapist: "Sanne Blom",
      client: "Ethan Rivers",
    },
    {
      title: "Long Event 2",
      start: "2025-07-13",
      end: "2025-07-13",
      description: "4e behandelgesprek 2",
      therapist: "Lars Vermeer",
      client: "Sophia Bennett",
    },
    {
      title: "Meeting",
      start: "2025-08-10T12:30:00",
      end: "2025-08-10T12:30:00",
      description: "4e behandelgesprek",
      therapist: "Noa Zegers",
      client: "Aarav Thompson",
    },
    {
      title: "Birthday Party",
      start: "2025-07-16T07:00:00",
      end: "2025-07-7T16:30:00",
      description: "4e behandelgesprek",
      therapist: "Lars Vermeer",
      client: "Ava Richardson",
    },
    {
      title: "Repeating Event",
      start: "2025-07-17T16:00:00",
      end: "2025-07-17T12:30:00",
      description: "4e behandelgesprek",
      therapist: "Sanne Blom",
      client: "Liam Montgomery",
    },
    {
      title: "Yoga Session",
      start: "2025-07-15T09:30:00",
      end: "2025-07-15T10:30:00",
      description: "Relaxing yoga class",
      therapist: "Sanne Blom",
      client: "David Harper",
    },
    {
      title: "Counseling Session",
      start: "2025-07-15T11:00:00",
      end: "2025-07-15T12:00:00",
      description: "Therapy session for anxiety",
      therapist: "Noa Zegers",
      client: "Grace Wilson",
    },
    {
      title: "Long Event",
      start: "2025-07-16T14:00:00",
      end: "2025-07-16T16:00:00",
      description: "Personal development session",
      therapist: "Tijn van de Velde",
      client: "Oliver Smith",
    },
    {
      title: "Conference Call",
      start: "2025-07-16T10:30:00",
      end: "2025-07-16T11:30:00",
      description: "Therapist consultation",
      therapist: "Daan Hoogstra",
      client: "Sophia Lee",
    },
    {
      title: "Therapy Meeting",
      start: "2025-07-17T13:00:00",
      end: "2025-07-17T14:00:00",
      description: "Weekly check-in for progress",
      therapist: "Femke Meulendijk",
      client: "Charlotte Evans",
    },
    {
      title: "Relaxation Therapy",
      start: "2025-07-17T15:30:00",
      end: "2025-07-17T16:30:00",
      description: "Deep relaxation techniques",
      therapist: "Lars Vermeer",
      client: "Daniel Brown",
    },
    {
      title: "Group Counseling",
      start: "2025-07-18T09:00:00",
      end: "2025-07-18T10:30:00",
      description: "Therapeutic group session",
      therapist: "Sanne Blom",
      client: "Emily Adams",
    },
    {
      title: "Private Consultation",
      start: "2025-07-18T13:00:00",
      end: "2025-07-18T14:00:00",
      description: "Private therapy session for grief",
      therapist: "Lars Vermeer",
      client: "Jack Thomas",
    },
    {
      title: "Mindfulness Class",
      start: "2025-07-15T08:30:00",
      end: "2025-07-15T09:30:00",
      description: "Guided mindfulness practice",
      therapist: "Tijn van de Velde",
      client: "Olivia Johnson",
    },
    {
      title: "Therapy Appointment",
      start: "2025-07-18T11:00:00",
      end: "2025-07-18T12:00:00",
      description: "Therapy session for stress relief",
      therapist: "Daan Hoogstra",
      client: "Lucas Garcia",
    },
  ];

  // Custom design event Show on calendar
  function renderEventContent(eventInfo) {
    const { event } = eventInfo;
    const start = event.start;
    const end = event.end;
    // Format time
    const startTime = start
      ? start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      : "";
    const endTime = end
      ? end.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      : "";
    return (
      <div
        style={{
          background: "#37815b",
          borderRadius: "6px",
          padding: "6px",
          color: "#fff",
          fontSize: "14px",
          width: "100%",
        }}
      >
        <div className="whitespace-normal">{event.title}</div>
        <div>
          {startTime} - {endTime}{" "}
        </div>
        <div style={{ fontSize: "12px", color: "#d3d3d3" }}>
          {event.extendedProps.description}
        </div>
      </div>
    );
  }

  // Handle Therapist
  let handleTherapist = (value) => {
    setSelectedTherapist(value);
  };

  // Handle Client
  let handleClient = (value) => {
    setSelectedClient(value);
  };

  // Filter by both therapist and client
  const filteredEvents = dummyEvents.filter((event) => {
    const therapistMatch = selectedTherapist
      ? event.therapist === selectedTherapist
      : true;
    const clientMatch = selectedClient ? event.client === selectedClient : true;
    let dateMatch = true;
    if (selectedDate) {
      const eventDate = new Date(event.start);
      const selected = new Date(selectedDate);
      dateMatch = isSameDay(eventDate, selected);
    }
    return therapistMatch && clientMatch && dateMatch;
  });

  // Popup calendar date
  function onDateChange(date) {
    setSelectedDate(date);
    setformattedDate(formatDutchDate(new Date(date)));

    // Go to the selected date in FullCalendar
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.gotoDate(date);
    }
  }

  return (
    <div className="py-5 lg:py-10 grid grid-cols-1 gap-y-3 lg:gap-0 lg:grid-cols-12 ">
      {/* Left */}
      <div className="lg:col-span-4 xl:col-span-3">
        <div className="bg-linear-to-bl from-[#0C221B] to-[#5C7E6C] rounded-xl lg:rounded-none lg:rounded-tl-xl lg:rounded-bl-xl p-5 xl:p-10">
          {/* Agenda Calendar */}
          <AgendaCalendar date={selectedDate} setDate={onDateChange} />
          {/* Profile */}
          <Profile
            data={dummyEvents}
            handleTherapist={handleTherapist}
            handleClient={handleClient}
          />
        </div>
      </div>

      {/* Right */}
      <div className="lg:col-span-8 xl:col-span-9">
        <div className="bg-linear-to-bl from-[#5C7E6C] to-[#0C221B] rounded-xl lg:rounded-none lg:rounded-tr-xl lg:rounded-br-xl p-5 full-calendar-wrapper h-[500px] lg:h-full w-full overflow-x-auto">
          <div style={{ minWidth: 600, width: "100%", height: "100%" }}>
            <FullCalendar
              ref={calendarRef}
              plugins={[
                dayGridPlugin,
                timeGridPlugin,
                listPlugin,
                interactionPlugin,
              ]}
              initialView="timeGridDay"
              selectable={true}
              headerToolbar={{
                left: "today,prev,next",
                center: "title",
                right: "timeGridDay,timeGridWeek,dayGridMonth",
              }}
              buttonText={{
                day: "Dag",
                month: "Maand",
                list: "Lijst",
              }}
              height="100%"
              width="100%"
              dateClick={handleDateClick}
              events={filteredEvents}
              eventContent={renderEventContent}
            />
          </div>
        </div>
      </div>

      {/* Event Form Modal */}
      {isPopupOpen && (
        <div
          className={`
            fixed z-50 bg-[#1d1d1db4] bg-opacity-80 w-full h-full
            flex justify-center
            overflow-y-auto
            inset-x-0 top-0
            items-start
            py-4
            lg:inset-0 lg:items-center lg:py-8
            min-h-screen
          `}
          style={{ minHeight: "100vh" }}
          onClick={() => setIsPopupOpen(false)}
        >
          <div
            className={`
              bg-primary-rich-black rounded-2xl max-w-3xl lg:max-w-6xl
              flex flex-col
              shadow-2xl border border-[#F6ECE280] relative
              p-2 sm:p-4 md:p-5
              gap-0
              lg:flex-row
              w-[96%]
            `}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left Column */}
            <div className="flex-1 flex flex-col gap-4 px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10 min-w-[180px] border-b lg:border-b-0 lg:border-r border-[#2C3A33]">
              {/*ZPM Behandeling  */}
              <div>
                <label className="text-lg text-primary-beige font-medium mb-2 block">
                  ZPM Behandeling
                </label>
                <div className="relative event-popup">
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="ZPM Behandeling" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Treatment 1">Treatment 1</SelectItem>
                      <SelectItem value="Treatment 2">Treatment 2</SelectItem>
                      <SelectItem value="Treatment 3">Treatment 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {/* Time */}
              <div>
                <label className="text-lg text-primary-beige font-medium mb-2 block">
                  Tijdsduur
                </label>
                <div className="flex items-center gap-2">
                  <button
                    className="h-6 w-6 cursor-pointer rounded-full flex items-center justify-center bg-green2 text-white text-sm"
                    onClick={handleDecrement}
                  >
                    <FiMinus />
                  </button>
                  <span className="text-primary-beige text-base">
                    <span>{minutes}</span> minuten
                  </span>
                  <button
                    className="h-6 w-6 cursor-pointer rounded-full flex items-center justify-center bg-green2 text-white text-sm"
                    onClick={handleIncrement}
                  >
                    <GoPlus />
                  </button>
                </div>
              </div>
              {/* Therapeut */}
              <div>
                <label className="text-lg text-primary-beige font-medium mb-2 block">
                  Therapeut
                </label>
                <div className="relative event-popup">
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Therapeut 1">Therapeut 1</SelectItem>
                      <SelectItem value="Therapeut 2">Therapeut 2</SelectItem>
                      <SelectItem value="Therapeut 3">Therapeut 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {/* Cliënt */}
              <div>
                <label className="text-lg text-primary-beige font-medium mb-2 block">
                  Cliënt
                </label>
                <div className="relative event-popup">
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Cliënt 1">Cliënt 1</SelectItem>
                      <SelectItem value="Cliënt 2">Cliënt 2</SelectItem>
                      <SelectItem value="Cliënt 3">Cliënt 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {/* Locatie */}
              <div>
                <label className="text-lg text-primary-beige font-medium mb-2 block">
                  Locatie
                </label>
                <div className="relative event-popup">
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Locatie 1">Locatie 1</SelectItem>
                      <SelectItem value="Locatie 2">Locatie 2</SelectItem>
                      <SelectItem value="Locatie 3">Locatie 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            {/* Middle Column */}
            <div className="order-3 lg:order-2 flex-1 flex flex-col items-center px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10 min-w-[250px] border-b lg:border-b-0 lg:border-r border-[#2C3A33]">
              <div className="font-medium text-lg text-primary-beige mb-4">
                Selecteer een datum
              </div>

              {/* Agenda Calendar */}
              <AgendaCalendar date={selectedDate} setDate={onDateChange} />

              {/* Book Btn */}
              <div className="mt-10">
                <h3 className="text-primary-beige text-center text-lg font-medium">
                  Eerstvolgende beschikbaarheid
                </h3>
                <div className="mt-5 flex items-center border border-secondary-beige rounded-full overflow-hidden w-fit">
                  <button
                    onClick={() => {
                      setIsPopupOpen(false);
                      setsuccessModal(true);
                    }}
                    className="cursor-pointer bg-green5 text-primary-beige px-8 py-3 text-base xl:text-lg font-medium rounded-full  focus:outline-none whitespace-nowrap border-r border-r-secondary-beige"
                  >
                    Boek nu
                  </button>
                  <span className="text-primary-beige text-base xl:text-lg font-normal bg-transparent px-5 whitespace-nowrap">
                    {formattedDate}
                  </span>
                </div>
              </div>
            </div>
            {/* Right Column */}
            <div className="order-2 lg:order-3 flex-1 flex flex-col items-center px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10 min-w-[180px]">
              <div className="text-primary-beige text-lg text-center mb-6 font-medium">
                Selecteer een tijd
              </div>
              <div className="text-primary-beige text-base font-normal text-center mb-4">
                {formattedDate}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-col gap-3 w-full schedule-wrap max-h-[300px] overflow-auto ">
                {timeSlots.map((t, idx) => (
                  <button
                    key={idx}
                    className={`cursor-pointer bg-green1 text-primary-beige rounded-full py-2 font-medium hover:bg-green5 transition
                      ${selectedTime === t.slot ? "bg-green5" : ""}
                    `}
                    onClick={() => setSelectedTime(t.slot)}
                  >
                    {t.slot}
                  </button>
                ))}
              </div>
              <button
                className="mt-8 button-gr"
                onClick={() => {
                  setIsPopupOpen(false);
                  setsuccessModal(true);
                }}
              >
                Bevestig afspraak
              </button>
            </div>

            {/* Close Button */}
            <button
              className="absolute top-3 right-3 sm:top-5 sm:right-5 text-primary-beige text-xl cursor-pointer"
              onClick={() => setIsPopupOpen(false)}
            >
              <RxCross1 />
            </button>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {successModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#1d1d1db4] bg-opacity-80"
          style={{ minHeight: "100vh" }}
          onClick={() => setsuccessModal(false)}
        >
          <div
            className="relative bg-rich-black rounded-2xl shadow-2xl border border-secondary-beige max-w-lg w-[96%] px-8 py-10 flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              className="cursor-pointer absolute top-4 right-4 text-primary-beige text-2xl"
              onClick={() => setsuccessModal(false)}
            >
              <RxCross1 />
            </button>
            {/* Green Check */}
            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-green5 mb-6">
              <Image
                src="/icons/green-check.svg"
                alt="Green Check"
                width={100}
                height={100}
              ></Image>
            </div>
            {/* Title */}
            <div className="text-2xl text-primary-beige font-medium mb-4 text-center">
              Afspraak ingepland!
            </div>
            {/* Date & Time */}
            <div className="flex items-center justify-center gap-6 mb-4 text-primary-beige">
              <div className="flex items-center gap-2 text-base">
                <CalendarIc></CalendarIc>
                <span>7 Juli, 2025</span>
              </div>
              <div className="flex items-center gap-2">
                <ClockIc></ClockIc>
                <span text-base>10:30 - 11:30 uur</span>
              </div>
            </div>
            {/* Details */}
            <div className="text-primary-beige text-center text-sm space-y-1 mb-8">
              <p>Therapeut: Lisa Anna</p>
              <p>Cliënt: Femke de Groot</p>
              <p>Locatie: Amsterdam</p>
            </div>
            {/* Button */}
            <button
              className="cursor-pointer button-gr max-w-[200px] w-full"
              onClick={() => setsuccessModal(false)}
            >
              Terug naar agenda
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
