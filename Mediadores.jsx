// src/pages/Mediadores.jsx
import React from "react";
import Seo from "../components/Seo.jsx";

export default function Mediadores() {
  return (
    <main
      className="sr-container py-12"
      style={{
        backgroundImage: "url('/marmol.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Seo
        title="Mediadores · MEDIAZION"
        description="Colabora como mediador/a en MEDIAZION. Formación continua, seguimiento de casos y acceso a plataforma profesional."
        canonical="https://mediazion.eu/mediadores"
      />
      <h1 className="sr-h1 mb-2">Mediadores</h1>
      <p className="sr-p mb-6">Alta de mediadores</p>

      <p className="sr-p mb-6">
        En <strong>MEDIAZION</strong> colaboramos con mediadores profesionales acreditados en distintas áreas:
        civil, mercantil, familiar, comunitaria y empresarial.
      </p>

      <p className="sr-p mb-8">
        Nuestra red de mediadores cumple con los estándares del Centro de Mediación y cuenta con
        formación continua, seguimiento de casos y acreditación oficial. Si eres mediador o mediadora
        y deseas formar parte de nuestro equipo, puedes darte de alta utilizando el botón anterior.
      </p>

      <section className="sr-card mb-8" style={{ background: "rgba(255,255,255,.95)" }}>
        <h2 className="sr-h2 mb-2">Compromiso profesional</h2>
        <ul className="sr-p" style={{ marginLeft: 18, listStyle: "disc" }}>
          <li>Confidencialidad absoluta y protección de datos.</li>
          <li>Neutralidad e imparcialidad en todas las intervenciones.</li>
          <li>Formación y actualización permanente en mediación.</li>
          <li>Supervisión y acompañamiento institucional.</li>
        </ul>
      </section>

      <section className="sr-card mb-8" style={{ background: "rgba(255,255,255,.95)" }}>
        <h2 className="sr-h2 mb-2">Ámbitos de actuación</h2>
        <div className="sr-grid-3">
          <div>
            <h3 className="sr-h3">Civil y familiar</h3>
            <p className="sr-p">Conflictos vecinales, herencias, custodia, alimentos y arrendamientos.</p>
          </div>
          <div>
            <h3 className="sr-h3">Mercantil y societario</h3>
            <p className="sr-p">Disputas entre socios, contratos, proveedores y responsabilidad empresarial.</p>
          </div>
          <div>
            <h3 className="sr-h3">Laboral y organizacional</h3>
            <p className="sr-p">Conflictos internos, clima laboral, liderazgo y cultura de empresa.</p>
          </div>
        </div>
      </section>

      <section className="sr-card" style={{ background: "rgba(255,255,255,.95)" }}>
        <h2 className="sr-h2 mb-3">Accesos</h2>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <a href="/mediadores/alta" className="sr-btn-primary">Alta de mediadores</a>
          <a href="/mediadores/directorio" className="sr-btn-secondary">Ver directorio</a>
          <a href="/admin" className="sr-btn-secondary">Acceder al área privada</a>
        </div>
      </section>
    </main>
  );
}
