// src/pages/Mediadores.jsx
import React from "react";

export default function Mediadores() {
  return (
    <main
      className="min-h-[calc(100vh-80px)]"
      style={{
        backgroundImage: "url('/marmol.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          background: "rgba(255,255,255,0.95)",
          borderRadius: "16px",
          padding: "28px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
        }}
      >
        <h1 className="sr-h1 mb-2">Mediadores</h1>
        <p className="sr-p">
          En <strong>MEDIAZION</strong> colaboramos con mediadores profesionales acreditados en
          las áreas civil, mercantil, familiar, comunitaria y empresarial.
        </p>

        {/* Bloque de alta + CTA trial */}
        <section className="sr-card" style={{ background: "rgba(255,255,255,0.98)" }}>
          <h2 className="sr-h2">Empieza en 2 pasos</h2>
          <ol className="sr-p" style={{ marginLeft: 18 }}>
            <li><strong>Paso 1 – Alta gratuita:</strong> completa tu perfil profesional.</li>
            <li><strong>Paso 2 – Activa el plan PRO:</strong> 7 días de prueba sin coste (49,90 €/mes después, cancela cuando quieras).</li>
          </ol>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(1, minmax(0, 1fr))", gap: 12 }}>
            <a className="sr-btn-primary" href="/mediadores/alta">Dar de alta (gratuito)</a>
            <div
              className="p-4 rounded-xl"
              style={{
                background: "rgba(237,248,255,0.95)",
                border: "1px solid #b6e0ff",
              }}
            >
              <h3 style={{ margin: 0, fontWeight: 800, fontSize: 18 }}>
                🧭 Plan Profesional · 7 días gratis
              </h3>
              <ul className="sr-p" style={{ marginLeft: 18, listStyle: "disc" }}>
                <li>Acceso al <strong>Panel Profesional</strong> con gestión de expedientes.</li>
                <li>Asistente de IA para redacción de actas y resúmenes.</li>
                <li>Subida de documentos y CV para validación.</li>
                <li>Visibilidad en el <strong>Directorio oficial</strong> de MEDIAZION.</li>
                <li>Alertas por email cuando se te asigne un caso.</li>
              </ul>
              <p className="sr-p" style={{ margin: 0 }}>
                El pago del trial se inicia solo tras confirmar tu alta y pasar a estado <strong>approved</strong>.
              </p>
            </div>
          </div>
        </section>

        {/* Ámbitos */}
        <section className="sr-card mt-6" style={{ background: "rgba(255,255,255,0.98)" }}>
          <h2 className="sr-h2">Ámbitos de actuación</h2>
          <div className="sr-grid-3">
            <div>
              <h3 className="sr-h3">Civil y familiar</h3>
              <p className="sr-p">Herencias, divorcio, custodia, alimentos, conflictos vecinales.</p>
            </div>
            <div>
              <h3 className="sr-h3">Mercantil y societario</h3>
              <p className="sr-p">Contratos, proveedores, juntas, socios, cumplimiento.</p>
            </div>
            <div>
              <h3 className="sr-h3">Laboral y organizacional</hakes>
              <p className="sr-p">Conflictos internos, clima laboral, relaciones laborales.</p>
            </div>
          </div>
        </section>

        {/* Directorio */}
        <section className="sr-card mt-6" style={{ background: "rgba(255,255,255,0.98)" }}>
          <h2 className="sr-h2">Directorio de mediadores</h2>
          <p className="sr-p">
            Consulta el listado público de profesionales validados por MEDIAZION.
          </p>
          <div>
            <a className="sr-btn-secondary" href="/mediadores/directorio">Ver directorio</a>
          </div>
        </section>
      </div>
    </main>
  );
}
