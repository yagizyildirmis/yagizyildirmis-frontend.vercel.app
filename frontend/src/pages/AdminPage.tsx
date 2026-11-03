import { Link } from "react-router-dom";
import { useEvents } from "../context/EventsContext";
import { formatDate } from "../utils/format-date";

function AdminPage() {
  const { events, deleteEvent } = useEvents();

  function handleDelete(id: string, title: string) {
    if (window.confirm(`“${title}” etkinliğini silmek istiyor musunuz?`)) {
      deleteEvent(id);
    }
  }

  return (
    <>
      <div className="admin-baslik">
        <h2 className="bolum-baslik">Etkinlik Yönetimi</h2>
        <Link className="buton" to="/admin/new">+ Yeni etkinlik</Link>
      </div>
      {events.length === 0 ? (
        <p className="bilgi">Henüz etkinlik yok.</p>
      ) : (
        <table className="tablo">
          <thead>
            <tr><th>Etkinlik</th><th>Tarih</th><th>Kategori</th><th>İşlemler</th></tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id}>
                <td data-baslik="Etkinlik">{event.title}</td>
                <td data-baslik="Tarih">{formatDate(event.date)}</td>
                <td data-baslik="Kategori">{event.category}</td>
                <td data-baslik="İşlemler">
                  <div className="islemler">
                    <Link className="buton buton-kucuk" to={`/admin/${event.id}/edit`}>Düzenle</Link>
                    <button className="buton buton-kucuk buton-sil" type="button" onClick={() => handleDelete(event.id, event.title)}>Sil</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default AdminPage;
