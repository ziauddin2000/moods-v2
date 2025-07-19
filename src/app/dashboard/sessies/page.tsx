"use client";
import { useState, useRef, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import SideLink from "./_components/sideLink";
import Card from "./_components/card";
import RoomList from "./_components/roomList";
import { PaginationProps, Room } from "@/types/sessies";
import Image from "next/image";

// --- Dummy Data ---
const rooms: Room[] = [
  {
    name: "John Doe",
    role: "Counselor",
    url: "https://d8das.whereby.com/therapeutformee",
    image: "/images/user-1.png",
  },
  {
    name: "Jane Smith",
    role: "Psychologist",
    url: "https://d8das.whereby.com/therapeutformee",
    image: "/images/user-2.png",
  },
  {
    name: "Michael Johnson",
    role: "Therapist",
    url: "https://d8das.whereby.com/therapeutformee",
    image: "/images/user-3.png",
  },
  {
    name: "Sarah Williams",
    role: "Psychiatrist",
    url: "https://d8das.whereby.com/therapeutformee",
    image: "/images/user-4.png",
  },
  {
    name: "David Brown",
    role: "Counselor",
    url: "https://d8das.whereby.com/therapeutformee",
    image: "/images/user-1.png",
  },
  {
    name: "Emily Davis",
    role: "Psychologist",
    url: "https://d8das.whereby.com/therapeutformee",
    image: "/images/user-2.png",
  },
  {
    name: "James Miller",
    role: "Therapist",
    url: "https://d8das.whereby.com/therapeutformee",
    image: "/images/user-3.png",
  },
  {
    name: "Olivia Wilson",
    role: "Psychiatrist",
    url: "https://d8das.whereby.com/therapeutformee",
    image: "/images/user-4.png",
  },
  {
    name: "Ethan Clark",
    role: "Counselor",
    url: "https://d8das.whereby.com/therapeutformee",
    image: "/images/user-1.png",
  },
  {
    name: "Sophia Harris",
    role: "Psychologist",
    url: "https://d8das.whereby.com/therapeutformee",
    image: "/images/user-2.png",
  },
  {
    name: "William Turner",
    role: "Therapist",
    url: "https://d8das.whereby.com/therapeutformee",
    image: "/images/user-3.png",
  },
  {
    name: "Ava Martin",
    role: "Psychiatrist",
    url: "https://d8das.whereby.com/therapeutformee",
    image: "/images/user-4.png",
  },
  {
    name: "Daniel Lee",
    role: "Counselor",
    url: "https://d8das.whereby.com/therapeutformee",
    image: "/images/user-1.png",
  },
  {
    name: "Chloe Lewis",
    role: "Psychologist",
    url: "https://d8das.whereby.com/therapeutformee",
    image: "/images/user-2.png",
  },
  {
    name: "Samuel King",
    role: "Therapist",
    url: "https://d8das.whereby.com/therapeutformee",
    image: "/images/user-3.png",
  },
  {
    name: "Lily Scott",
    role: "Psychiatrist",
    url: "https://d8das.whereby.com/therapeutformee",
    image: "/images/user-4.png",
  },
  {
    name: "Benjamin Walker",
    role: "Counselor",
    url: "https://d8das.whereby.com/therapeutformee",
    image: "/images/user-1.png",
  },
  {
    name: "Mia Green",
    role: "Psychologist",
    url: "https://d8das.whereby.com/therapeutformee",
    image: "/images/user-2.png",
  },
  {
    name: "Lucas Hall",
    role: "Therapist",
    url: "https://d8das.whereby.com/therapeutformee",
    image: "/images/user-3.png",
  },
  {
    name: "Amelia Adams",
    role: "Psychiatrist",
    url: "https://d8das.whereby.com/therapeutformee",
    image: "/images/user-4.png",
  },
  {
    name: "Oliver Young",
    role: "Counselor",
    url: "https://d8das.whereby.com/therapeutformee",
    image: "/images/user-1.png",
  },
  {
    name: "Isabella Rodriguez",
    role: "Psychologist",
    url: "https://d8das.whereby.com/therapeutformee",
    image: "/images/user-2.png",
  },
  {
    name: "Elijah Martinez",
    role: "Therapist",
    url: "https://d8das.whereby.com/therapeutformee",
    image: "/images/user-3.png",
  },
  {
    name: "Charlotte Perez",
    role: "Psychiatrist",
    url: "https://d8das.whereby.com/therapeutformee",
    image: "/images/user-4.png",
  },
  {
    name: "Henry Thompson",
    role: "Counselor",
    url: "https://d8das.whereby.com/therapeutformee",
    image: "/images/user-1.png",
  },
  {
    name: "Amelia Johnson",
    role: "Psychologist",
    url: "https://d8das.whereby.com/therapeutformee",
    image: "/images/user-2.png",
  },
  {
    name: "Sebastian Anderson",
    role: "Therapist",
    url: "https://d8das.whereby.com/therapeutformee",
    image: "/images/user-3.png",
  },
  {
    name: "Harper Taylor",
    role: "Psychiatrist",
    url: "https://d8das.whereby.com/therapeutformee",
    image: "/images/user-4.png",
  },
  {
    name: "Jack Martinez",
    role: "Counselor",
    url: "https://d8das.whereby.com/therapeutformee",
    image: "/images/user-1.png",
  },
  {
    name: "Grace White",
    role: "Psychologist",
    url: "https://d8das.whereby.com/therapeutformee",
    image: "/images/user-2.png",
  },
  {
    name: "Matthew Harris",
    role: "Therapist",
    url: "https://d8das.whereby.com/therapeutformee",
    image: "/images/user-3.png",
  },
  {
    name: "Zoe Nelson",
    role: "Psychiatrist",
    url: "https://d8das.whereby.com/therapeutformee",
    image: "/images/user-4.png",
  },
  {
    name: "Jackson Moore",
    role: "Counselor",
    url: "https://d8das.whereby.com/therapeutformee",
    image: "/images/user-1.png",
  },
  {
    name: "Madeline King",
    role: "Psychologist",
    url: "https://d8das.whereby.com/therapeutformee",
    image: "/images/user-2.png",
  },
];

const PAGE_SIZE = 12;

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
  rooms,
  value,
  onSelect,
}: {
  rooms: Room[];
  value: string;
  onSelect: (name: string) => void;
}) {
  const [inputValue, setInputValue] = useState(value || "");
  const [open, setOpen] = useState(false);
  const [dropUp, setDropUp] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Filter rooms as you type
  const filteredRooms = rooms.filter((room) =>
    room.name.toLowerCase().includes(inputValue.toLowerCase())
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
            onSelect("");
          }}
          className="absolute top-1/2 right-10 -translate-y-1/2  h-5 w-5 flex justify-center items-center rounded cursor-pointer"
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
          {filteredRooms.length > 0 ? (
            filteredRooms.map((room) => (
              <div
                key={room.name}
                className={`px-2 py-2 text-primary-beige cursor-pointer hover:bg-primary-beige hover:text-rich-black rounded ${
                  inputValue === room.name
                    ? "bg-primary-beige text-rich-black"
                    : ""
                }`}
                onMouseDown={() => {
                  setInputValue(room.name);
                  setOpen(false);
                  onSelect(room.name);
                }}
              >
                {room.name}
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

export default function Sessies(): React.ReactElement {
  const [view, setView] = useState<string>("Tegels");
  const [page, setPage] = useState<number>(1);

  // --- Room Filter State ---
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

  // Filter rooms by selected room name
  const filteredRooms: Room[] = selectedRoom
    ? rooms.filter((room) => room.name === selectedRoom)
    : rooms;

  const paginatedRooms: Room[] = filteredRooms.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  return (
    <div className="py-5 lg:py-10 grid grid-cols-1 gap-y-3 lg:gap-0 lg:grid-cols-12 ">
      {/* Left */}
      <div className="lg:col-span-4 xl:col-span-3">
        <div className="bg-linear-to-bl from-darkgreen to-gr-light rounded-xl lg:rounded-none lg:rounded-tl-xl lg:rounded-bl-xl p-5 xl:p-10 lg:h-full w-full">
          {/* Left Menu */}
          <SideLink />
          {/* Find a room */}
          <div className="mt-15 lg:mt-25">
            <h2 className="font-medium text-lg text-primary-beige mb-4 flex items-center gap-1 justify-between">
              <span>Vind een kamer</span>
            </h2>

            {/* Room Dropdown with search functionality*/}
            <FilteredData
              rooms={rooms}
              value={selectedRoom || ""}
              onSelect={(roomName) => {
                setSelectedRoom(roomName);
                setPage(1);
              }}
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
                Rooms
              </h1>
              <Select value={view} onValueChange={setView}>
                <SelectTrigger className="agenda-dropdown cursor-pointer rounded-sm shadow-none border-0 text-base py-2 w-fit">
                  <SelectValue placeholder="Tegels" />
                </SelectTrigger>
                <SelectContent className="bg-linear-to-r from-green3 to to-green3 border border-secondary-beige">
                  <SelectItem value="Tegels" className="text-primary-beige">
                    <Image
                      src="/icons/tilesIcon.svg"
                      width={15}
                      height={15}
                      alt="Tiles"
                    />
                    Tegels
                  </SelectItem>
                  <SelectItem value="Lijst" className="text-primary-beige">
                    <Image
                      src="/icons/bar.svg"
                      width={15}
                      height={15}
                      alt="List"
                    />
                    Lijst
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* List */}
            <div className="flex-1 rooms-card-wrapper h-[80%] overflow-y-auto">
              {view === "Lijst" ? (
                <RoomList paginatedRooms={paginatedRooms} />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                  {paginatedRooms.map((room: Room, i: number) => (
                    <Card key={i} room={room} />
                  ))}
                </div>
              )}
            </div>

            {/* Pagination */}
            <div className="mt-6 flex justify-center">
              <Pagination
                page={page}
                pageCount={Math.ceil(filteredRooms.length / PAGE_SIZE)}
                onPageChange={setPage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
