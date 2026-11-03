import { createContext, useContext, useState, type ReactNode } from "react";
import { events as initialEvents } from "../data/events";
import type { CampusEvent, Category, EventFormData } from "../types/campus-event";

interface EventsContextValue {
  events: CampusEvent[];
  addEvent: (data: EventFormData) => void;
  updateEvent: (id: string, data: EventFormData) => void;
  deleteEvent: (id: string) => void;
}

const EventsContext = createContext<EventsContextValue | null>(null);

function toCampusEvent(
  id: string,
  data: EventFormData,
  image?: string,
): CampusEvent {
  return {
    id,
    title: data.title.trim(),
    category: data.category as Category,
    date: data.date,
    time: data.time,
    location: data.location.trim(),
    capacity: Number(data.capacity),
    description: data.description.trim(),
    ...(image ? { image } : {}),
  };
}

export function EventsProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<CampusEvent[]>(initialEvents);

  function addEvent(data: EventFormData) {
    setEvents((current) => [
      ...current,
      toCampusEvent(`event-${Date.now()}`, data),
    ]);
  }

  function updateEvent(id: string, data: EventFormData) {
    setEvents((current) =>
      current.map((event) =>
        event.id === id ? toCampusEvent(id, data, event.image) : event,
      ),
    );
  }

  function deleteEvent(id: string) {
    setEvents((current) => current.filter((event) => event.id !== id));
  }

  return (
    <EventsContext.Provider value={{ events, addEvent, updateEvent, deleteEvent }}>
      {children}
    </EventsContext.Provider>
  );
}

export function useEvents(): EventsContextValue {
  const value = useContext(EventsContext);
  if (value === null) {
    throw new Error("useEvents, EventsProvider içinde kullanılmalıdır.");
  }
  return value;
}
