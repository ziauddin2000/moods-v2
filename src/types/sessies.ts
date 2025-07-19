export interface MenuItem {
  label: string;
  route: string;
}

export interface Room {
  name: string;
  role: string;
  url: string;
  image: string;
}

export interface PastSession {
  name: string;
  role: string;
  date: string;
  duration: string;
}

export interface PaginationProps {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
}

export interface CardProps {
  room: Room;
}

export interface RoomListProps {
  paginatedRooms: Room[];
}

export interface ListProps {
  paginatedRooms: PastSession[];
}
