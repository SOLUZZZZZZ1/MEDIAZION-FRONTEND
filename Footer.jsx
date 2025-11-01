// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer
      className="mt-12"
      style={{
        background: "#0f172a",
        color: "white",
        padding: "28px 0",
        borderTop: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div
        className="sr-container"
        style={{ display: "grid", gap: 20, gridTemplateColumns: "repeat(3, minmax(0,1fr))" }}
      >
        {/* Mediazion */}
        <div>
          <h4 style={{ margin: 0, marginBottom: 8, fontSize: 16, fontWeight: 800 }}>MEDIAZION</h4>
          <ul style={{ margin: 0, padding: 0, listStyle: "none", lineHeight: 1.9 }}>
            <li><Link to="/" style={{ color: "#e5e7eb", textDecoration: "none" }}>Inicio</Link></li>
            <li><Link to="/quienes-somos" style={{ color: "#e5e7eb", textDecoration: "none" }}>Quiénes somos</Link></li>
            <li><Link to="/servicios" style={{ color: "#e5e7eb", textDecoration: "none" }}>Servicios</Link></li>
            <li><Link to="/mediadores" style={{ color: "#e5e7eb", textDecoration: "none" }}>Mediadores</Link></li>
            <li><Link to="/mediadores/directorio" style={{ color: "#e5e7eb", textDecoration: "none" }}>Directorio</Link></li>
            <li><Link to="/tarifas" style={{ color: "#e5e7eb", textDecoration: "none" }}>Tarifas</Link></li>
            <li><Link to="/actualidad" style={{ color: "#e5e7eb", textDecoration: "none" }}>Actualidad</Link></li>
            <li><Link to="/contacto" style={{ color: "#e5e7eb", textDecoration: "none" }}>Contacto</Link></li>
          </ul>
        </div>

        {/* Mediadores */}
        <div>
          <h4 style={{ margin: 0, marginBottom: 8, fontSize: 16, fontWeight: 800 }}>Mediadores</h4>
          <ul style={{ margin: 0, padding: 0, listStyle: "none", lineHeight: 1.9 }}>
            <li><Link to="/mediadores/alta" style={{ color: "#e5e7eb", textDecoration: "none" }}>Alta de mediadores</Link></li>
            <li><Link to="/mediadores/directorio" style={{ color: "#e5e7eb", textDecoration: "none" }}>Directorio</Link></li>
            <li><Link to="/mediadores/panel" style={{ color: "#e5e7eb", textDecoration: "none" }}>Área privada</Link></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 style={{ margin: 0, marginBottom: 8, fontSize: 16, fontWeight: 800 }}>Legal</h4>
          <ul style={{ margin: 0, padding: 0, listStyle: "none", lineHeight: 1.9 }}>
            <li><Link to="/aviso-legal" style={{ color: "#e5e7eb", textDecoration: "none" }}>Aviso legal</Link></li>
            <li><Link to="/rgpd" style={{ color: "#e5e7eb", textDecoration: "none" }}>Protección de datos</Link></li>
            <li><Link to="/cookies" style={{ color: "#e5e7eb", textDecoration: "none" }}>Política de cookies</Link></li>
          </ul>
        </div>
      </div>

      <div className="sr-container" style={{ marginTop: 16, fontSize: 12, opacity: 0.8 }}>
        © {new Date().getFullYear()} MEDIAZION · Centro de Mediación y Resolución de Conflictos
      </div>
    </footer>
  );
}
