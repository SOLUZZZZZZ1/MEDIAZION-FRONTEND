// src/components/Navbar.jsx
import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar(){
  const tab = ({ isActive }) => "sr-tab" + (isActive ? " active" : "");

  // conmutador de tema (opcional)
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "soft");
  useEffect(()=>{
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggle = () => setTheme(t => t === "soft" ? "classic" : "soft");

  return (
    <header className="sr-navbar">
      <div className="sr-row">
        <Link to="/" aria-label="MEDIAZION" className="sr-brand">
          <span className="sr-wordmark">MEDIAZION</span>
          <span className="sr-brand-title hidden lg:inline">Centro de mediación y resolución de conflictos</span>
        </Link>

        <nav className="sr-tabs" aria-label="Navegación principal">
          <NavLink to="/" end className={tab}>Inicio</NavLink>
          <NavLink to="/quienes-somos" className={tab}>Quiénes somos</NavLink>
          <NavLink to="/servicios" className={tab}>Servicios</NavLink>
          <NavLink to="/mediadores" className={tab}>Mediadores</NavLink>
          <NavLink to="/tarifas" className={tab}>Tarifas</NavLink>
          <NavLink to="/contacto" className={tab}>Contacto</NavLink>
          <NavLink to="/actualidad" className={tab}>Actualidad</NavLink>
        </nav>

        <button onClick={toggle} className="sr-btn-secondary" style={{marginLeft:12}}>
          {theme === "soft" ? "Tema clásico" : "Tema suave"}
        </button>
      </div>
    </header>
  );
}
