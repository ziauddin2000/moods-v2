import { MenuItem } from "@/types/sessies";
import Link from "next/link";

export default function SideLink(): React.ReactElement {
  const leftMenu: MenuItem[] = [
    {
      label: "Nieuwe sessie",
      route: "/dashboard/sessies",
    },
    {
      label: "Vorige sessies",
      route: "/dashboard/sessies/pastsessies",
    },
    {
      label: "Rooms",
      route: "/dashboard/sessies",
    },
  ];

  return (
    <div>
      {leftMenu.map((item: MenuItem, idx: number) => (
        <Link
          key={idx}
          href={item.route}
          className="block py-4 text-primary-beige text-base font-medium border-b border-primary-beige hover:bg-[#37815b45] px-2"
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}
