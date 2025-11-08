// src/pages/Plantillas.jsx — Recetas IA
import React, { useState } from "react";
import Seo from "../components/Seo.jsx";

const RECETAS = [
  {
    id: 1,
    title: "Acta estándar",
    desc: "Redacta un acta básica de mediación con fecha, asistentes y acuerdos.",
    prompt: "Redacta un acta estándar de mediación con estructura formal, asistentes, resumen y acuerdos alcanzados.",
  },
  {
    id: 2,
    title: "Correo de seguimiento",
    desc: "Mensaje profesional de cierre o seguimiento post-sesión.",
    prompt: "Escribe un correo formal de seguimiento posterior a una sesión de mediación, agradeciendo la participación y recordando próximos pasos.",
  },
  {
    id: 3,
    title: "Resumen ejecutivo",
    desc: "Síntesis objetiva de lo tratado y los avances logrados.",
    prompt: "Redacta un resumen ejecutivo claro y conciso de la sesión de mediación, destacando avances, acuerdos y temas pendientes.",
  },
];

export default function Plantillas() {
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  async function generar(p) {
    setLoading(true);
    setAnswer("");
    try {
      const res = await fetch("/api/ai/assist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer ok",
        },
        body: JSON.stringify({ prompt: p }),
      });
      const data = await res.json();
      if (!res.ok || !data?.ok) throw new Error(data?.detail || "Error de IA");
      setAnswer(data.text || "");
    } catch (e) {
      setAnswer("❌ " + (e.message || "Error generando receta"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Seo
        title="Recetas IA · MEDIAZION"
        description="Plantillas rápidas para redactar actas, correos y resúmenes con IA."
        canonical="https://mediazion.eu/#/panel-mediador/plantillas"
      />
      <main
        className="sr-container py-8"
        style={{
          minHeight: "calc(100vh - 160px)",
          background: "rgba(255,255,255,0.9)",
          borderRadius: "16px",
          marginTop: "24px",
        }}
      >
        <h1 className="sr-h1 mb-2">Recetas IA</h1>
        <p className="sr-p mb-4">
          Plantillas rápidas para redactar con IA de forma profesional.
        </p>

        <section className="grid gap-4 md:grid-cols-2">
          {RECETAS.map((r) => (
            <div key={r.id} className="sr-card">
              <h3 className="sr-h3 mb-1">{r.title}</h3>
              <p className="sr-p mb-3">{r.desc}</p>
              <button
                className="sr-btn-primary"
                disabled={loading}
                onClick={() => generar(r.prompt)}
              >
                {loading ? "Generando…" : "Usar receta"}
              </button>
            </div>
          ))}
        </section>

        {answer && (
          <section className="sr-card mt-6">
            <h2 className="sr-h2">Resultado</h2>
            <pre className="sr-p" style={{ whiteSpace: "pre-wrap" }}>
              {answer}
            </pre>
          </section>
        )}
      </main>
    </>
  );
}
