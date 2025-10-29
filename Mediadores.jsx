// src/pages/Mediadores.jsx
import React from "react";
import Seo from "../components/Seo.jsx";

export default function Mediadores() {
  return (
    <>
      <Seo
        title="Mediadores · MEDIAZION"
        description="En MEDIAZION colaboramos con mediadores profesionales acreditados en ámbitos civil, mercantil, familiar y organizacional. Red con formación continua y supervisión."
        canonical="https://mediazion.eu/mediadores"
      />
      <main className="sr-container py-12 text-zinc-800">
        <h1 className="sr-h1 mb-2">Mediadores</h1>
        <p className="sr-p mb-6">Alta de mediadores</p>

        <p className="sr-p mb-8">
          En <strong>MEDIAZION</strong> colaboramos con mediadores profesionales acreditados en distintas áreas:
          civil, mercantil, familiar, comunitaria y empresarial.
        </p>

        <p className="sr-p mb-10">
          Nuestra red de mediadores cumple con los estándares del Centro de Mediación y cuenta con
          formación continua, seguimiento de casos y acreditación oficial. Si eres mediador o mediadora
          y deseas formar parte de nuestro equipo, puedes darte de alta utilizando el botón anterior.
        </p>

        {/* Compromiso profesional */}
        <section className="sr-card mb-8" style={{ background: "rgba(255,255,255,.9)" }}>
          <h2 className="sr-h2 mb-2">Compromiso profesional</h2>
          <ul className="sr-p" style={{ marginLeft: 18, listStyle: "disc" }}>
            <li>Confidencialidad absoluta y protección de datos.</li>
            <li>Neutralidad e imparcialidad en todas las intervenciones.</li>
            <li>Formación y actualización permanente en mediación.</li>
            <li>Supervisión y acompañamiento institucional.</li>
          </ul>
        </section>

        {/* Ámbitos de actuación */}
        <section className="sr-card mb-8" style={{ background: "rgba(255,255,255,.9)" }}>
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

        {/* Acceso privado */}
        <section className="sr-card mb-10" style={{ background: "rgba(255,255,255,.9)" }}>
          <h2 className="sr-h2 mb-3">Contacto interno</h2>
          <p className="sr-p mb-4">
            Si ya formas parte del equipo, accede a tu área privada de mediador para gestionar tu perfil y expedientes.
          </p>
          <a href="/mediadores/alta" className="sr-btn-primary">Alta de mediadores</a>
          <a href="/panel-mediador" className="sr-btn-secondary" style={{ marginLeft: 12 }}>
            Acceder al área privada
          </a>
        </section>

        <div className="text-sm text-zinc-600">
          <p className="sr-p">© {new Date().getFullYear()} MEDIAZION · Centro de Mediación y Resolución de Conflictos</p>
        </div>
      </main>
    </>
  );
}
