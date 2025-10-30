// src/pages/Mediadores.jsx
import React from "react";

export default function Mediadores() {
  return (
    <main
      className="min-h-[calc(100vh-80px)]"
      style={{
        backgroundImage: "url('/marmol.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        padding: "40px 20px"
      }}
    >
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          background: "rgba(255,255,255,0.95)",
          borderRadius: "16px",
          padding: "28px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.1)"
        }}
      >
        <h1 className="sr-h1 mb-2">Mediadores</h1>
        <p className="sr-p">En <strong>MEDIAZION</strong> colaboramos con mediadores profesionales acreditados en las áreas civil, mercantil, familiar, comunitaria y empresarial.</p>

        <div className="sr-card" style={{ background:"rgba(255,255,255,0.98)" }}>
          <h2 className="sr-h2">Alta de mediadores</h2>
          <p className="sr-p">
            Regístrate gratis y califica para empezar a recibir casos. Tras verificar tu perfil podrás activar tu 
            <strong> suscripción profesional con 7 días de prueba</strong> (49,90 €/mes, cancela cuando quieras).
          </p>
          <div style={{ display:"flex", gap:12, flexWrap:"wrap", marginTop: 8 }}>
            <a className="sr-btn-primary" href="/mediadores/alta">Quiero darme de alta</a>
            <a className="sr-btn-secondary" href="/mediadores/alta">Activar 7 días gratis</a>
          </div>
        </div>

        <section className="sr-card mt-6" style={{ background:"rgba(255,255,255,0.98)" }}>
          <h2 className="sr-h2">Compromiso profesional</h2>
          <ul className="sr-p" style={{ marginLeft: 18, listStyle: "disc" }}>
            <li>Confidencialidad y protección de datos.</li>
            <li>Neutralidad e imparcialidad en todas las intervenciones.</li>
            <li>Formación y actualización permanente.</li>
            <li>Supervisión y acompañamiento institucional.</li>
          </ul>
        </section>

        <section className="sr-card mt-6" style={{ background:"rgba(255,255,255,0.98)" }}>
          <h2 className="sr-h2">Ámbitos de actuación</h2>
          <div className="sr-grid-3">
            <div>
              <h3 className="sr-h3">Civil y familiar</h3>
              <p className="sr-p">Herencias, divorcio, custodia, y conflictos vecinales.</p>
            </div>
            <div>
              <h3 className="sr-h3">Mercantil y societario</h3>
              <p className="sr-p">Contratos, proveedores, juntas, socios, mediación concursal.</p>
            </div>
            <div>
              <h3 className="sr-h3">Laboral y organizacional</h3>
              <p className="sr-p">Disputas internas, clima laboral, procedimientos de resolución.</p>
            </div>
          </div>
        </section>

        <section className="sr-card mt-6" style={{ background:"rgba(255,255,255,0.98)" }}>
          <h2 className="sr-h2">Directorio de mediadores</h2>
          <p className="sr-p">
            Consulta el <a href="/directorio" className="text-blue-700 underline">listado público de mediadores</a> acreditados por MEDIAZION.
          </p>
          <div className="mt-2">
            <a className="sr-btn-secondary" href="/directorio">Ver directorio</a>
          </div>
        </div>
      </div>
    </main>
  );
}
