// src/pages/Tarifas.jsx
import React from "react";

export default function Tarifas() {
  return (
    <main className="sr-container py-12 text-zinc-800">
      <h1 className="sr-h1 mb-2">Tarifas</h1>
      <p className="sr-p mb-8">
        Transparencia y previsibilidad. Estos importes son orientativos y se confirman en cada expediente.
      </p>

      {/* Apertura de expediente */}
      <section className="sr-card mb-6">
        <h2 className="sr-h2">Apertura de expediente</h2>
        <p className="sr-p">
          Incluye análisis de viabilidad y propuesta de agenda.
        </p>
        <p className="sr-p" style={{ fontWeight: 700, marginTop: 8 }}>Desde 120 €</p>
      </section>

      {/* Sesión de mediación */}
      <section className="sr-card mb-6">
        <h2 className="sr-h2">Sesión de mediación</h2>
        <p className="sr-p">
          Sesiones de 60–90 min, con acta y acuerdos parciales.
        </p>
        <p className="sr-p" style={{ fontWeight: 700, marginTop: 8 }}>Desde 180 €</p>
      </section>

      {/* Certificación final */}
      <section className="sr-card">
        <h2 className="sr-h2">Certificación final</h2>
        <p className="sr-p">
          Con/sin avenencia, con documentación preparada para firma.
        </p>
        <p className="sr-p" style={{ fontWeight: 700, marginTop: 8 }}>Desde 150 €</p>
      </section>

      {/* Pie institucional de la página (si no tienes footer global, puedes dejarlo) */}
      <div className="mt-10 text-sm text-zinc-600">
        <p className="sr-p">© MEDIAZION · Centro Institucional de Mediación y Resolución de Conflictos</p>
        <div className="sr-p" style={{ display:"flex", gap: "12px", marginTop: "4px" }}>
          <a href="/aviso-legal" className="text-blue-700 hover:underline">Aviso legal</a>
          <a href="/rgpd" className="text-blue-700 hover:underline">RGPD</a>
        </div>
      </div>
    </main>
  );
}
