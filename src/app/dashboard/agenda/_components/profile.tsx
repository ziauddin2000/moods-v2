import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { DataItem, ProfileProps } from "@/types/agenda";

function FilteredData({
  options,
  value,
  onSelect,
  placeholder,
}: {
  options: string[];
  value: string;
  onSelect: (name: string) => void;
  placeholder: string;
}) {
  const [inputValue, setInputValue] = useState(value || "");
  const [open, setOpen] = useState(false);
  const [dropUp, setDropUp] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Keep inputValue in sync with value prop
  useEffect(() => {
    setInputValue(value || "");
  }, [value]);

  // Filter options as you type
  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(inputValue.toLowerCase())
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

  // Use handleOpen for onFocus and down arrow
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
        placeholder={placeholder}
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
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <div
                key={option}
                className={`px-2 py-2 text-primary-beige cursor-pointer hover:bg-primary-beige hover:text-rich-black rounded ${
                  inputValue === option
                    ? "bg-primary-beige text-rich-black"
                    : ""
                }`}
                onMouseDown={() => {
                  setInputValue(option);
                  setOpen(false);
                  onSelect(option);
                }}
              >
                {option}
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

export default function Profile({
  data,
  handleTherapist,
  handleClient,
}: ProfileProps) {
  // Unique therapist and client lists
  const therapists: string[] = [
    ...new Set(data.map((item: DataItem) => item.therapist)),
  ];
  const clients: string[] = [
    ...new Set(data.map((item: DataItem) => item.client)),
  ];

  // State for selected therapist and client
  const [selectedTherapist, setSelectedTherapist] = useState<string>("");
  const [selectedClient, setSelectedClient] = useState<string>("");

  // Handlers
  const handleTherapistSelect = (value: string) => {
    setSelectedTherapist(value);
    handleTherapist(value || null);
  };
  const handleClientSelect = (value: string) => {
    setSelectedClient(value);
    handleClient(value || null);
  };

  return (
    <div className="pt-10 space-y-12 max-w-[500px] w-full mx-auto">
      {/* Profile Avatar */}
      <div className="space-y-4">
        {/* Profile  */}
        <div className="flex items-center gap-3">
          <div>
            <Image
              src="/images/profile.svg"
              alt="Profile"
              width={70}
              height={70}
              className="rounded-full"
            />
          </div>
          <div>
            <h2 className="text-primary-beige font-medium text-xl leading-[1.3]">
              Anna Lisa
            </h2>
            <h2 className="text-primary-beige font-medium text-lg leading-[1.3]">
              Therapeut
            </h2>
          </div>
        </div>
        {/* Booking Button */}
        <button className="block w-full h-[50px] px-2 py-1 rounded-full text-primary-beige text-lg font-medium cursor-pointer mb-4 bg-gradient-to-l from-green3 to-green4">
          Boek afspraak
        </button>
      </div>
      {/* Select Agenda */}
      <div className="space-y-4">
        <h2 className="font-medium text-lg text-primary-beige mb-4 flex items-center gap-1 justify-between">
          <span>Vind een agenda</span>
        </h2>
        {/* Therapist select with search */}
        <FilteredData
          options={therapists}
          value={selectedTherapist}
          onSelect={handleTherapistSelect}
          placeholder="Selecteer een therapeut"
        />
        {/* Client select with search */}
        <FilteredData
          options={clients}
          value={selectedClient}
          onSelect={handleClientSelect}
          placeholder="Selecteer een cliënt"
        />
      </div>
    </div>
  );
}
