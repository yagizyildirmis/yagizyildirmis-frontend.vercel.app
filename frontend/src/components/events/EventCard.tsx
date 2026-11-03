import { Link } from "react-router-dom";
import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

function EventCard({ event }: { event: CampusEvent }) {
  return (
    <article className="kart">
      <h2>{event.title}</h2>
      <span className="kart-kategori">{event.category}</span>
      <p>Tarih: {formatDate(event.date)}, {event.time}</p>
      <p>Yer: {event.location}</p>
      <p>Kontenjan: {event.capacity} kişi</p>
      <p>{event.description}</p>
      <p>
        <Link className="kart-link" to={`/events/${event.id}`}>
          Detayları gör
        </Link>
      </p>
    </article>
  );
}

export default EventCard;
