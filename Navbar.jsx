import React from "react";
import { Link } from "react-router-dom";
import logo from "/logo.png";

export default function Navbar() {
  return (
    <nav className="bg-blue-900 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4 py-3">
        <div className="flex items-center gap-3">
          <img src={logo} alt="MEDIAZION" className="h-10 w-auto" />
          <Link to="/" className="text-xl font-semibold tracking-wide">
            MEDIAZION
          </Link>
        </div>
        <div className="space-x-6 text-sm font-medium">
          <Link to="/" className="hover:text-blue-200">Inicio</Link>
          <Link to="/quienes-somos" className="hover:text-blue-200">Quiénes somos</Link>
          <Link to="/servicios" className="hover:text-blue-200">Servicios</Link>
          <Link to="/mediadores" className="hover:text-blue-200">Mediadores</Link>
          <Link to="/tarifas" className="hover:text-blue-200">Tarifas</Link>
          <Link to="/contacto" className="hover:text-blue-200">Contacto</Link>
          <Link to="/actualidad" className="hover:text-blue-200">Actualidad</Link>
        </div>
      </div>
    </nav>
  );
}
