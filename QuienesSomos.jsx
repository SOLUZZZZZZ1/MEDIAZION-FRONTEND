// src/pages/QuienesSomos.jsx
import React from "react";

export default function QuienesSomos() {
  const filas = [
    { L: "M", t: "Modernidad — Innovación en métodos y herramientas de mediación." },
    { L: "E", t: "Equilibrio — Búsqueda constante del punto justo entre las partes." },
    { L: "D", t: "Diálogo — Comunicación abierta y constructiva como base de la solución." },
    { L: "I", t: "Imparcialidad — Neutralidad absoluta en cada proceso." },
    { L: "A", t: "Acuerdo — Resultado natural del diálogo y la mediación." },
    { L: "Z", t: "Zona neutra — Espacio seguro donde ambas partes se expresan libremente." },
    { L: "I", t: "Integridad — Coherencia ética y profesional en cada actuación." },
    { L: "O", t: "Orientación — Guía y acompañamiento hacia soluciones reales." },
    { L: "N", t: "Neutralidad — Principio esencial que rige toda la intervención." },
  ];

  return (
    <main
      className="min-h-[calc(100vh-80px)]"
      style={{
        backgroundImage: "url('/columnas.webp?v=1')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
        padding: "40px 20px"
      }}
    >
      {/* overlay suave para legibilidad */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(255,255,255,0.70), rgba(255,255,255,0.88))" }} />
      <div className="sr-container" style={{ position: "relative", zIndex: 1 }}>
        <h1 className="sr-h1 mb-6">Quiénes somos</h1>

        <section className="sr-card mb-6" style={{ background: "rgba(255,255,255,0.95)" }}>
          <p className="sr-p">
            <strong>MEDIAZION</strong> es un Centro Institucional de Mediación y Resolución de Conflictos.
            Unimos rigor jurídico y empatía profesional para alcanzar acuerdos sostenibles, documentados y verificables.
          </p>
        </section>

        <section className="sr-card mb-6" style={{ background: "rgba(255,255,255,0.95)" }}>
          <h2 className="sr-h2">Misión</h2>
          <p className="sr-p">
            Ayudar a las partes en conflicto a resolverlo, acompañándolas en la consecución de acuerdos eficaces y
            en la prevención de ulteriores litigios, aportando seguridad, trazabilidad y custodia documental.
          </p>
        </section>

        <section className="sr-card mb-6" style={{ background: "rgba(255,255,255,0.95)" }}>
          <h2 className="sr-h2">Valores</h2>
          <p className="sr-p">
            Confidencialidad, neutralidad, diligencia y respeto. Siempre con enfoque humano y resultados medibles.
          </p>
        </section>

        {/* Acróstico con texto alineado a la base y letras más contenidas */}
        <section className="sr-card mb-6" style={{ background: "rgba(255,255,255,0.97)" }}>
          <h2 className="sr-h2">Nuestros valores</h2>
          <p className="sr-p">MEDIAZION es mucho más que un nombre: es una forma de entender la mediación.</p>

          <div>
            {filas.map((f, i) => (
              <div
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "56px 1fr",
                  columnGap: "12px",
                  alignItems: "end", // alinea texto a la base de la letra
                  padding: "10px 0",
                  borderBottom: i < filas.length - 1 ? "1px solid #e5e7eb" : "none",
                }}
              >
                <div
                  style={{
                    fontWeight: 900,
                    fontSize: "40px",
                    lineHeight: 1,
                    color: "#0f172a",
                    textAlign: "center",
                    letterSpacing: "0.5px",
                  }}
                >
                  {f.L}
                </div>
                <div className="sr-p" style={{ paddingBottom: "4px" }}>
                  {f.t}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="sr-card mb-10" style={{ background: "rgba(255,255,255,0.95)" }}>
          <h2 className="sr-h2">Metodología</h2>
          <p className="sr-p">
            Sesiones estructuradas, actas numeradas, certificación y custodia tanto de las actas como las grabaciones,
            facilitando a las partes el control de acceso a las mismas.
          </p>
        </section>
      </div>
    </main>
  );
}
