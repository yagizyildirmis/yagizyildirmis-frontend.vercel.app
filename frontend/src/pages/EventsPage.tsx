import { useState } from "react";
import { useEvents } from "../context/EventsContext";
import type { Category } from "../types/campus-event";
import { filterByCategory, searchEvents } from "../utils/filter-events";
import EventFilter from "../components/events/EventFilter";
import EventList from "../components/events/EventList";

function EventsPage() {
  const { events } = useEvents();
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");
  const categories = [...new Set(events.map((event) => event.category))];
  const filtered = filterByCategory(searchEvents(events, searchText), category);

  return (
    <>
      <h2 className="bolum-baslik">Tüm Etkinlikler</h2>
      <EventFilter
        searchText={searchText}
        onSearchChange={setSearchText}
        category={category}
        onCategoryChange={setCategory}
        categories={categories}
      />
      <p className="sonuc" role="status">
        {filtered.length === 0 ? "Aradığınız kriterlere uygun etkinlik bulunamadı." : `${filtered.length} etkinlik listeleniyor.`}
      </p>
      <EventList events={filtered} />
    </>
  );
}

export default EventsPage;
