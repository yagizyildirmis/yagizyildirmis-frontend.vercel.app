import { Link, useNavigate } from "react-router-dom";
import EventForm from "../components/forms/EventForm";
import { useEvents } from "../context/EventsContext";
import type { EventFormData } from "../types/campus-event";

const emptyForm: EventFormData = {
  title: "",
  category: "",
  date: "",
  time: "",
  location: "",
  capacity: "",
  description: "",
};

function AddEventPage() {
  const { addEvent } = useEvents();
  const navigate = useNavigate();

  function handleSubmit(data: EventFormData) {
    addEvent(data);
    navigate("/admin");
  }

  return (
    <>
      <h2 className="bolum-baslik">Etkinlik Ekle</h2>
      <p className="bilgi">Yıldızlı (*) alanlar zorunludur.</p>
      <EventForm initialData={emptyForm} submitText="Kaydet" onSubmit={handleSubmit} />
      <p><Link className="kart-link" to="/admin">← Yönetim sayfasına dön</Link></p>
    </>
  );
}

export default AddEventPage;
