// src/pages/Tarifas.jsx
import React from "react";

export default function Tarifas(){
  return (
    <main
      className="min-h-[calc(100vh-80px)]"
      style={{
        // Fondo específico SOLO para esta página
        backgroundImage: "url('/columnas.webp')", // pon la imagen en /public/columnas.webp
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
        padding: "40px 20px"
      }}
    >
      {/* Capa para mejorar la lectura sobre las columnas (ligera) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, rgba(255,255,255,0.65), rgba(255,255,255,0.80))"
        }}
      />

      {/* Contenido con posición relativa para quedar por encima del overlay */}
      <div
        className="sr-container"
        style={{ position: "relative", zIndex: 1 }}
      >
        <div
          className="sr-card"
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            background: "rgba(255,255,255,0.92)",
            border: "1px solid rgba(0,0,0,0.06)",
            borderRadius: "16px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.10)",
            color: "#0f172a",
            padding: "28px 28px 20px"
          }}
        >
          <h1 className="sr-h1 mb-3">Tarifas</h1>
          <p className="sr-p mb-8">
            Transparencia y previsibilidad. Estos importes son orientativos y se confirman en cada expediente.
          </p>

          {/* Apertura de expediente */}
          <section className="sr-card mb-6" style={{ background:"rgba(255,255,255,0.95)" }}>
            <h2 className="sr-h2">Apertura de expediente</h2>
            <p className="sr-p">Incluye análisis de viabilidad y propuesta de agenda.</p>
            <p className="sr-p" style={{ fontWeight: 700, marginTop: 8 }}>Desde 120 €</p>
          </section>

          {/* Sesión de mediación */}
          <section className="sr-card mb-6" style={{ background:"rgba(255,255,255,0.95)" }}>
            <h2 className="sr-h2">Sesión de mediación</h2>
            <p className="sr-p">Sesiones de 60–90 min, con acta y acuerdos parciales.</p>
            <p className="sr-p" style={{ fontWeight: 700, marginTop: 8 }}>Desde 180 €</p>
          </section>

          {/* Certificación final */}
          <section className="sr-card" style={{ background:"rgba(255,255,255,0.95)" }}>
            <h2 className="sr-h2">Certificación final</h2>
            <p className="sr-p">Con/sin avenencia, con documentación preparada para firma.</p>
            <p className="sr-p" style={{ fontWeight: 700, marginTop: 8 }}>Desde 150 €</p>
          </section>

          {/* Pie institucional local (opcional si ya tienes footer global) */}
          <div className="text-sm text-zinc-700" style={{ marginTop: 16 }}>
            <p className="sr-p">© MEDIAZION · Centro Institucional de Mediación y Resolución de Conflictos</p>
          </div>
        </div>
      </div>
    </main>
  );
}
