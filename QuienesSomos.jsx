import React from "react";

export default function QuienesSomos() {
  const acrostico = [
    { letra: "M", texto: "Modernidad — Innovación en métodos y herramientas de mediación." },
    { letra: "E", texto: "Equilibrio — Búsqueda constante del punto justo entre las partes." },
    { letra: "D", texto: "Diálogo — Comunicación abierta y constructiva como base de la solución." },
    { letra: "I", texto: "Imparcialidad — Neutralidad absoluta en cada proceso." },
    { letra: "A", texto: "Acuerdo — Resultado natural del diálogo y la mediación." },
    { letra: "Z", texto: "Zona neutra — Espacio seguro donde ambas partes se expresan libremente." },
    { letra: "I", texto: "Integridad — Coherencia ética y profesional en cada actuación." },
    { letra: "O", texto: "Orientación — Guía y acompañamiento hacia soluciones reales." },
    { letra: "N", texto: "Neutralidad — Principio esencial que rige toda la intervención del Mediador profesional." }
  ];

  const fila = (item, i) => (
    <div key={i} style={{
      display: "grid",
      gridTemplateColumns: "72px 1fr",
      alignItems: "start",
      gap: "14px",
      padding: "10px 0",
      borderBottom: i < acrostico.length - 1 ? "1px solid #e5e7eb" : "none"
    }}>
      <div style={{
        fontWeight: 900,
        fontSize: "56px",
        lineHeight: "1",
        color: "#0f172a",
        textAlign: "center",
        letterSpacing: "1px",
        minWidth: "72px"
      }}>
        {item.letra}
      </div>
      <div className="sr-p" style={{ color: "#0f172a" }}>
        {item.texto}
      </div>
    </div>
  );

  return (
    <main className="sr-container py-12">
      <h1 className="sr-h1">Quiénes somos</h1>

      {/* Intro */}
      <section className="sr-card mt-6">
        <p className="sr-p" style={{ fontSize: "1.05rem" }}>
          <strong>MEDIAZION</strong> es un Centro de Mediación y Resolución de Conflictos. Unimos rigor jurídico y
          empatía profesional para alcanzar acuerdos sostenibles, documentados y verificables.
        </p>
      </section>

      {/* Misión */}
      <section className="sr-card mt-6">
        <h2 className="sr-h2">Misión</h2>
        <p className="sr-p">
          Ayudar a las partes en conflicto a resolverlo acompañándoles y ayudándoles en la consecución de acuerdos eficaces
          y prevenir ulteriores litigios, aportando seguridad, trazabilidad y custodia documental.
        </p>
      </section>

      {/* Valores */}
      <section className="sr-card mt-6">
        <h2 className="sr-h2">Valores</h2>
        <p className="sr-p">
          <strong>Nuestros valores:</strong> MEDIAZION es una herramienta apropiada para abordar el cambio de paradigma en
          el tratamiento de los conflictos civiles y mercantiles.
        </p>
        <p className="sr-p">
          Confidencialidad, <strong>neutralidad</strong>, diligencia y respeto. Siempre con enfoque humano y resultados concretos.
        </p>
      </section>

      {/* Acróstico grande con texto a la derecha */}
      <section className="sr-card mt-6">
        <h2 className="sr-h2">Acróstico MEDIAZION</h2>
        <div>
          {acrostico.map(fila)}
        </div>
      </section>

      {/* Metodología */}
      <section className="sr-card mt-6">
        <h2 className="sr-h2">Metodología</h2>
        <p className="sr-p">
          Sesiones estructuradas, actas numeradas, certificación y custodia tanto de las actas como las grabaciones,
          facilitando a las partes el control de acceso a las mismas.
        </p>
      </section>
    </main>
  );
}
