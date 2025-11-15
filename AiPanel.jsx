// src/pages/AiPanel.jsx — Asistente IA Profesional (chat + documentos, con limpiar)
import React, { useEffect, useRef, useState } from "react";
import Seo from "../components/Seo.jsx";

const PRESETS = [
  {
    tag: "Acta estándar",
    prompt:
      "Redacta un acta formal de mediación con fecha, asistentes, antecedentes, desarrollo, acuerdos y próximos pasos.",
  },
  {
    tag: "Resumen ejecutivo",
    prompt:
      "Resume la sesión de mediación en 10-12 líneas, con objetivos, puntos clave, avances y tareas pendientes.",
  },
  {
    tag: "Correo de seguimiento",
    prompt:
      "Redacta un correo profesional de seguimiento tras una sesión de mediación, con saludo, resumen de acuerdos y próximos pasos.",
  },
  {
    tag: "Cláusula confidencialidad",
    prompt:
      "Escribe una cláusula de confidencialidad para anexar a un acta de mediación, en tono jurídico claro y conciso.",
  },
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
        className={
          "max-w-[92%] md:max-w-[72%] rounded-2xl px-4 py-3 shadow-sm " +
          (isUser
            ? "bg-sky-600 text-white rounded-br-sm"
            : "bg-white border border-zinc-200 text-zinc-800 rounded-bl-sm")
        }
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
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [docUrl, setDocUrl] = useState("");
  const [docName, setDocName] = useState("");
  const [useDoc, setUseDoc] = useState(false);
  const fileRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight + 200;
    }
  }, [messages, loading]);

  async function handleSend(customPrompt) {
    const prompt = (customPrompt ?? input).trim();
    if (!prompt) return;

    // Siempre mostramos tu mensaje
    setMessages((prev) => [...prev, { role: "user", content: prompt }]);
    if (!customPrompt) setInput("");
    setErrorMsg("");
    setLoading(true);

    // Token (usamos el de login; si falta, aún así mandamos algo para no bloquear)
    const stored = localStorage.getItem("jwt_token");
    const token = stored && stored.trim() ? stored : "ok";

    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      };

      let resp;
      if (useDoc && docUrl) {
        // Con documento
        resp = await fetch("/api/ai/assist_with", {
          method: "POST",
          headers,
          body: JSON.stringify({ doc_url: docUrl, prompt }),
        });
      } else {
        // Solo texto
        resp = await fetch("/api/ai/assist", {
          method: "POST",
          headers,
          body: JSON.stringify({ prompt }),
        });
      }

      const data = await resp.json().catch(() => ({}));
      if (!resp.ok || !data?.ok) {
        throw new Error(
          data?.detail ||
            data?.message ||
            "No se pudo generar la respuesta de la IA."
        );
      }

      const text = data.text || "(respuesta vacía)";
      setMessages((prev) => [...prev, { role: "assistant", content: text }]);
    } catch (e) {
      setErrorMsg(e.message || "Error inesperado llamando a la IA");
    } finally {
      setLoading(false);
    }
  }

  async function handleFilePick(e) {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    setErrorMsg("");

    try {
      const fd = new FormData();
      fd.append("file", f);

      const respUp = await fetch("/api/upload/file", {
        method: "POST",
        body: fd,
      });
      const data = await respUp.json().catch(() => ({}));

      if (respUp.ok && data?.ok && data?.url) {
        setDocUrl(data.url);
        setDocName(f.name);
        setUseDoc(true);
      } else {
        throw new Error(data?.detail || data?.message || "No se pudo subir el archivo");
      }
    } catch (e2) {
      setErrorMsg(e2.message || "Error subiendo archivo");
    } finally {
      if (fileRef.current) {
        fileRef.current.value = "";
      }
    }
  }

  function handleClearChat() {
    setMessages(INITIAL_MESSAGES);
    setErrorMsg("");
  }

  function handleClearDoc() {
    setDocUrl("");
    setDocName("");
    setUseDoc(false);
    if (fileRef.current) {
      fileRef.current.value = "";
    }
  }

  return (
    <>
      <Seo
        title="IA Profesional · MEDIAZION"
        description="Asistente de redacción de actas, resúmenes y comunicaciones para mediadores."
        canonical="https://mediazion.eu/panel-mediador/ai"
      />

      <main
        className="sr-container py-8"
        style={{
          minHeight: "calc(100vh - 160px)",
          background:
            "linear-gradient(180deg, rgba(237,246,255,0.85), rgba(248,250,252,0.92))",
          borderRadius: 16,
          marginTop: 24,
          marginBottom: 24,
        }}
      >
        {/* Cabecera */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 mb-4">
          <div>
            <h1 className="sr-h1 m-0">Asistente IA Profesional</h1>
            <p className="sr-small text-zinc-600">
              Genera actas, resúmenes, correos y más a partir de texto y documentos.
            </p>
          </div>
          <div className="flex gap-2 flex-wrap">
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
        <div className="sr-card mb-4">
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((p) => (
              <button
                key={p.tag}
                className="px-3 py-1.5 rounded-full bg-sky-50 text-sky-800 border border-sky-200 hover:bg-sky-100 transition"
                onClick={() => handleSend(p.prompt)}
                title={p.prompt}
              >
                {p.tag}
              </button>
            ))}
          </div>
        </div>

        {/* Chat + panel de documento */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Conversación */}
          <section>
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
                  <div className="bg-white border border-zinc-200 rounded-2xl px-4 py-3 shadow-sm">
                    <div className="flex items-center gap-2 text-zinc-500">
                      <span className="w-2 h-2 bg-zinc-400 rounded-full animate-pulse" />
                      <span className="w-2 h-2 bg-zinc-400 rounded-full animate-pulse" />
                      <span className="w-2 h-2 bg-zinc-400 rounded-full animate-pulse" />
                      <span className="sr-small ml-2">Generando…</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-between mt-3 gap-2">
              <button
                className="sr-btn-secondary"
                type="button"
                onClick={handleClearChat}
                disabled={loading}
              >
                🧹 Limpiar conversación
              </button>
            </div>
          </section>

          {/* Editor / documento */}
          <section>
            <div className="sr-card h-[54vh] flex flex-col">
              {/* Documento */}
              <label className="sr-label mb-2">Documento (opcional)</label>
              <div className="flex items-center gap-2 mb-2">
                <input
                  ref={fileRef}
                  type="file"
                  accept=".pdf,.doc,.docx,.txt,.md,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain,text/markdown,image/*"
                  onChange={handleFilePick}
                  className="sr-input"
                />
              </div>
              {docUrl ? (
                <div className="flex flex-col gap-2 mb-3">
                  <p className="sr-small text-green-700">
                    ✅ Archivo cargado: <b>{docName || "Documento"}</b>
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    <button
                      className="sr-btn-secondary"
                      type="button"
                      onClick={() => setUseDoc((u) => !u)}
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
                    <button
                      className="sr-btn-secondary"
                      type="button"
                      onClick={handleClearDoc}
                    >
                      Quitar documento
                    </button>
                  </div>
                  <p className="sr-small text-zinc-600">
                    {useDoc
                      ? "Este documento se tendrá en cuenta en la próxima respuesta de la IA."
                      : "Documento cargado, pero no se usará hasta que marques \"Usar en la generación\"."}
                  </p>
                </div>
              ) : (
                <p className="sr-small text-zinc-600 mb-3">
                  Puedes adjuntar un PDF, DOCX, TXT o imagen para que la IA lo tenga
                  en cuenta al redactar.
                </p>
              )}

              {/* Texto libre */}
              <label className="sr-label mb-2">Escribe al asistente</label>
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
                <button
                  className="sr-btn-primary"
                  onClick={() => handleSend()}
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
                  type="button"
                  onClick={() => setInput("")}
                  disabled={loading || !input}
                >
                  Limpiar texto
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
