// src/pages/Plantillas.jsx — Plantillas IA (Recetas rápidas) · MEDIAZION
import React, { useState } from "react";
import Seo from "../components/Seo.jsx";

// Recetas / plantillas predefinidas
const RECETAS = [
  {
    id: 1,
    title: "Acta estándar",
    desc: "Redacta un acta básica de mediación con fecha, asistentes y acuerdos.",
    prompt:
      "Redacta un acta estándar de mediación con estructura formal, asistentes, resumen y acuerdos alcanzados.",
  },
  {
    id: 2,
    title: "Correo de seguimiento",
    desc: "Mensaje profesional de cierre o seguimiento tras una sesión.",
    prompt:
      "Escribe un correo formal de seguimiento posterior a una sesión de mediación, agradeciendo la participación y recordando próximos pasos.",
  },
  {
    id: 3,
    title: "Resumen ejecutivo",
    desc: "Síntesis objetiva de lo tratado y los avances logrados.",
    prompt:
      "Redacta un resumen ejecutivo claro y conciso de la sesión de mediación, destacando avances, acuerdos y temas pendientes.",
  },
];

export default function Plantillas() {
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  async function generar(prompt) {
    setLoading(true);
    setAnswer("");
    try {
      const token = localStorage.getItem("jwt_token") || "ok";

      const res = await fetch("/api/ai/assist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) {
        throw new Error(data?.detail || data?.message || "Error de IA");
      }
      setAnswer(data.text || "");
    } catch (e) {
      setAnswer("❌ " + (e.message || "Error generando plantilla"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Seo
        title="Plantillas IA · MEDIAZION"
        description="Plantillas rápidas para redactar actas, correos y resúmenes con IA."
        canonical="https://mediazion.eu/panel-mediador/plantillas"
      />
      <main
        className="sr-container py-8"
        style={{
          minHeight: "calc(100vh - 160px)",
          background: "rgba(255,255,255,0.9)",
          borderRadius: 16,
          marginTop: 24,
          marginBottom: 24,
        }}
      >
        <h1 className="sr-h1 mb-2">Plantillas IA</h1>
        <p className="sr-p mb-4">
          Usa estas plantillas rápidas para redactar al instante actas, correos de
          seguimiento o resúmenes con la IA profesional.
        </p>

        {/* Tarjetas de recetas */}
        <section className="grid gap-4 md:grid-cols-2">
          {RECETAS.map((r) => (
            <article key={r.id} className="sr-card">
              <h3 className="sr-h3 mb-1">{r.title}</h3>
              <p className="sr-p mb-3">{r.desc}</p>
              <button
                className="sr-btn-primary"
                disabled={loading}
                onClick={() => generar(r.prompt)}
              >
                {loading ? "Generando…" : "Usar plantilla"}
              </button>
            </article>
          ))}
        </section>

        {/* Resultado */}
        {answer && (
          <section className="sr-card mt-6">
            <h2 className="sr-h2 mb-2">Resultado</h2>
            <pre className="sr-p whitespace-pre-wrap">{answer}</pre>
          </section>
        )}
      </main>
    </>
  );
}
