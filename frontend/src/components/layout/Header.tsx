import { useEffect } from "react";
import { matchPath, useLocation } from "react-router-dom";
import { useEvents } from "../../context/EventsContext";
import { findEventById } from "../../utils/filter-events";
import type { CampusEvent } from "../../types/campus-event";

const SITE_NAME = "Kampüs Etkinlikleri";

interface HeaderContent {
  title: string;
  description: string;
}

function getHeaderContent(pathname: string, events: CampusEvent[]): HeaderContent {
  const path = pathname.replace(/\/+$/, "") || "/";

  if (path === "/") {
    return {
      title: SITE_NAME,
      description: "Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.",
    };
  }

  if (path === "/events") {
    return {
      title: "Etkinlikler",
      description: "Fakültenizdeki etkinlikleri arayın ve kategorilere göre filtreleyin.",
    };
  }

  const eventDetailMatch = matchPath("/events/:id", path);
  if (eventDetailMatch) {
    const event = findEventById(events, eventDetailMatch.params.id ?? "");
    return event
      ? { title: "Etkinlik Detayı", description: event.title }
      : { title: "Sayfa bulunamadı", description: "Aradığınız etkinlik mevcut değil." };
  }

  if (path === "/login") {
    return { title: "Giriş Yap", description: "Hesabınıza erişmek için bilgilerinizi girin." };
  }

  if (path === "/register") {
    return { title: "Kayıt Ol", description: "Kampüs etkinliklerini takip etmek için hesap oluşturun." };
  }

  if (path === "/forgot-password") {
    return { title: "Şifremi Unuttum", description: "Yenileme bağlantısı istemek için e-posta adresinizi girin." };
  }

  if (path === "/admin") {
    return { title: "Etkinlik Yönetimi", description: "Kampüs etkinliklerini buradan yönetin." };
  }

  if (path === "/admin/new") {
    return { title: "Etkinlik Ekle", description: "Yeni bir kampüs etkinliği oluşturun." };
  }

  const editMatch = matchPath("/admin/:id/edit", path);
  if (editMatch) {
    const event = findEventById(events, editMatch.params.id ?? "");
    return event
      ? { title: "Etkinlik Güncelle", description: `${event.title} etkinliğinin bilgilerini düzenleyin.` }
      : { title: "Sayfa bulunamadı", description: "Düzenlenecek etkinlik mevcut değil." };
  }

  return { title: "Sayfa bulunamadı", description: "Aradığınız sayfa mevcut değil." };
}

function Header() {
  const { pathname } = useLocation();
  const { events } = useEvents();
  const content = getHeaderContent(pathname, events);
  const tabTitle = content.title === SITE_NAME
    ? `${SITE_NAME} | Vize`
    : `${content.title} | ${SITE_NAME} | Vize`;

  useEffect(() => {
    document.title = tabTitle;
  }, [tabTitle]);

  return (
    <header className="site-baslik">
      {content.title !== SITE_NAME && <p className="site-marka">{SITE_NAME}</p>}
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </header>
  );
}

export default Header;