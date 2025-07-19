import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ListProps } from "@/types/sessies";

export default function List({ paginatedRooms }: ListProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="text-primary-beige text-sm font-normal">
          <TableCell>NAAM</TableCell>
          <TableCell className="text-center">FUNCTIE</TableCell>
          <TableCell className="text-center">DATUM</TableCell>
          <TableCell className="text-center">DUUR</TableCell>
          <TableCell className="text-right">STATUS</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody className="text-primary-beige text-sm font-normal">
        {paginatedRooms.map((room, i) => (
          <TableRow key={i}>
            <TableCell>{room.name}</TableCell>
            <TableCell className="text-center">{room.role}</TableCell>
            <TableCell className="text-center">{room.date}</TableCell>
            <TableCell className="text-center">{room.duration}</TableCell>
            <TableCell className="text-right">
              <span className="px-4 py-1 bg-green5 text-primary-beige rounded-full">
                Verslag
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
