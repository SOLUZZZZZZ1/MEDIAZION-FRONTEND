// src/pages/Ayuntamientos.jsx — Información para Ayuntamientos · Mediazion
import React from "react";
import Seo from "../components/Seo.jsx";
import { Link } from "react-router-dom";

export default function Ayuntamientos() {
  return (
    <>
      <Seo
        title="Ayuntamientos · Mediazion"
        description="Soluciones de mediación comunitaria y convivencia para Ayuntamientos."
        canonical="https://mediazion.eu/ayuntamientos"
      />

      <main
        className="sr-container py-12"
        style={{ minHeight: "calc(100vh - 160px)" }}
      >
        <h1 className="sr-h1 mb-4">Ayuntamientos y Mediazion</h1>
        <p className="sr-p mb-4">
          Mediazion es una plataforma profesional diseñada para ayudar a los
          Ayuntamientos a gestionar la mediación comunitaria, la convivencia
          vecinal y los conflictos de barrio con orden, trazabilidad y
          herramientas modernas.
        </p>

        <section className="sr-card mb-6">
          <h2 className="sr-h2 mb-2">¿Qué aporta Mediazion a un Ayuntamiento?</h2>
          <ul className="sr-p list-disc ml-6 mb-2">
            <li>Registro estructurado de casos de convivencia y conflictos vecinales.</li>
            <li>Actas homogéneas y profesionales, listas para expediente municipal.</li>
            <li>Agenda vinculada a casos, citas y salas de mediación.</li>
            <li>Apoyo de IA para redactar cartas, informes y resúmenes.</li>
            <li>Estadísticas e informes para memorias anuales y proyectos europeos.</li>
          </ul>
        </section>

        <section className="sr-card mb-6">
          <h2 className="sr-h2 mb-2">Casos típicos que se pueden gestionar</h2>
          <ul className="sr-p list-disc ml-6 mb-2">
            <li>Problemas de ruidos y convivencia entre vecinos.</li>
            <li>Uso de espacios comunes y zonas públicas.</li>
            <li>Conflictos escolares con impacto en la comunidad.</li>
            <li>Disputas entre comercios y vecindario.</li>
          </ul>
          <p className="sr-small text-zinc-600">
            La plataforma se adapta al circuito de mediación comunitaria ya
            existente en el municipio.
          </p>
        </section>

        <section className="sr-card mb-6">
          <h2 className="sr-h2 mb-2">Cómo pueden acceder los Ayuntamientos</h2>
          <p className="sr-p mb-2">
            Cada Ayuntamiento dispone de un acceso específico para sus
            técnicos/as de mediación o convivencia. Desde ese panel podrán
            gestionar casos, actas, agenda y estadísticas.
          </p>
          <p className="sr-p mb-3">
            Si quieres estudiar un piloto o una prueba en tu municipio, podemos
            habilitar un acceso inicial y acompañarte en la puesta en marcha.
          </p>
          <Link
            to="/ayuntamientos/acceso"
            className="sr-btn-primary inline-block"
          >
            Acceso Ayuntamientos
          </Link>
        </section>

        <section className="sr-card">
          <h2 className="sr-h2 mb-2">¿Hablamos?</h2>
          <p className="sr-p mb-2">
            Si eres responsable de un Ayuntamiento y te interesa explorar cómo
            Mediazion puede ayudar en convivencia y mediación comunitaria, puedes
            contactarnos a través del formulario de contacto o solicitando una
            demostración.
          </p>
          <Link to="/contacto" className="sr-btn-secondary inline-block">
            Ir a contacto
          </Link>
        </section>
      </main>
    </>
  );
}
