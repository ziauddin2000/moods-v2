"use client";
import { useState, useRef, useEffect } from "react";
import SideLink from "../_components/sideLink";
import List from "./_components/list";
import { PaginationProps, PastSession } from "@/types/sessies";
import Image from "next/image";

// --- Dummy Data ---
const sessionData: PastSession[] = [
  {
    name: "John Doe",
    role: "Counselor",
    date: "17 June 2025 12:10",
    duration: "1:00:00",
  },
  {
    name: "Jane Smith",
    role: "Psychologist",
    date: "18 June 2025 13:15",
    duration: "1:30:00",
  },
  {
    name: "Michael Johnson",
    role: "Therapist",
    date: "19 June 2025 14:20",
    duration: "2:00:00",
  },
  {
    name: "Sarah Williams",
    role: "Psychiatrist",
    date: "20 June 2025 15:25",
    duration: "1:45:00",
  },
  {
    name: "David Brown",
    role: "Counselor",
    date: "21 June 2025 16:30",
    duration: "1:10:00",
  },
  {
    name: "Emily Davis",
    role: "Psychologist",
    date: "22 June 2025 17:35",
    duration: "2:20:00",
  },
  {
    name: "James Miller",
    role: "Therapist",
    date: "23 June 2025 18:40",
    duration: "1:50:00",
  },
  {
    name: "Olivia Wilson",
    role: "Psychiatrist",
    date: "24 June 2025 19:45",
    duration: "2:10:00",
  },
  {
    name: "Ethan Clark",
    role: "Counselor",
    date: "25 June 2025 20:50",
    duration: "1:30:00",
  },
  {
    name: "Sophia Harris",
    role: "Psychologist",
    date: "26 June 2025 21:55",
    duration: "1:20:00",
  },
  {
    name: "William Turner",
    role: "Therapist",
    date: "27 June 2025 22:00",
    duration: "2:00:00",
  },
  {
    name: "Ava Martin",
    role: "Psychiatrist",
    date: "28 June 2025 23:05",
    duration: "1:45:00",
  },
  {
    name: "Daniel Lee",
    role: "Counselor",
    date: "29 June 2025 00:10",
    duration: "1:10:00",
  },
  {
    name: "Chloe Lewis",
    role: "Psychologist",
    date: "30 June 2025 01:15",
    duration: "1:30:00",
  },
  {
    name: "Samuel King",
    role: "Therapist",
    date: "1 July 2025 02:20",
    duration: "2:00:00",
  },
  {
    name: "Lily Scott",
    role: "Psychiatrist",
    date: "2 July 2025 03:25",
    duration: "1:50:00",
  },
  {
    name: "Benjamin Walker",
    role: "Counselor",
    date: "3 July 2025 04:30",
    duration: "2:10:00",
  },
  {
    name: "Mia Green",
    role: "Psychologist",
    date: "4 July 2025 05:35",
    duration: "1:15:00",
  },
  {
    name: "Lucas Hall",
    role: "Therapist",
    date: "5 July 2025 06:40",
    duration: "1:25:00",
  },
  {
    name: "Amelia Adams",
    role: "Psychiatrist",
    date: "6 July 2025 07:45",
    duration: "2:00:00",
  },
  {
    name: "Oliver Young",
    role: "Counselor",
    date: "7 July 2025 08:50",
    duration: "1:50:00",
  },
  {
    name: "Isabella Rodriguez",
    role: "Psychologist",
    date: "8 July 2025 09:55",
    duration: "1:30:00",
  },
  {
    name: "Elijah Martinez",
    role: "Therapist",
    date: "9 July 2025 10:00",
    duration: "1:40:00",
  },
  {
    name: "Charlotte Perez",
    role: "Psychiatrist",
    date: "10 July 2025 11:05",
    duration: "2:10:00",
  },
  {
    name: "Henry Thompson",
    role: "Counselor",
    date: "11 July 2025 12:10",
    duration: "1:20:00",
  },
  {
    name: "Amelia Johnson",
    role: "Psychologist",
    date: "12 July 2025 13:15",
    duration: "1:30:00",
  },
  {
    name: "Sebastian Anderson",
    role: "Therapist",
    date: "13 July 2025 14:20",
    duration: "2:00:00",
  },
  {
    name: "Harper Taylor",
    role: "Psychiatrist",
    date: "14 July 2025 15:25",
    duration: "1:45:00",
  },
  {
    name: "Jack Martinez",
    role: "Counselor",
    date: "15 July 2025 16:30",
    duration: "1:10:00",
  },
  {
    name: "Grace White",
    role: "Psychologist",
    date: "16 July 2025 17:35",
    duration: "1:20:00",
  },
  {
    name: "Matthew Harris",
    role: "Therapist",
    date: "17 July 2025 18:40",
    duration: "2:00:00",
  },
  {
    name: "Zoe Nelson",
    role: "Psychiatrist",
    date: "18 July 2025 19:45",
    duration: "2:10:00",
  },
  {
    name: "Jackson Moore",
    role: "Counselor",
    date: "19 July 2025 20:50",
    duration: "1:30:00",
  },
  {
    name: "Madeline King",
    role: "Psychologist",
    date: "20 July 2025 21:55",
    duration: "1:30:00",
  },
];

const PAGE_SIZE = 17;

function Pagination({
  page,
  pageCount,
  onPageChange,
}: PaginationProps): React.ReactElement {
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:gap-0 items-center justify-between bg-green3 rounded-md px-4 py-2 w-full">
      <span className="text-primary-beige text-sm pl-2">
        Pagina {page} van {pageCount}
      </span>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="rounded text-primary-beige cursor-pointer text-base w-7 h-7 flex justify-center items-center disabled:opacity-40"
        >
          <Image
            src="/icons/arrow-left.svg"
            width={8}
            height={8}
            alt="Arrow Left"
          />
        </button>
        {pages.map((p) => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`w-8 h-8 flex items-center justify-center rounded cursor-pointer ${
              p === page
                ? "bg-green1 text-primary-beige"
                : "bg-transparent text-primary-beige hover:bg-green1"
            }`}
          >
            {p}
          </button>
        ))}
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === pageCount}
          className="rounded text-primary-beige cursor-pointer text-base w-7 h-7 flex justify-center items-center disabled:opacity-40"
        >
          <Image
            src="/icons/arrow-right.svg"
            width={8}
            height={8}
            alt="Arrow Right"
          />
        </button>
      </div>
    </div>
  );
}

function FilteredData({
  sessions,
  value,
  onSelect,
  onClear,
}: {
  sessions: string[];
  value: string;
  onSelect: (name: string) => void;
  onClear: () => void;
}) {
  const [inputValue, setInputValue] = useState(value || "");
  const [open, setOpen] = useState(false);
  const [dropUp, setDropUp] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Filter sessions as you type
  const filteredSessions = sessions.filter((session) =>
    session.toLowerCase().includes(inputValue.toLowerCase())
  );

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        open &&
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  useEffect(() => {
    setInputValue(value || "");
  }, [value]);

  // When opening, decide direction
  const handleOpen = () => {
    if (inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      setDropUp(spaceBelow < 300 && spaceAbove > spaceBelow);
    }
    setOpen(true);
  };

  return (
    <div className="relative w-full max-w-[400px]" ref={containerRef}>
      <input
        ref={inputRef}
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          handleOpen();
        }}
        onFocus={handleOpen}
        onBlur={() => setTimeout(() => setOpen(false), 100)}
        placeholder="Selecteer een kamer"
        className="w-full cursor-pointer rounded-3xl shadow-none border border-primary-beige text-base py-3 pl-5 pr-12 bg-transparent text-primary-beige focus-visible:outline-none"
        autoComplete="off"
      />
      {/* Down arrow toggle button */}
      <button
        type="button"
        tabIndex={-1}
        onClick={() => {
          if (!open) handleOpen();
          else setOpen(false);
        }}
        className="absolute top-1/2 right-4 -translate-y-1/2 flex justify-center items-center rounded cursor-pointer"
      >
        <Image src="/icons/downArrow.svg" width={15} height={15} alt="Down" />
      </button>
      {/* Clear button */}
      {inputValue && (
        <button
          onClick={() => {
            setInputValue("");
            setOpen(true);
            onClear();
          }}
          className="absolute top-1/2 right-10 -translate-y-1/2 h-5 w-5 flex justify-center items-center rounded cursor-pointer"
          tabIndex={-1}
          type="button"
        >
          <Image
            src="/icons/closeIcon.svg"
            width={10}
            height={10}
            alt="Close"
          />
        </button>
      )}
      {open && (
        <div
          className={`filter-dropdown absolute left-0 right-0 z-10 bg-linear-to-r from-green3 to-green3 border border-secondary-beige max-h-[300px] overflow-y-auto rounded-md p-2 shadow-md
            ${dropUp ? "bottom-full mb-1" : "top-full mt-1"}
          `}
        >
          {filteredSessions.length > 0 ? (
            filteredSessions.map((session) => (
              <div
                key={session}
                className={`px-2 py-2 text-primary-beige cursor-pointer hover:bg-primary-beige hover:text-rich-black rounded ${
                  inputValue === session
                    ? "bg-primary-beige text-rich-black"
                    : ""
                }`}
                onMouseDown={() => {
                  setInputValue(session);
                  setOpen(false);
                  onSelect(session);
                }}
              >
                {session}
              </div>
            ))
          ) : (
            <div className="px-2 py-2 text-primary-beige">Geen resultaten</div>
          )}
        </div>
      )}
    </div>
  );
}

export default function PastSessies(): React.ReactElement {
  const [page, setPage] = useState<number>(1);

  // --- Dropdown Search State ---
  const [selectedSession, setSelectedSession] = useState<string | null>(null);

  // Get unique session names
  const uniqueSessions: string[] = Array.from(
    new Set(sessionData.map((s) => s.name))
  );

  // Filter sessionData by selected session name
  const filteredSessions: PastSession[] = selectedSession
    ? sessionData.filter((s) => s.name === selectedSession)
    : sessionData;

  const paginatedRooms: PastSession[] = filteredSessions.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  // Clear filter function
  const handleClear = (): void => {
    setSelectedSession(null);
    setPage(1);
  };

  return (
    <div className="py-5 lg:py-10 grid grid-cols-1 gap-y-3 lg:gap-0 lg:grid-cols-12 ">
      {/* Left */}
      <div className="lg:col-span-4 xl:col-span-3">
        <div className="bg-linear-to-bl from-darkgreen to-gr-light rounded-xl lg:rounded-none lg:rounded-tl-xl lg:rounded-bl-xl p-5 xl:p-10 lg:h-full w-full">
          {/* Left Menu */}
          <SideLink />
          {/* Find a session */}
          <div className="mt-15 lg:mt-25">
            <h2 className="font-medium text-lg text-primary-beige mb-4 flex items-center gap-1 justify-between">
              <span>Vind een kamer</span>
            </h2>
            {/* Session Data with search functionality */}
            <FilteredData
              sessions={uniqueSessions}
              value={selectedSession || ""}
              onSelect={(sessionName) => {
                setSelectedSession(sessionName);
                setPage(1);
              }}
              onClear={handleClear}
            />
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="lg:col-span-8 xl:col-span-9">
        <div className="bg-linear-to-bl from-gr-light to-darkgreen rounded-xl lg:rounded-none lg:rounded-tr-xl lg:rounded-br-xl p-5 lg:h-full w-full">
          <div className="flex flex-col justify-between h-[84vh]">
            {/* Header */}
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-secondary-beige">
              <h1 className="text-xl md:text-2xl text-primary-beige font-medium">
                Afgelopen sessies
              </h1>
            </div>

            {/* List */}
            <div className="flex-1 rooms-card-wrapper h-[80%] overflow-y-auto">
              <List paginatedRooms={paginatedRooms} />
            </div>

            {/* Pagination */}
            <div className="mt-6 flex justify-center">
              <Pagination
                page={page}
                pageCount={Math.ceil(filteredSessions.length / PAGE_SIZE)}
                onPageChange={setPage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
