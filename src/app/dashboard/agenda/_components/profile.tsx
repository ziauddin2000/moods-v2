import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DataItem } from "@/types/agenda";

interface ProfileProps {
  data: DataItem[];
  handleTherapist: (therapist: string | null) => void;
  handleClient: (client: string | null) => void;
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
  const clients: string[] = data.map((item: DataItem) => item.client);

  // State for search, dropdown, and selection
  const [search, setSearch] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter and prioritize selected therapist
  let filtered: string[] = therapists.filter((t: string) =>
    t.toLowerCase().includes(search.toLowerCase())
  );
  if (search && selected && filtered.includes(selected)) {
    filtered = [selected, ...filtered.filter((t: string) => t !== selected)];
  }

  // Always focus input after filtering or opening
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  }, [open, search]);

  // --- Add these states for client search ---
  const [clientSearch, setClientSearch] = useState<string>("");
  const [clientOpen, setClientOpen] = useState<boolean>(false);
  const [selectedClient, setSelectedClient] = useState<string | null>(null);
  const clientInputRef = useRef<HTMLInputElement>(null);

  // Filter and prioritize selected client
  let filteredClients: string[] = clients.filter((c: string) =>
    c.toLowerCase().includes(clientSearch.toLowerCase())
  );
  if (
    clientSearch &&
    selectedClient &&
    filteredClients.includes(selectedClient)
  ) {
    filteredClients = [
      selectedClient,
      ...filteredClients.filter((c: string) => c !== selectedClient),
    ];
  }

  // Always re-focus input after filtering or opening for client
  useEffect(() => {
    if (clientOpen) {
      setTimeout(() => clientInputRef.current?.focus(), 10);
    }
  }, [clientOpen, clientSearch]);

  // Handlers
  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) setSearch("");
  };
  const handleSelect = (value: string) => {
    setSelected(value);
    handleTherapist(value);
    setOpen(false);
  };

  // Handlers for client select
  const handleClientOpenChange = (isOpen: boolean) => {
    setClientOpen(isOpen);
    if (!isOpen) setClientSearch("");
  };
  const handleClientSelect = (value: string) => {
    setSelectedClient(value);
    handleClient(value);
    setClientOpen(false);
  };

  const handleClearTherapist = () => {
    handleTherapist(null);
    setSelected(null);
  };

  const handleClearClient = () => {
    handleClient(null);
    setSelectedClient(null);
    setSearch("");
    setClientSearch("");
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
        <Select
          value={selected || ""}
          onValueChange={handleSelect}
          open={open}
          onOpenChange={handleOpenChange}
        >
          <div className="relative">
            <SelectTrigger className="agenda-dropdown w-full cursor-pointer rounded-3xl shadow-none border-primary-beige text-base py-5">
              <SelectValue placeholder="Selecteer een therapeut" />
            </SelectTrigger>

            {/* clear button */}
            <button
              onClick={handleClearTherapist}
              className="absolute top-1/2 right-[35px] -translate-y-1/2 text-sm font-medium text-primary-beige opacity-[.5] rounded cursor-pointer"
            >
              <Image
                src="/icons/closeIcon.svg"
                width={10}
                height={10}
                alt="Close Icon"
              />
            </button>
          </div>

          <SelectContent className="bg-linear-to-r from-green3 to to-green3 border border-secondary-beige max-h-[300px] overflow-y-auto">
            <div
              className="px-2 py-2"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => e.stopPropagation()}
            >
              <input
                ref={inputRef}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Zoek therapeut..."
                className="w-full px-2 py-1 rounded border border-primary-beige bg-transparent text-primary-beige"
                onFocus={(e) => e.stopPropagation()}
                autoFocus
              />
            </div>
            {filtered.length > 0 ? (
              filtered.map((t: string) => (
                <SelectItem
                  key={t}
                  value={t}
                  className={`text-primary-beige ${
                    selected === t ? "bg-primary-beige text-rich-black" : ""
                  }`}
                >
                  {t}
                </SelectItem>
              ))
            ) : (
              <div className="px-2 py-2 text-primary-beige">
                Geen resultaten
              </div>
            )}
          </SelectContent>
        </Select>
        {/* Client select with search */}
        <Select
          value={selectedClient || ""}
          onValueChange={handleClientSelect}
          open={clientOpen}
          onOpenChange={handleClientOpenChange}
        >
          <div className="relative">
            <SelectTrigger className="agenda-dropdown w-full cursor-pointer rounded-3xl shadow-none border-primary-beige text-base py-5">
              <SelectValue placeholder="Selecteer een cliënt" />
            </SelectTrigger>

            {/* clear button */}
            <button
              onClick={handleClearClient}
              className="absolute top-1/2 right-[35px] -translate-y-1/2 text-sm font-medium text-primary-beige opacity-[.5] rounded cursor-pointer"
            >
              <Image
                src="/icons/closeIcon.svg"
                width={10}
                height={10}
                alt="Close Icon"
              />
            </button>
          </div>

          <SelectContent className="bg-linear-to-r from-green3 to to-green3 border border-secondary-beige max-h-[300px] overflow-y-auto">
            <div
              className="px-2 py-2"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => e.stopPropagation()}
            >
              <input
                ref={clientInputRef}
                value={clientSearch}
                onChange={(e) => setClientSearch(e.target.value)}
                placeholder="Zoek cliënt..."
                className="w-full px-2 py-1 rounded border border-primary-beige bg-transparent text-primary-beige"
                onFocus={(e) => e.stopPropagation()}
                autoFocus
              />
            </div>
            {filteredClients.length > 0 ? (
              filteredClients.map((client: string, idx: number) => (
                <SelectItem
                  key={client + idx}
                  value={client}
                  className={`text-primary-beige ${
                    selectedClient === client
                      ? "bg-primary-beige text-rich-black"
                      : ""
                  }`}
                >
                  {client}
                </SelectItem>
              ))
            ) : (
              <div className="px-2 py-2 text-primary-beige">
                Geen resultaten
              </div>
            )}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
