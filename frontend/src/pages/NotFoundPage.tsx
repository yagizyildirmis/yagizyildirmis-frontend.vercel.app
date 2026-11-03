import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <section className="hata-kutusu" role="status">
      <h2>Sayfa bulunamadı</h2>
      <p>Aradığınız sayfa ya da etkinlik mevcut değil.</p>
      <Link className="buton" to="/">Ana sayfaya dön</Link>
    </section>
  );
}

export default NotFoundPage;
