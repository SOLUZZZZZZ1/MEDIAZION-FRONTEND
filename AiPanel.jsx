// src/pages/AiPanel.jsx — versión simple, sólida y sin errores
import React, { useEffect, useRef, useState } from "react";
import Seo from "../components/Seo.jsx";

const PRESETS = [
  { tag: "Acta estándar", prompt: "Redacta un acta formal de mediación..." },
  { tag: "Resumen ejecutivo", prompt: "Resume la sesión de mediación..." },
  { tag: "Correo profesional", prompt: "Redacta un correo formal..." },
  { tag: "Cláusula confidencialidad", prompt: "Escribe una cláusula..." }
];

function Bubble({ role, content }) {
  const isUser = role === "user";
  return (
    <div className={`mb-3 flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={
          (isUser
            ? "bg-sky-600 text-white rounded-br-xl"
            : "bg-white border border-zinc-300 text-zinc-800 rounded-bl-xl") +
          " max-w-[85%] px-4 py-3 rounded-2xl shadow-sm"
        }
      >
        <pre className="whitespace-pre-wrap m-0">{content}</pre>
      </div>
    </div>
  );
}

export default function AiPanel() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "¡Hola! Soy tu asistente de mediación. ¿En qué puedo ayudarte?"
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [docUrl, setDocUrl] = useState("");
  const listRef = useRef(null);
  const fileRef = useRef(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight + 200;
    }
  }, [messages]);

  async function sendMessage(customPrompt) {
    const prompt = (customPrompt ?? input).trim();
    if (!prompt) return;

    setMessages(prev => [...prev, { role: "user", content: prompt }]);
    if (!customPrompt) setInput("");

    const token = localStorage.getItem("jwt_token") || "ok";

    setLoading(true);
    setErrorMsg("");

    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      };

      const body = docUrl
        ? { doc_url: docUrl, prompt }
        : { prompt };

      const url = docUrl
        ? "/api/ai/assist_with"
        : "/api/ai/assist";

      const resp = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(body)
      });

      const data = await resp.json().catch(() => ({}));

      if (!resp.ok || !data?.ok) {
        throw new Error(data?.detail || "Error generando respuesta");
      }

      setMessages(prev => [
        ...prev,
        { role: "assistant", content: data.text }
      ]);
    } catch (e) {
      setErrorMsg(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const form = new FormData();
      form.append("file", file);

      const r = await fetch("/api/upload/file", {
        method: "POST",
        body: form
      });

      const data = await r.json();

      if (r.ok && data?.ok && data.url) {
        setDocUrl(data.url);
      } else {
        throw new Error("No se pudo subir el archivo");
      }
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  return (
    <>
      <Seo title="IA Profesional · Mediazion" />

      <main className="sr-container py-8">
        <h1 className="sr-h1 mb-4">Asistente IA Profesional</h1>

        {/* Presets */}
        <div className="sr-card mb-4 flex flex-wrap gap-2">
          {PRESETS.map(p => (
            <button
              key={p.tag}
              className="sr-btn-secondary"
              onClick={() => sendMessage(p.prompt)}
            >
              {p.tag}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Chat */}
          <div ref={listRef} className="sr-card h-[60vh] overflow-auto pr-2">
            {messages.map((m, i) => (
              <Bubble key={i} role={m.role} content={m.content} />
            ))}
            {loading && (
              <p className="sr-small text-zinc-500">Generando…</p>
            )}
          </div>

          {/* Editor */}
          <div className="sr-card h-[60vh] flex flex-col">
            {/* Documento */}
            <label className="sr-label mb-2">Documento (opcional)</label>
            <input
              ref={fileRef}
              type="file"
              onChange={handleUpload}
              className="sr-input mb-2"
              accept=".pdf,.doc,.docx,.txt,.md,image/*"
            />

            {/* Estado del documento */}
            {docUrl ? (
              <div className="flex items-center gap-3 mb-3">
                <span className="sr-small text-emerald-700">
                  ✓ Documento cargado
                </span>
                <a
                  className="sr-btn-secondary"
                  href={docUrl}
                  target="_blank"
                >
                  Ver
                </a>
                <button
                  className="sr-btn-secondary"
                  onClick={() => setDocUrl("")}
                >
                  Quitar
                </button>
              </div>
            ) : (
              <p className="sr-small mb-3 text-zinc-500">
                Adjunta un documento PDF/DOCX si deseas usarlo.
              </p>
            )}

            <textarea
              className="sr-input flex-1 mb-3 resize-none"
              placeholder="Escribe tu encargo..."
              value={input}
              onChange={e => setInput(e.target.value)}
            />

            {errorMsg && (
              <p className="sr-small text-red-700 mb-3">{errorMsg}</p>
            )}

            <button
              className="sr-btn-primary"
              onClick={() => sendMessage()}
              disabled={!input.trim() || loading}
            >
              {loading
                ? "Generando…"
                : docUrl
                ? "Generar con documento"
                : "Generar con IA"}
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
