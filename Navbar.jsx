// src/components/Navbar.jsx
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const tab = ({ isActive }) => "sr-tab" + (isActive ? " active" : "");

  return (
    <header className="sr-navbar">{/* franja oscura, definido en tu CSS */ }
      <div className="sr-row">
        {/* Marca solo texto, sin logotipo pequeño */}
        <Link to="/" aria-label="MEDIAZION" className="sr-brand">
          <span className="sr-brand-title">MEDIAZION</span>
        </Link>

        {/* Pestañas alineadas a la derecha */}
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
      <div className="sr-navbar-underline" />
    </header>
  );
}
