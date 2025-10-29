// src/components/Footer.jsx
import React from "react";

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
      <div className="sr-container" style={{ display: "grid", gap: 20, gridTemplateColumns: "repeat(3, minmax(0,1fr))" }}>
        {/* Mediazion */}
        <div>
          <h4 style={{ margin: 0, marginBottom: 8, fontSize: 16, fontWeight: 800 }}>MEDIAZION</h4>
          <ul style={{ margin: 0, padding: 0, listStyle: "none", lineHeight: 1.9 }}>
            <li><a href="/" style={{ color: "#e5e7eb", textDecoration: "none" }}>Inicio</a></li>
            <li><a href="/quienes-somos" style={{ color: "#e5e7eb", textDecoration: "none" }}>Quiénes somos</a></li>
            <li><a href="/servicios" style={{ color: "#e5e7eb", textDecoration: "none" }}>Servicios</a></li>
            <li><a href="/mediadores" style={{ color: "#e5e7eb", textDecoration: "none" }}>Mediadores</a></li>
            <li><a href="/mediadores/directorio" style={{ color: "#e5e7eb", textDecoration: "none" }}>Directorio</a></li>
            <li><a href="/tarifas" style={{ color: "#e5e7eb", textDecoration: "none" }}>Tarifas</a></li>
            <li><a href="/actualidad" style={{ color: "#e5e7eb", textDecoration: "none" }}>Actualidad</a></li>
            <li><a href="/contacto" style={{ color: "#e5e7eb", textDecoration: "none" }}>Contacto</a></li>
          </ul>
        </div>

        {/* Mediadores */}
        <div>
          <h4 style={{ margin: 0, marginBottom: 8, fontSize: 16, fontWeight: 800 }}>Mediadores</h4>
          <ul style={{ margin: 0, padding: 0, listStyle: "none", lineHeight: 1.9 }}>
            <li><a href="/mediadores/alta" style={{ color: "#e5e7eb", textDecoration: "none" }}>Alta de mediadores</a></li>
            <li><a href="/panel-mediador" style={{ color: "#e5e7eb", textDecoration: "none" }}>Área privada</a></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 style={{ margin: 0, marginBottom: 8, fontSize: 16, fontWeight: 800 }}>Legal</h4>
          <ul style={{ margin: 0, padding: 0, listStyle: "none", lineHeight: 1.9 }}>
            <li><a href="/aviso-legal" style={{ color: "#e5e7eb", textDecoration: "none" }}>Aviso legal</a></li>
            <li><a href="/rgpd" style={{ color: "#e5e7eb", textDecoration: "none" }}>Protección de datos</a></li>
            <li><a href="/cookies" style={{ color: "#e5e7eb", textDecoration: "none" }}>Política de cookies</a></li>
          </ul>
        </div>
      </div>

      <div className="sr-container" style={{ marginTop: 16, fontSize: 12, opacity: 0.8 }}>
        © {new Date().getFullYear()} MEDIAZION · Centro de Mediación y Resolución de Conflictos
      </div>
    </footer>
  );
}
