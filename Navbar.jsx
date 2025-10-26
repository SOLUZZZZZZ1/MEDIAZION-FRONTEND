import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar(){
  const tab = ({ isActive }) => "sr-tab" + (isActive ? " active" : "");
  return (
    <header className="sr-navbar">
      <div className="sr-inner sr-container">
        <Link to="/" className="sr-brand" aria-label="MEDIAZION">
          <img src="/logo.png" alt="MEDIAZION" style={{ width: 36, height: 36 }} />
          <div>
            <div className="sr-wordmark">MEDIAZION</div>
            <div className="sr-brand-title">Centro de mediación y resolución de conflictos</div>
          </div>
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
      </div>
    </header>
  );
}
