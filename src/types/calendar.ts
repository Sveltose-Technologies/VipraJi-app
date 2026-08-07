export type EventType = 'task' | 'pooja' | 'festival';
export type EventStatus = 'completed' | 'upcoming' | 'cancelled' | 'festival';

export interface CalendarEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  time?: string; // HH:mm
  type: EventType;
  status: EventStatus;
  description?: string;
}
