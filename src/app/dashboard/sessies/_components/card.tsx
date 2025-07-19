import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CardProps } from "@/types/sessies";
import Image from "next/image";

export default function Card({ room }: CardProps) {
  return (
    <Link
      target="_blank"
      href={room.url}
      className="flex flex-col items-center p-4 border border-secondary-beige rounded-[14px] relative hover:bg-[#37815b5e]"
    >
      <Image
        src={room.image}
        alt={room.name}
        width={140}
        height={140}
        className="w-35 h-35 rounded-full mb-3"
      />

      <div className="font-medium text-lg text-primary-beige">{room.name}</div>
      <div className="text-base text-secondary-beige">{room.role}</div>

      <div className="absolute top-2 left-4 h-[30px] w-[30px] flex items-center justify-center card-dot-wrapper">
        <DropdownMenu>
          <DropdownMenuTrigger onClick={(e) => e.stopPropagation()}>
            <Image src="/icons/dotIcon.svg" alt="Dot" width={20} height={20} />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            onClick={(e) => e.stopPropagation()}
            className="bg-green1 border-0 text-primary-beige"
            side="bottom"
            align="start"
            sideOffset={0}
            alignOffset={-10}
          >
            <DropdownMenuLabel>
              <Link
                target="_blank"
                href={room.url}
                className="flex items-center gap-2 text-sm text-primary-beige"
              >
                <Image
                  src="/icons/profileCircle.svg"
                  alt="Profile Circle"
                  width={20}
                  height={20}
                />
                <span>Profiel bekijken</span>
              </Link>
            </DropdownMenuLabel>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Image
        src="/icons/topRightIcon.svg"
        alt="Top Right Icons"
        width={20}
        height={20}
        className="absolute top-4 right-4"
      />
    </Link>
  );
}
