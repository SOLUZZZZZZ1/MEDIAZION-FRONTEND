// src/pages/AiPanel.jsx — IA Profesional con texto + documentos + imágenes y botón de limpieza
import React, { useEffect, useRef, useState } from "react";
import Seo from "../components/Seo.jsx";

const INITIAL_MESSAGES = [
  {
    role: "assistant",
    content:
      "¡Hola! Soy tu asistente de mediación. Escríbeme o sube un documento para ayudarte con actas, resúmenes y comunicaciones.",
  },
];

const PRESETS = [
  {
    tag: "Acta estándar",
    text: "Redacta un acta formal de mediación con fecha, asistentes, antecedentes, desarrollo, acuerdos y próximos pasos.",
  },
  {
    tag: "Resumen ejecutivo",
    text: "Resume la sesión de mediación en 10-12 líneas, con objetivos, puntos clave, avances y tareas pendientes.",
  },
  {
    tag: "Correo de seguimiento",
    text: "Redacta un correo profesional de seguimiento tras una sesión de mediación, con saludo, resumen de acuerdos y próximos pasos.",
  },
  {
    tag: "Cláusula de confidencialidad",
    text: "Escribe una cláusula de confidencialidad para anexar a un acta de mediación, en tono jurídico claro y conciso.",
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
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [docUrl, setDocUrl] = useState("");
  const [docName, setDocName] = useState("");
  const [useDoc, setUseDoc] = useState(false);

  const listRef = useRef(null);
  const fileRef = useRef(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight + 200;
    }
  }, [messages, loading]);

  function getToken() {
    const stored = localStorage.getItem("jwt_token");
    return stored && stored.trim() ? stored : "ok";
  }

  async function handleSend(customText) {
    const text = (customText ?? input).trim();
    if (!text) return;

    setMessages((prev) => [...prev, { role: "user", content: text }]);
    if (!customText) setInput("");
    setErrorMsg("");
    setLoading(true);

    const token = getToken();

    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      };

      let body;
      let endpoint;

      if (useDoc && docUrl) {
        endpoint = "/api/ai/assist_with";
        body = { pr ompt: text, doc_url: docUrl };
      } else {
        endpoint = "/api/ai/assist";
        body = { prompt: text };
      }

      const resp = await fetch(endpoint, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      });

      const data = await resp.json().catch(() => ({}));

      if (!resp.ok || !data?.ok) {
        throw new Error(data?.detail || data?.message || "No se pudo obtener respuesta");
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.text || "(respuesta vacía)" },
      ]);
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
    setDocName(f.name || "");

    try {
      const fd = new FormData();
      fd.append("file", f);

      const r = await fetch("/api/upload/file", {
        method: "POST",
        body: fd,
      });

      const data = await r.json().catch(() => ({}));
      if (!r.ok || !data?.ok || !data?.url) {
        throw new Error(data?.detail || data?.message || "No se pudo subir el archivo");
      }

      setDocUrl(data.url);
      setUseDoc(true);
    } catch (e) {
      setErrorMsg(e.message || "Error subiendo archivo");
      setDocUrl("");
      setUseDoc(false);
    } finally {
      if (fileRef.current) {
        fileRef.current.value = "";
      }
    }
  }

  function clearConversation() {
    setMessages(INITIAL_MESSAGES);
    setInput("");
    setErrorMsg("");
  }

  return (
    <>
      <Seo
        title="IA Profesional · MEDIAZION"
        description="Asistente IA para mediadores: redacta actas, resúmenes, acuerdos y analiza documentos."
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
              Escribe tu consulta, sube documentos o imágenes y obtén propuestas listas
              para usar en tu trabajo como mediador.
            </p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <button
              className="sr-btn-secondary"
              onClick={() => (window.location.href = "/panel-mediador/perfil?tab=seguridad")}
            >
              Cambiar contraseña
            </button>
            <button className="sr-btn-secondary" onClick={clearConversation}>
              Limpiar conversación
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
                onClick={() => handleSend(p.text)}
              >
                {p.tag}
              </button>
            ))}
          </div>
        </div>

        {/* Chat + Editor */}
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
              {chatLoading && (
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
          </section>

          {/* Editor / Documento */}
          <section>
            <div className="sr-card h-[54vh] flex flex-col">
              {/* Documento */}
              <label className="sr-label mb-2">Documento o imagen (opcional)</label>
              <div className="flex items-center gap-2 mb-2">
                <input
                  ref={fileRef}
                  type="file"
                  accept=".pdf,.doc,.docx,.txt,.md,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain,text/markdown,image/*"
                  onChange={handleFilePick}
                  className="sr-input"
                />
              </div>
              <div className="mb-3">
                {docUrl && useDoc ? (
                  <p className="sr-small text-emerald-700">
                    ✅ Usando: <b>{docName || "Documento adjunto"}</b>. Se tendrá en
                    cuenta en la próxima respuesta.{" "}
                    <button
                      type="button"
                      className="sr-btn-link"
                      onClick={() => {
                        setUseDoc(false);
                      }}
                    >
                      Dejar de usar
                    </button>
                  </p>
                ) : docUrl ? (
                  <p className="sr-small text-zinc-600">
                    Archivo cargado (<b>{docName}</b>). Marca la casilla para usarlo en
                    la generación.
                  </p>
                ) : (
                  <p className="sr-small text-zinc-500">
                    Puedes subir documentos (PDF, DOCX, TXT, MD) o imágenes (JPG, PNG,
                    etc.) para que la IA los analice.
                  </p>
                )}
              </div>
              {docUrl && (
                <div className="flex items-center gap-2 mb-3">
                  <label className="flex items-center gap-2 sr-small">
                    <input
                      type="checkbox"
                      checked={useDoc}
                      onChange={(e) => setUseDoc( e.target.checked)}
                    />
                    Usar este documento / imagen en la respuesta
                  </label>
                  <a
                    href={docUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sr-btn-secondary"
                  >
                    Ver archivo
                  </a>
                </div>
              )}

              {/* Texto libre */}
              <label className="sr-label mb-2">Tu mensaje</label>
              <textarea
                className="sr-input flex-1 resize-none"
                placeholder="Ej.: Resume el documento adjunto y prepara una propuesta de acuerdo para las partes..."
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
                    ? "Generar con documento/imagen"
                    : "Generar con IA"}
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
