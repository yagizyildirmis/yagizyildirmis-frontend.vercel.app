import type { CampusEvent } from "../../types/campus-event";
import EventCard from "./EventCard";

function EventList({ events }: { events: CampusEvent[] }) {
  if (events.length === 0) {
    return <p className="bilgi">Gösterilecek etkinlik bulunamadı.</p>;
  }

  return (
    <section className="etkinlik-listesi" aria-label="Etkinlik listesi">
      {events.map((event) => <EventCard key={event.id} event={event} />)}
    </section>
  );
}

export default EventList;
