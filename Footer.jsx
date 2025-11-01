// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="sr-footer">
      <div className="sr-footer-row">
        {/* Col 1 — Marca y contacto */}
        <div className="sr-footer-col">
          <div className="sr-footer-brand">
            <img src="/logo.png?v=2" alt="MEDIAZION" />
            <span>MEDIAZION</span>
          </div>
          <p className="sr-footer-text">
            Centro de Mediación y Resolución de Conflictos.
          </p>
          <p className="sr-footer-text">
            <a className="sr-footer-link" href="mailto:info@mediazion.eu">info@mediazion.eu</a>
          </p>
        </div>

        {/* Col 2 — Navegación */}
        <div className="sr-footer-col">
          <h4 className="sr-footer-title">Navegación</h4>
          <ul className="sr-footer-list">
            <li><Link className="sr-footer-link" to="/servicios">Servicios</Link></li>
            <li><Link className="sr-footer-link" to="/mediadores">Mediadores</Link></li>
            <li><Link className="sr-footer-link" to="/mediadores/alta">Alta de mediadores</Link></li>
            <li><Link className="sr-footer-link" to="/mediadores/directorio">Directorio</Link></li>
            <li><Link className="sr-footer-link" to="/actualidad">Actualidad</Link></li>
            <li><Link className="sr-footer-link" to="/tarifas">Tarifas</Link></li>
            <li><Link className="sr-footer-link" to="/contacto">Contacto</Link></li>
          </ul>
        </div>

        {/* Col 3 — Legal */}
        <div className="sr-footer-col">
          <h4 className="sr-footer-title">Legal</h4>
          <ul className="sr-footer-list">
            <li><Link className="sr-footer-link" to="/aviso-legal">Aviso legal</Link></li>
            <li><Link className="sr-footer-link" to="/rgpd">Protección de datos (RGPD)</Link></li>
            <li><Link className="sr-footer-link" to="/cookies">Política de cookies</Link></li>
          </ul>
        </div>
      </div>

      <div className="sr-footer-bottom">
        <p>© {new Date().getFullYear()} MEDIAZION · Todos los derechos reservados</p>
      </div>
    </footer>
  );
}
