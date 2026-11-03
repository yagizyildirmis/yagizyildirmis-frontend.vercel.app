import { NavLink } from "react-router-dom";

const menuItems = [
  { to: "/", label: "Ana Sayfa", end: true },
  { to: "/events", label: "Etkinlikler" },
  { to: "/admin", label: "Yönetim" },
  { to: "/login", label: "Giriş" },
];

function Navigation() {
  return (
    <nav className="menu" aria-label="Ana menü">
      <ul>
        {menuItems.map((item) => (
          <li key={item.to}>
            <NavLink to={item.to} end={item.end}>
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navigation;
