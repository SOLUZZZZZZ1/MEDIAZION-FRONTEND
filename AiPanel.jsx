// src/pages/AiPanel.jsx — IA Profesional estable (chat + documento + limpiar)
import React, { useEffect, useRef, useState } from "react";
import Seo from "../components/Seo.jsx";

const PRESETS = [
  {
    tag: "Acta estándar",
    text:
      "Redacta un acta formal de mediación con fecha, asistentes, antecedentes, desarrollo, acuerdos y próximos pasos.",
  },
  {
    tag: "Resumen ejecutivo",
    text:
      "Resume la sesión de mediación en 10-12 líneas, con objetivos, puntos clave, avances y tareas pendientes.",
  },
  {
    tag: "Correo de seguimiento",
    text:
      "Redacta un correo profesional de seguimiento tras una sesión de mediación, con saludo, resumen de acuerdos y próximos pasos.",
  },
  {
    tag: "Cláusula de confidencialidad",
    text:
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
        <pre className="whitespace-pre-wrap m-0 font-sans text-[15px] leading-relaxed">
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

  async function sendMessage(text) {
    if (!text) return;

    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setErrorMsg("");
    setLoading(true);

    const token = getToken();

    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      };

      let endpoint = "/api/ai/assist";
      let body = { prompt: text };

      if (useDoc && docUrl) {
        endpoint = "/api/ai/assist_with";
        body = { doc_url: docUrl, prompt: text };
      }

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
        { role: "assistant", content: data.text || "(respuesta vacía)" },
      ]);
    } catch (e) {
      setErrorMsg(e.message || "Error inesperado llamando a la IA");
    } finally {
      setLoading(false);
    }
  }

  function handleSendClick() {
    const text = input.trim();
    if (!text) return;
    setInput("");
    sendMessage(text);
  }

  function handlePreset(text) {
    sendMessage(text);
  }

  async function handleFilePick(e) {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    setErrorMsg("");
    setDocName(f.name || "");
    setUseDoc(false); // el usuario decide luego si lo usa

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
    } catch (e) {
      setErrorMsg(e.message || "Error subiendo el archivo");
      setDocUrl("");
      setDocName("");
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

  function clearDocument() {
    setDocUrl("");
    setDocName("");
    setUseDoc(false);
    if (fileRef.current) fileRef.current.value = "";
  }

  return (
    <>
      <Seo
        title="IA Profesional · MEDIAZION"
        description="Asistente IA para mediadores: redacta actas, resúmenes y comunicaciones con o sin documentos."
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
              Escribe tu encargo o adjunta un documento. La IA te ayudará a redactar
              actas, resúmenes y comunicaciones de mediación.
            </p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <button
              type="button"
              className="sr-btn-secondary"
              onClick={() =>
                (window.location.href = "/panel-mediador/perfil?tab=seguridad")
              }
            >
              Cambiar contraseña
            </button>
            <button
              type="button"
              className="sr-btn-secondary"
              onClick={clearConversation}
            >
              Limpiar conversación
            </button>
            <button
              type="button"
              className="sr-btn-secondary"
              onClick={() => (window.location.href = "/panel-mediador")}
            >
              Volver al panel
            </button>
          </div>
        </div>

        {/* Presets */}
        <div className="sr-card mb-4 p-3">
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((p) => (
              <button
                key={p.tag}
                className="px-3 py-1.5 rounded-full bg-sky-50 text-sky-800 border border-sky-200 hover:bg-sky-100 transition"
                onClick={() => handlePreset(p.text)}
                title={p.text}
              >
                {p.tag}
              </button>
            ))}
          </div>
        </div>

        {/* Chat + Editor */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Chat */}
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
                <p className="sr-small text-zinc-500 mb-2">La IA está pensando…</p>
              )}
            </div>
          </section>

          {/* Editor */}
          <section>
            <div className="sr-card h-[54vh] flex flex-col">
              {/* Documento */}
              <label className="sr-label mb-2">Documento (opcional)</label>
              <input
                ref={fileRef}
                type="file"
                className="sr-input mb-2"
                accept=".pdf,.docx,.txt,.md,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain,text/markdown"
                onChange={handleFilePick}
              />
              {docUrl ? (
                <div className="mb-3">
                  <p className="sr-small text-zinc-700">
                    Archivo cargado: <b>{docName || "Documento adjunto"}</b>
                  </p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    <label className="sr-small inline-flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={useDoc}
                        onChange={(e) => setUseDoc(e.target.checked)}
                      />
                      Usar este documento en la respuesta
                    </label>
                    <a
                      href={docUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="sr-btn-secondary"
                    >
                      Ver documento
                    </a>
                    <button
                      type="button"
                      className="sr-btn-secondary"
                      onClick={clearDocument}
                    >
                      Quitar documento
                    </button>
                  </div>
                </div>
              ) : (
                <p className="sr-small text-zinc-500 mb-3">
                  Puedes adjuntar un PDF, DOCX, TXT o Markdown. El archivo se usará solo
                  si marcas la casilla “Usar este documento”.
                </p>
              )}

              {/* Texto */}
              <label className="sr-label mb-2">Tu mensaje</label>
              <textarea
                className="sr-input flex-1 resize-none"
                placeholder="Escribe aquí tu consulta o instrucciones para la IA..."
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
                  type="button"
                  className="sr-btn-primary"
                  onClick={handleSendClick}
                  disabled={loading || !input.trim()}
                >
                  {loading
                    ? "Generando…"
                    : useDoc && docUrl
                    ? "Generar con documento"
                    : "Generar con IA"}
                </button>
                <button
                  type="button"
                  className="sr-btn-secondary"
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
