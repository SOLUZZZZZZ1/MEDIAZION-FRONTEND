// src/pages/AiPanel.jsx — Asistente IA Profesional (UI premium + funcional)
import React, { useEffect, useMemo, useRef, useState } from "react";
import Seo from "../components/Seo.jsx";

const PRESETS = [
  { tag: "Acta estándar", prompt: "Redacta un acta formal de mediación con fecha, asistentes, antecedentes, desarrollo, acuerdos y próximos pasos." },
  { tag: "Resumen ejecutivo", prompt: "Resume la sesión de mediación en 10-12 líneas, con objetivos, puntos clave, avances y tareas pendientes." },
  { tag: "Correo de seguimiento", prompt: "Redacta un correo profesional de seguimiento tras una sesión de mediación, agradeciendo la asistencia y detallando próximos pasos." },
  { tag: "Cláusula de confidencialidad", prompt: "Escribe una cláusula de confidencialidad para anexar a un acta de mediación, en tono jurídico claro y conciso." },
];

function MessageBubble({ role, content }) {
  const isUser = role === "user";
  return (
    <div className={`w-full flex ${isUser ? "justify-end" : "justify-start"} mb-3`}>
      <div
        className={[
          "max-w-[90%] md:max-w-[70%] rounded-2xl px-4 py-3 shadow-sm",
          isUser
            ? "bg-sky-600 text-white rounded-br-sm"
            : "bg-white border border-zinc-200 text-zinc-800 rounded-bl-sm",
        ].join(" ")}
      >
        <pre className="whitespace-pre-wrap font-sans text-[15px] leading-relaxed m-0">
          {content}
        </pre>
      </div>
    </div>
  );
}

export default function AiPanel() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "¡Hola! Soy tu asistente de mediación. Puedo redactar actas, resúmenes, comunicaciones y ayudarte a ordenar ideas. Cuéntame qué necesitas.",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [copied, setCopied] = useState(false);

  const listRef = useRef(null);

  // Autoscroll al final cuando hay nuevo mensaje
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight + 160;
    }
  }, [messages, loading]);

  const lastAssistantText = useMemo(() => {
    const last = [...messages].reverse().find((m) => m.role === "assistant");
    return last ? last.content : "";
  }, [messages]);

  async function handleSend(customPrompt) {
    const prompt = (customPrompt ?? input).trim();
    if (!prompt) return;

    setErrorMsg("");
    setLoading(true);
    setCopied(false);

    // Push mensaje del usuario
    setMessages((prev) => [...prev, { role: "user", content: prompt }]);
    setInput("");

    try {
      const res = await fetch("/api/ai/assist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Gate mínimo del backend: cualquier Bearer no vacío. Usamos "ok".
          Authorization: "Bearer ok",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) {
        throw new Error(data?.detail || data?.message || "No se pudo generar la respuesta");
      }

      setMessages((prev) => [...prev, { role: "assistant", content: data.text || "(respuesta vacía)" }]);
    } catch (e) {
      setErrorMsg(e.message || "Error inesperado generando el texto");
    } finally {
      setLoading(false);
    }
  }

  function handlePreset(p) {
    // Coloca el prompt en el input para que el usuario pueda ajustar, o envía directo.
    setInput(p);
  }

  async function copyLast() {
    if (!lastAssistantText) return;
    try {
      await navigator.clipboard.writeText(lastAssistantText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // no-op
    }
  }

  return (
    <>
      <Seo
        title="IA Profesional · MEDIAZION"
        description="Asistente de redacción de actas, resúmenes y comunicaciones para mediadores."
        canonical="https://mediazion.vercel.app/#/panel-mediador/ai"
      />

      <main
        className="sr-container py-8"
        style={{
          minHeight: "calc(100vh - 160px)",
          background: "linear-gradient(180deg, rgba(240,246,255,0.8), rgba(248,250,252,0.85))",
          borderRadius: 16,
          marginTop: 24,
          marginBottom: 24,
          backdropFilter: "blur(2px)",
        }}
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <h1 className="sr-h1 m-0">Asistente IA Profesional</h1>
          <div className="flex gap-2 flex-wrap">
            <button className="sr-btn-secondary" onClick={copyLast} disabled={!lastAssistantText}>
              {copied ? "¡Copiado!" : "Copiar último resultado"}
            </button>
            <a className="sr-btn-secondary" href="#/panel-mediador" onClick={(e)=>{e.preventDefault(); window.location.hash = "#/panel-mediador";}}>
              Volver al panel
            </a>
          </div>
        </div>

        {/* Presets */}
        <div className="sr-card mb-4">
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((p, i) => (
              <button
                key={i}
                className="px-3 py-1.5 rounded-full bg-sky-50 text-sky-800 border border-sky-200 hover:bg-sky-100 transition"
                onClick={() => handlePreset(p.prompt)}
                title={p.prompt}
              >
                {p.tag}
              </button>
            ))}
          </div>
        </div>

        {/* Chat + Editor */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {/* Conversación */}
          <section className="lg:col-span-3">
            <div
              ref={listRef}
              className="sr-card h-[54vh] overflow-auto pr-1"
              style={{ scrollBehavior: "smooth" }}
            >
              {messages.map((m, idx) => (
                <MessageBubble key={idx} role={m.role} content={m.content} />
              ))}

              {loading && (
                <div className="w-full flex justify-start mb-3">
                  <div className="bg-white border border-zinc-200 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
                    <div className="flex items-center gap-2 text-zinc-500">
                      <span className="w-2 h-2 bg-zinc-400 rounded-full animate-pulse"></span>
                      <span className="w-2 h-2 bg-zinc-400 rounded-full animate-pulse [animation-delay:120ms]"></span>
                      <span className="w-2 h-2 bg-zinc-400 rounded-full animate-pulse [animation-delay:240ms]"></span>
                      <span className="sr-small ml-2">Generando…</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Editor / Envío */}
          <section className="lg:col-span-2">
            <div className="sr-card h-[54vh] flex flex-col">
              <label className="sr-label mb-2">Describe lo que necesitas redactar</label>
              <textarea
                className="sr-input flex-1 resize-none"
                placeholder="Ej.: Redacta un acta de mediación con dos partes (A y B), tema: discrepancias contractuales..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              {errorMsg && (
                <p className="sr-small mt-2" style={{ color: "#991b1b" }}>
                  ❌ {errorMsg}
                </p>
              )}
              <div className="mt-3 flex flex-wrap gap-2">
                <button className="sr-btn-primary" onClick={() => handleSend()} disabled={loading || !input.trim()}>
                  {loading ? "Generando…" : "Generar con IA"}
                </button>
                <button
                  className="sr-btn-secondary"
                  onClick={() => setInput("")}
                  disabled={loading || !input}
                >
                  Limpiar
                </button>
              </div>
              <div className="sr-small text-zinc-500 mt-3">
                Consejo: puedes elegir un preset, ajustar el texto y pulsar “Generar”. El último resultado se copia con un clic.
              </div>
            </div>
          </section>
        </div>

        {/* Sugerencias rápidas */}
        <div className="sr-card mt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Hint
              title="Actas impecables"
              text="Incluye: fecha/lugar, partes, antecedentes, desarrollo, acuerdos y próximos pasos. Pide un tono claro y objetivo."
            />
            <Hint
              title="Resúmenes eficaces"
              text="Resume en 8–12 líneas, con objetivos, puntos de acuerdo, disenso y tareas. Solicita un cierre con próximos pasos."
            />
            <Hint
              title="Correos profesionales"
              text="Usa saludo cordial, cuerpo con puntos acordados y CTA concreto (fecha/hora, documento, confirmación)."
            />
          </div>
        </div>
      </main>
    </>
  );
}

function Hint({ title, text }) {
  return (
    <div className="rounded-2xl border p-4 bg-white">
      <h3 className="sr-h3 m-0">{title}</h3>
      <p className="sr-p mt-2">{text}</p>
    </div>
  );
}
