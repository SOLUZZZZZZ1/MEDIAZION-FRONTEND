// src/pages/AiPanel.jsx — Asistente IA Profesional (versión estable con scroll correcto)
import React, { useEffect, useRef, useState } from "react";
import Seo from "../components/Seo.jsx";

const PRESETS = [
  { tag: "Acta estándar", prompt: "Redacta un acta formal de mediación..." },
  { tag: "Resumen ejecutivo", prompt: "Resume la sesión de mediación..." },
  { tag: "Correo profesional", prompt: "Redacta un correo formal..." },
  { tag: "Cláusula confidencialidad", prompt: "Escribe una cláusula..." },
];

const INITIAL_MESSAGES = [
  {
    role: "assistant",
    content:
      "¡Hola! Soy tu asistente de mediación. Escribe tu encargo o pulsa un preset para empezar.",
  },
];

function MessageBubble({ role, content }) {
  const isUser = role === "user";
  return (
    <div className={`w-full flex ${isUser ? "justify-end" : "justify-start"} mb-3`}>
      <div
        className={`max-w-[92%] md:max-w-[72%] px-4 py-3 rounded-2xl shadow-sm ${
          isUser
            ? "bg-sky-600 text-white rounded-br-sm"
            : "bg-white border border-zinc-200 text-zinc-800 rounded-bl-sm"
        }`}
      >
        <pre className="whitespace-pre-wrap font-sans text-[15px] leading-relaxed m-0">
          {content}
        </pre>
      </div>
    </div>
  );
}

export default function AiPanel() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const [docUrl, setDocUrl] = useState("");
  const [docName, setDocName] = useState("");
  const [useDoc, setUseDoc] = useState(true);

  const fileRef = useRef(null);
  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, loading]);

  function clearChat() {
    setMessages(INITIAL_MESSAGES);
    setInput("");
    setErrorMsg("");
  }

  function clearDoc() {
    setDocUrl("");
    setDocName("");
    setUseDoc(false);
  }

  async function sendMessage(customPrompt) {
    const prompt = (customPrompt ?? input).trim();
    if (!prompt) return;

    setMessages((prev) => [...prev, { role: "user", content: prompt }]);
    if (!customPrompt) setInput("");

    const token = localStorage.getItem("jwt_token") || "ok";

    setLoading(true);
    setErrorMsg("");

    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      };

      const body = useDoc && docUrl ? { doc_url: docUrl, prompt } : { prompt };
      const endpoint =
        useDoc && docUrl ? "/api/ai/assist_with" : "/api/ai/assist";

      const resp = await fetch(endpoint, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      });

      const data = await resp.json().catch(() => ({}));

      if (!resp.ok || !data?.ok) {
        throw new Error(
          data?.detail ||
            data?.message ||
            "No se pudo generar la respuesta de la IA."
        );
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.text },
      ]);
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleUpload(e) {
    const f = e.target.files?.[0];
    if (!f) return;

    setErrorMsg("");

    try {
      const fd = new FormData();
      fd.append("file", f);

      const r = await fetch("/api/upload/file", { method: "POST", body: fd });
      const data = await r.json();

      if (!r.ok || !data?.ok) throw new Error(data?.detail);

      setDocUrl(data.url);
      setDocName(f.name);
      setUseDoc(true);
    } catch (e) {
      setErrorMsg(e.message);
    } finally {
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  return (
    <>
      <Seo title="IA Profesional · MEDIAZION" />

      <main className="sr-container py-8">
        {/* Cabecera */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
          <h1 className="sr-h1">Asistente IA Profesional</h1>

          <div className="flex gap-2">
            <button
              className="sr-btn-secondary"
              onClick={() =>
                (window.location.href = "/panel-mediador/perfil?tab=seguridad")
              }
            >
              Cambiar contraseña
            </button>

            <button
              className="sr-btn-secondary"
              onClick={() => (window.location.href = "/panel-mediador")}
            >
              Volver al panel
            </button>
          </div>
        </div>

        {/* Presets */}
        <div className="sr-card mb-4 p-4 flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <button
              key={p.tag}
              className="px-3 py-1.5 rounded-full bg-sky-50 text-sky-800 border border-sky-200"
              onClick={() => sendMessage(p.prompt)}
            >
              {p.tag}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* PANEL IZQUIERDO – CHAT */}
          <section className="sr-card p-4 flex flex-col max-h-[65vh] overflow-y-auto">
            <div ref={chatRef} className="flex-1 overflow-y-auto pr-2">
              {messages.map((m, i) => (
                <MessageBubble key={i} role={m.role} content={m.content} />
              ))}

              {loading && (
                <p className="sr-small text-zinc-600">La IA está pensando…</p>
              )}
            </div>

            <button
              className="sr-btn-secondary mt-3"
              onClick={clearChat}
              disabled={loading}
            >
              🧹 Limpiar conversación
            </button>
          </section>

          {/* PANEL DERECHO – DOCUMENTO + INPUT */}
          <section className="sr-card p-4 flex flex-col max-h-[65vh] overflow-y-auto">
            <label className="sr-label mb-2">Documento (opcional)</label>

            <input
              ref={fileRef}
              type="file"
              onChange={handleUpload}
              className="sr-input mb-2"
              accept=".pdf,.doc,.docx,.txt,.md,image/*"
            />

            {docUrl ? (
              <div className="mb-4">
                <p className="sr-small text-green-700">
                  ✓ Archivo cargado: <strong>{docName}</strong>
                </p>

                <div className="flex gap-2 mt-2">
                  <button
                    className="sr-btn-secondary"
                    onClick={() => setUseDoc(!useDoc)}
                  >
                    {useDoc ? "No usar en la generación" : "Usar en la generación"}
                  </button>

                  <a
                    className="sr-btn-secondary"
                    href={docUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ver documento
                  </a>

                  <button className="sr-btn-secondary" onClick={clearDoc}>
                    Quitar
                  </button>
                </div>
              </div>
            ) : (
              <p className="sr-small text-zinc-600 mb-4">
                Adjunta un documento PDF/DOCX/TXT o imagen.
              </p>
            )}

            {/* TEXTAREA — SIEMPRE VISIBLE */}
            <label className="sr-label mb-2">Escribe al asistente</label>

            <textarea
              className="sr-input flex-1 resize-none mb-3"
              placeholder="Escribe tu encargo aquí..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />

            {errorMsg && (
              <p className="sr-small text-red-700 mb-3">{errorMsg}</p>
            )}

            <div className="flex gap-2">
              <button
                className="sr-btn-primary"
                onClick={() => sendMessage()}
                disabled={loading || !input.trim()}
              >
                {loading
                  ? "Generando…"
                  : useDoc && docUrl
                  ? "Generar con documento"
                  : "Generar con IA"}
              </button>

              <button
                className="sr-btn-secondary"
                onClick={() => setInput("")}
              >
                Limpiar texto
              </button>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
