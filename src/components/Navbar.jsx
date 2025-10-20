import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar(){
  const tab = ({ isActive }) => "sr-tab" + (isActive ? " active" : "");

  return (
    <header className="sr-navbar">
      <div className="sr-row">
        <Link to="/" aria-label="MEDIAZION" className="sr-brand">
          <span className="sr-wordmark" aria-hidden="true">MEDIAZION</span>
          <span className="sr-brand-title sr-hidden-mobile">Centro Institucional</span>
        </Link>

        <nav className="sr-tabs" aria-label="Navegación principal">
          <NavLink to="/" end className={tab}>Inicio</NavLink>
          <NavLink to="/quienes-somos" className={tab}>Quiénes somos</NavLink>
          <NavLink to="/servicios" className={tab}>Servicios</NavLink>
          <NavLink to="/mediadores" className={tab}>Mediadores</NavLink>
          <NavLink to="/tarifas" className={tab}>Tarifas</NavLink>
          <NavLink to="/contacto" className={tab}>Contacto</NavLink>
        </nav>
      </div>
      <div className="sr-navbar-underline" />
    </header>
  );
}
