// src/pages/Instituciones.jsx — Instituciones · Mediazion
import React from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";

export default function Instituciones() {
  return (
    <>
      <Seo
        title="Instituciones · Mediazion"
        description="Soluciones para Ayuntamientos, Cámaras de Comercio y Colegios Profesionales."
      />

      <main className="sr-container py-12" style={{ minHeight: "calc(100vh - 160px)" }}>
        <h1 className="sr-h1 mb-4">Instituciones</h1>
        <p className="sr-p mb-6">
          Mediazion ofrece soluciones profesionales para Ayuntamientos, Cámaras de Comercio
          y Colegios Profesionales, adaptadas a mediación comunitaria, mercantil y a la
          práctica profesional de la mediación.
        </p>

        <section className="sr-grid-3">
          {/* Ayuntamientos */}
          <Link to="/ayuntamientos" className="sr-card hover:shadow-lg transition">
            <h2 className="sr-h2 mb-2">Ayuntamientos</h2>
            <p className="sr-p">
              Gestión de casos de convivencia y mediación comunitaria. Actas municipales,
              agenda y estadísticas para servicios sociales, policía local y unidades de
              convivencia.
            </p>
          </Link>

          {/* Cámaras de Comercio */}
          <Link to="/instituciones/camaras" className="sr-card hover:shadow-lg transition">
            <h2 className="sr-h2 mb-2">Cámaras de Comercio</h2>
            <p className="sr-p">
              Mediación mercantil y societaria. Expedientes empresariales, actas
              profesionales, IA legal y cuadro de mando para departamentos jurídicos.
            </p>
          </Link>

          {/* Colegios Profesionales */}
          <Link to="/instituciones/colegios" className="sr-card hover:shadow-lg transition">
            <h2 className="sr-h2 mb-2">Colegios Profesionales</h2>
            <p className="sr-p">
              Servicios para Colegios de Abogados, Psicólogos, Trabajadores Sociales y otros
              colectivos que quieran ofrecer mediación profesional con herramientas digitales
              avanzadas.
            </p>
          </Link>
        </section>
      </main>
    </>
  );
}
