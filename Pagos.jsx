// src/pages/Pagos.jsx — RECURSOS para mediadores (antes “Pagos”)
import React from "react";
import Seo from "../components/Seo.jsx";

export default function Pagos() {
  return (
    <>
      <Seo
        title="Recursos · MEDIAZION"
        description="Recursos y materiales útiles para mediadores: modelos y guías."
        canonical="https://mediazion.eu/panel-mediador/recursos"
      />
      <main className="sr-container py-10">
        <h1 className="sr-h1 mb-4">Recursos para mediadores</h1>
        <p className="sr-p mb-6 text-zinc-700">
          En esta sección encontrarás recursos básicos que te pueden ayudar en tu
          práctica diaria como mediador: modelos orientativos y guías que puedes
          adaptar a cada caso.
        </p>

        <div className="space-y-6">
          <section className="sr-card p-6">
            <h2 className="sr-h2 mb-2">📄 Modelos de documentos</h2>
            <ul className="sr-list">
              <li>Acta inicial de mediación</li>
              <li>Acta final de mediación</li>
              <li>Acuerdo de mediación</li>
              <li>Correo de confirmación o convocatoria</li>
            </ul>
            <p className="sr-small text-zinc-600 mt-2">
              Estos modelos son orientativos. Puedes combinarlos con la IA Profesional
              para adaptarlos a cada caso concreto.
            </p>
          </section>

          <section className="sr-card p-6">
            <h2 className="sr-h2 mb-2">📚 Enlaces recomendados</h2>
            <ul className="sr-list">
              <li>Ley 5/2012 de mediación en asuntos civiles y mercantiles.</li>
              <li>Guías y recomendaciones de buenas prácticas en mediación.</li>
              <li>Material informativo para partes que participan en mediación.</li>
            </ul>
            <p className="sr-small text-zinc-600 mt-2">
              Próximamente añadiremos enlaces directos y documentos descargables.
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
