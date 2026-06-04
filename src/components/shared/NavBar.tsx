import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const LINKS = [
  { to: "/",        label: "Inicio" },
  { to: "/sedes",   label: "Sedes"  },
  { to: "/equipos", label: "Equipos" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "navbar--solid" : ""}`}>
      {/* Logo */}
      <NavLink to="/" className="navbar__logo">
        
        <span className="navbar__logo-text">MUNDIAL <span className="navbar__logo-year">2026</span></span>
      </NavLink>

      {/* Links */}
      <div className="navbar__links">
        {LINKS.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              `navbar__link ${isActive ? "navbar__link--active" : ""}`
            }
          >
            {label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}