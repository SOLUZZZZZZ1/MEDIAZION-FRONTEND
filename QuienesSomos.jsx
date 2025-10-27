// src/pages/QuienesSomos.jsx
import React from "react";

export default function QuienesSomos() {
  return (
    <main className="sr-container py-12 text-zinc-900">
      <h1 className="sr-h1 mb-6">Quiénes somos</h1>

      {/* Intro */}
      <section className="sr-card mb-6" style={{ background: "rgba(255,255,255,0.85)" }}>
        <p className="sr-p">
          <strong>MEDIAZION</strong> es el Centro Institucional de Mediación y Resolución de Conflictos. Acompañamos a las partes en la búsqueda de soluciones
          eficaces, aportando seguridad, trazabilidad y una adecuada custodia documental.
        </p>
      </section>

      {/* Misión */}
      <section className="sr-card mb-6" style={{ background: "rgba(255,255,255,0.85)" }}>
        <h2 className="sr-h2">MISIÓN</h2>
        <p className="sr-p">
          Ayudar a las partes en conflicto a resolverlo, acompañándolas en la consecución de acuerdos eficaces y en la
          prevención de ulteriores litigios, con un enfoque humano y garantizando la seguridad, la trazabilidad y la
          correcta conservación de la documentación.
        </p>
      </section>

      {/* Acróstico (alineado por la base, letras más contenidas) */}
      <section class="sr-card mb-6" style={{ background: "rgba(255,255,255,0.88)" }}>
        <h2 className="sr-h2">VALORES (M·E·D·I·A·Z·I·Ó·N)</h2>

        {/* Cada fila usa display:flex y alignItems:'flex-end' para alinear texto a la base de la letra */}
        {[
          { big: "M", text: "Metodicidad en los procesos, garantizando rigor y coherencia." },
          { big: "E", text: "Escucha activa, empática y respetuosa con todas las partes." },
          { big: "D", text: "Diálogo como vía principal para la resolución de conflictos." },
          { big: "I", text: "Imparcialidad en la facilitación y neutralidad en cada decisión." },
          { big: "A", text: "Acuerdo como objetivo: soluciones sostenibles y realistas." },
          { big: "Z", text: "Zona segura para comunicar y construir confianza." },
          { big: "I", text: "Integridad en cada actuación y compromiso con la ética profesional." },
          { big: "Ó", text: "Óptima gestión del proceso, ágil y transparente." },
          { big: "N", text: "Neutralidad — pilar esencial en la intervención del mediador." },
        ].map((item, idx) => (
          <div
            key={idx}
            style={{
              display: "grid",
              gridTemplateColumns: "48px 1fr",
              columnGap: "12px",
              alignItems: "end",
              marginBottom: "10px",
            }}
          >
            <div
              style={{
                fontSize: "46px",
                lineHeight: 1,
                fontWeight: 800,
                color: "#0f172a",
                textAlign: "center",
              }}
            >
              {item.big}
            </div>
            <div className="sr-p" style={{ lineHeight: "1.1", paddingBottom: "4px" }}>
              {item.text}
            </div>
          </div>
        ))}
      </section>

      {/* Metodología */}
      <section className="sr-card mb-10" style={{ background: "rgba(255,255,255,0.85)" }}>
        <h2 className="sr-h2">Metodología</h2>
        <p className="sr-p">
          Trabajamos con una metodología clara y estructurada, que incluye: sesiones de mediación guiadas,
          documentación de cada avance mediante actas, y procedimientos de custodia seguros que garantizan
          la trazabilidad de todos los acuerdos alcanzados.
        </p>
      </section>

      {/* Pie institucional */}
      <div className="text-sm text-zinc-700">
        <p className="sr-p">© 2025 MEDIAZION · Centro Institucional de Mediación y Resolución de Conflictos</p>
      </div>
    </section>
  );
}
