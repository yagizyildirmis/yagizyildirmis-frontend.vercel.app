import { Link, useNavigate, useParams } from "react-router-dom";
import EventForm from "../components/forms/EventForm";
import { useEvents } from "../context/EventsContext";
import { findEventById } from "../utils/filter-events";
import type { EventFormData } from "../types/campus-event";
import NotFoundPage from "./NotFoundPage";

function EditEventPage() {
  const { id } = useParams();
  const { events, updateEvent } = useEvents();
  const navigate = useNavigate();
  const event = findEventById(events, id ?? "");

  if (!event || !id) return <NotFoundPage />;
  const eventId = id;

  const initialData: EventFormData = {
    title: event.title,
    category: event.category,
    date: event.date,
    time: event.time,
    location: event.location,
    capacity: String(event.capacity),
    description: event.description,
  };

  function handleSubmit(data: EventFormData) {
    updateEvent(eventId, data);
    navigate("/admin");
  }

  return (
    <>
      <h2 className="bolum-baslik">Etkinlik Güncelle</h2>
      <p className="bilgi">Yıldızlı (*) alanlar zorunludur.</p>
      <EventForm initialData={initialData} submitText="Güncelle" onSubmit={handleSubmit} />
      <p><Link className="kart-link" to="/admin">← Vazgeç</Link></p>
    </>
  );
}

export default EditEventPage;
