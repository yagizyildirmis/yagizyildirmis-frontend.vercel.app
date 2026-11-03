import type { Category } from "../../types/campus-event";

interface EventFilterProps {
  searchText: string;
  onSearchChange: (value: string) => void;
  category: Category | "";
  onCategoryChange: (value: Category | "") => void;
  categories: Category[];
}

function EventFilter({
  searchText,
  onSearchChange,
  category,
  onCategoryChange,
  categories,
}: EventFilterProps) {
  return (
    <div className="filtre">
      <p className="alan">
        <label htmlFor="arama">Etkinlik ara</label>
        <input
          type="search"
          id="arama"
          placeholder="Örn. atölye, kariyer"
          value={searchText}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </p>
      <p className="alan">
        <label htmlFor="kategori-filtre">Kategori</label>
        <select
          id="kategori-filtre"
          value={category}
          onChange={(event) => onCategoryChange(event.target.value as Category | "")}
        >
          <option value="">Tümü</option>
          {categories.map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
      </p>
    </div>
  );
}

export default EventFilter;
