export type DataItem = {
  therapist: string;
  client: string;
};

export interface TimeSlot {
  slot: string;
  booked: boolean;
}

export interface CalendarEvent {
  title: string;
  start: string;
  end: string;
  description: string;
  therapist: string;
  client: string;
}

export interface DateClickInfo {
  dateStr: string;
}

export interface EventInfo {
  event: {
    title: string;
    start: Date | null;
    end: Date | null;
    extendedProps: {
      description: string;
    };
  };
}

export interface ProfileProps {
  data: DataItem[];
  handleTherapist: (therapist: string | null) => void;
  handleClient: (client: string | null) => void;
}
