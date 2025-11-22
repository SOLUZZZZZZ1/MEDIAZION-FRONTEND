// src/pages/Camaras.jsx — Cámaras de Comercio · Mediazion
import React from "react";
import Seo from "../components/Seo.jsx";

export default function Camaras() {
  return (
    <>
      <Seo
        title="Cámaras de Comercio · Mediazion"
        description="Mediación empresarial, mercantil y societaria para Cámaras de Comercio."
      />
      <main className="sr-container py-12" style={{ minHeight: "calc(100vh - 160px)" }}>
        <h1 className="sr-h1 mb-4">Cámaras de Comercio</h1>
        <p className="sr-p mb-6">
          Mediazion ayuda a las Cámaras de Comercio a ofrecer un servicio
          moderno de mediación empresarial y mercantil, con expedientes
          estructurados, actas profesionales e IA Legal para apoyar a los
          mediadores y departamentos jurídicos.
        </p>

        <section className="sr-card mb-6">
          <h2 className="sr-h2 mb-2">Qué aporta Mediazion</h2>
          <ul className="sr-p list-disc ml-6">
            <li>Gestión de expedientes mercantiles y societarios.</li>
            <li>Actas DOCX/PDF homogéneas y corporativas.</li>
            <li>IA para resumir contratos y redactar acuerdos.</li>
            <li>Agenda de mediaciones y reuniones con empresas.</li>
            <li>Estadísticas para memoria anual de la Cámara.</li>
          </ul>
        </section>

        <section className="sr-card">
          <h2 className="sr-h2 mb-2">Casos típicos</h2>
          <ul className="sr-p list-disc ml-6">
            <li>Impagos entre empresas.</li>
            <li>Conflictos entre socios.</li>
            <li>Desacuerdos contractuales.</li>
            <li>Franquicias y licencias.</li>
          </ul>
        </section>
      </main>
    </>
  );
}
