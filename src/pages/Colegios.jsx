// src/pages/Colegios.jsx — Colegios Profesionales · Mediazion
import React from "react";
import Seo from "../components/Seo.jsx";

export default function Colegios() {
  return (
    <>
      <Seo
        title="Colegios Profesionales · Mediazion"
        description="Soluciones de mediación para Colegios Profesionales."
      />
      <main className="sr-container py-12" style={{ minHeight: "calc(100vh - 160px)" }}>
        <h1 className="sr-h1 mb-4">Colegios Profesionales</h1>
        <p className="sr-p mb-6">
          Mediazion puede utilizarse como plataforma de referencia para Colegios
          Profesionales (Abogados, Psicólogos, Trabajadores Sociales, etc.) que
          quieran ofrecer servicios de mediación estructurados, con panel,
          actas, IA y directorio de mediadores colegiados.
        </p>

        <section className="sr-card mb-6">
          <h2 className="sr-h2 mb-2">Qué ofrece Mediazion a un Colegio</h2>
          <ul className="sr-p list-disc ml-6">
            <li>Panel de gestión de casos para mediadores colegiados.</li>
            <li>Actas e informes listos para expediente colegial.</li>
            <li>IA profesional para redactar escritos y resúmenes.</li>
            <li>Directorio de mediadores del Colegio, con visibilidad pública.</li>
            <li>Estadísticas e informes para la Junta y memoria anual.</li>
          </ul>
        </section>

        <section className="sr-card">
          <h2 className="sr-h2 mb-2">Contacto institucional</h2>
          <p className="sr-p">
            Si formas parte de un Colegio Profesional y quieres conocer cómo
            Mediazion puede integrarse como herramienta de apoyo a la mediación
            colegial, puedes escribir a:
          </p>
          <p className="sr-p">
            <b>Email:</b> admin@mediazion.eu
          </p>
        </section>
      </main>
    </>
  );
}
