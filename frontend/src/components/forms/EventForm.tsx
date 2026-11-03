import { useState, type ChangeEvent, type FormEvent } from "react";
import type { Category, EventFormData, EventFormErrors } from "../../types/campus-event";
import { validateEvent } from "../../utils/validate-event";

const categories: Category[] = ["Seminer", "Atölye", "Söyleşi", "Yarışma"];

interface EventFormProps {
  initialData: EventFormData;
  submitText: string;
  onSubmit: (data: EventFormData) => void;
}

function EventForm({ initialData, submitText, onSubmit }: EventFormProps) {
  const [data, setData] = useState<EventFormData>(initialData);
  const [errors, setErrors] = useState<EventFormErrors>({});

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = event.target;
    setData((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = validateEvent(data);
    setErrors(found);
    if (Object.keys(found).length === 0) onSubmit(data);
  }

  return (
    <form className="form" noValidate onSubmit={handleSubmit}>
      <p className="alan">
        <label htmlFor="title">Etkinlik Adı *</label>
        <input id="title" name="title" value={data.title} onChange={handleChange} maxLength={80} aria-invalid={errors.title ? true : undefined} aria-describedby="title-error" />
        <span className="alan-hata" id="title-error">{errors.title}</span>
      </p>
      <p className="alan">
        <label htmlFor="category">Kategori *</label>
        <select id="category" name="category" value={data.category} onChange={handleChange} aria-invalid={errors.category ? true : undefined} aria-describedby="category-error">
          <option value="">Seçiniz</option>
          {categories.map((category) => <option key={category} value={category}>{category}</option>)}
        </select>
        <span className="alan-hata" id="category-error">{errors.category}</span>
      </p>
      <p className="alan">
        <label htmlFor="date">Tarih *</label>
        <input id="date" name="date" type="date" value={data.date} onChange={handleChange} aria-invalid={errors.date ? true : undefined} aria-describedby="date-error" />
        <span className="alan-hata" id="date-error">{errors.date}</span>
      </p>
      <p className="alan">
        <label htmlFor="time">Saat *</label>
        <input id="time" name="time" type="time" value={data.time} onChange={handleChange} aria-invalid={errors.time ? true : undefined} aria-describedby="time-error" />
        <span className="alan-hata" id="time-error">{errors.time}</span>
      </p>
      <p className="alan">
        <label htmlFor="location">Yer *</label>
        <input id="location" name="location" value={data.location} onChange={handleChange} maxLength={80} aria-invalid={errors.location ? true : undefined} aria-describedby="location-error" />
        <span className="alan-hata" id="location-error">{errors.location}</span>
      </p>
      <p className="alan">
        <label htmlFor="capacity">Kontenjan *</label>
        <input id="capacity" name="capacity" type="number" min={1} max={1000} step={1} value={data.capacity} onChange={handleChange} aria-invalid={errors.capacity ? true : undefined} aria-describedby="capacity-error" />
        <span className="alan-hata" id="capacity-error">{errors.capacity}</span>
      </p>
      <p className="alan">
        <label htmlFor="description">Açıklama *</label>
        <textarea id="description" name="description" rows={5} maxLength={500} value={data.description} onChange={handleChange} aria-invalid={errors.description ? true : undefined} aria-describedby="description-error" />
        <span className="alan-hata" id="description-error">{errors.description}</span>
      </p>
      <p className="form-butonlar"><button type="submit" className="buton">{submitText}</button></p>
    </form>
  );
}

export default EventForm;
