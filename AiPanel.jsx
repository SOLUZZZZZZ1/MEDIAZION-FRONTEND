// src/pages/AiPanel.jsx — Asistente IA PRO (textarea visible, presets auto-send, upload doc, guardar sesión, export DOCX/PDF)
import React, { useEffect, useMemo, useRef, useState } from "react";
import Seo from "../components/Seo.jsx";

const PRESETS = [
  { tag: "Acta estándar", prompt: "Redacta un acta formal de mediación con fecha, asistentes, antecedentes, desarrollo, acuerdos y próximos pasos." },
  { tag: "Resumen ejecutivo", prompt: "Resume la sesión de mediación en 10-12 líneas, con objetivos, puntos clave, avances y tareas pendientes." },
  { tag: "Correo de seguimiento", prompt: "Redacta un correo profesional de seguimiento tras una sesión de mediación, con saludo, resumen de acuerdos y próximos pasos." },
  { tag: "Cláusula confidencialidad", prompt: "Escribe una cláusula de confidencialidad para anexar a un acta de mediación, en tono jurídico claro y conciso." },
];

const LOGO_URL_DEFAULT = "https://mediazion.eu/logo.png";
const BEARER = "ok"; // Gate mínimo de /api/ai/*

function MessageBubble({ role, content }) {
  const isUser = role === "user";
  return (
    <div className={`w-full flex ${isUser ? "justify-end" : "justify-start"} mb-3`}>
      <div
        className={[
          "max-w-[92%] md:max-w-[72%] rounded-2xl px-4 py-3 shadow-sm",
          isUser ? "bg-sky-600 text-white rounded-br-sm" : "bg-white border border-zinc-200 text-zinc-800 rounded-bl-sm",
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
        "¡Hola! Soy tu asistente de mediación. Escribe en el cuadro de la derecha o pulsa un preset para generar al instante.",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [copied, setCopied] = useState(false);

  const [docUrl, setDocUrl] = useState("");
  const [useDoc, setUseDoc] = useState(false);
  const fileRef = useRef(null);

  const [exportOpen, setExportOpen] = useState(false);
  const [exportForm, setExportForm] = useState({
    case_no: "",
    date_iso: new Date().toISOString().slice(0, 10),
    mediator_alias: "",
    parties: "",
    summary: "",
    agreements: "",
    confidentiality: true,
    logo_url: LOGO_URL_DEFAULT,
  });

  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight + 180;
    }
  }, [messages, loading]);

  const lastAssistantText = useMemo(() => {
    const last = [...messages].reverse().find((m) => m.role === "assistant");
    return last ? last content : "";
  }, [messages]);

  async function handleSend(customPrompt) {
    const prompt = (customPrompt ?? input).trim();
    if (!prompt) return;

    setErrorMsg("");
    setLoading(true);
    setCopied(false);

    setMessages((prev) => [...prev, { role: "user", content: prompt }]);
    if (!customPrompt) setInput("");

    try {
      let data;
      if (useDoc && docUrl) {
        const r = await fetch("/api/ai/assist_with", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${BEARER}`,
          },
          body: JSON.stringify({ doc_url: docUrl, prompt }),
        });
        data = await r.json().catch(() => ({}));
        if (!r.ok || !data?.ok) throw new Error(data?.detail || data?.message || "No se pudo procesar el documento");
      } else {
        const r = await fetch("/api/ai/assist", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${BEARER}`,
          },
          body: JSON.stringify({ prompt }),
        });
        data = await r.json().catch(() => ({}));
        if (!r.ok || !data?.ok) throw new Error(data?.detail || data?.message || "No se pudo generar la respuesta");
      }
      setMessages((prev) => [...prev, { role: "assistant", content: data.text || "(respuesta vacía)" }]);
    } catch (e) {
      setErrorMsg(e.message || "Error inesperado");
    } finally {
      setLoading(false);
    }
  }

  async function handleCopyLast() {
    if (!lastAssistantText) return;
    try {
      await navigator.clipboard.writeText(lastAssistantText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {}
  }

  function handleClearConversation() {
    setMessages([
      { role: "assistant", content: "Conversación vaciada. Escribe a la derecha y pulsa Generar." },
    ]);
    setErrorMsg("");
    setCopied(false);
  }

  async function handleSaveSession() {
    try {
      const email = localStorage.getItem("mediador_email") || "anon@mediazion.eu";
      const res = await fetch("/api/ai/session/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${BEARER}`,
        },
        body: JSON.stringify({
          email,
          title: "Sesión de mediación",
          messages,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) throw new Error(data?.detail || data?.message || "No se pudo guardar la sesión");
      alert("Sesión guardada: " + data.url);
    } catch (e) {
      setErrorMsg(e.message || "Error guardando la sesión");
    }
  }

  async function handleFilePick(e) {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    setErrorMsg("");
    try {
      const fd = new FormData();
      fd.append("file", f);
      const res = await fetch("/api/upload/file", { method: "POST", body: fd });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok || !data?.access) throw new Error(data?.detail || "No se pudo subir el archivo");
      setDocUrl(data.url);
      setUseDoc(true);
    } catch (e2) {
      setErrorMsg(e2.message || "Error subiendo archivo");
    } finally {
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  function openExport() {
    setExportForm((s) => ({
      ...s,
      summary: lastAssistantText || s.summary,
    }));
    setExportOpen(true);
  }

  async function handleExportDocx() {
    try {
      const body = { ...exportForm };
      if (!body.case_no || !body.date_iso || !body.mediator_alias || !body.parties) {
        throw new Error("Rellena expediente, fecha, mediador/a y partes.");
      }
      const res = await fetch("/api/actas/render_docx", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok || !data?.url) throw new Error(data?.detail || "No se pudo generar el DOCX");
      window.open(data.url, "_blank");
      setExportOpen(false);
    } catch (e) {
      setErrorMsg(e.message || "Error exportando DOCX");
    }
  }

  async function handleExportPdf() {
    try {
      const body = { ...exportForm };
      if (!body.case_no || !body.date_iso || !body.mediator_alias || !body.parties) {
        throw new Error("Rellena expediente, fecha, mediador/a y partes.");
      }
      const res = await considerFetch("/api/actas/render_pdf", { // ensure backend deployed
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok || !data?.url) throw new Error(data?.detail || "No se pudo generar el PDF");
      window.open(data.url, "_blank");
      setExportOpen(false);
    } catch (e) {
      setErrorMsg(e.message || "Error exportando PDF");
    }
  }

  return (
    <>
      <Seo
        title="IA Profesional · MEDIAZION"
        description="Asistente de redacción de actas, resúmenes y comunicaciones para mediadores. Soporte de documentos y exportación a DOCX/PDF."
        canonical="https://mediazion.vercel.app/#/panel-mediador/ai"
      />

      <main
        className="sr-container py-8"
        style={{
          minHeight: "calc(100vh - 160px)",
          background: "linear-gradient(180deg, rgba(237,246,255,0.85), rgba(248,250,252,0.92))",
          borderRadius: 16,
          marginTop: 24,
          marginBottom: 24,
          backdropFilter: "blur(2px)",
        }}
      >
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 mb-4">
          <h1 className="sr-h1 m-0">Asistente IA Profesional</h1>
          <div className="flex gap-2 flex-wrap">
            <button className="sr-btn-secondary" onClick={() => (window.location.hash = "#/panel-mediador/perfil?tab=seguridad")}>
              Cambiar contraseña
            </button>
            <button className="sr-btn-secondary" onClick={handleCopyLast} disabled={!lastAssistantText}>
              {copied ? "¡Copiado!" : "Copiar último"}
            </button>
            <button className="sr-btn-secondary" onClick={handleSaveSession} disabled={messages.length <= 1}>
              Guardar sesión
            </button>
            <button className="sr-btn-secondary" onClick={handleClearConversation}>
              Borrar conversación
            </button>
            <a className="sr-btn-secondary" href="#/panel-mediador" onClick={(e)=>{e.preventDefault(); window.location.hash = "#/panel-mediador";}}>
              Volver al panel
            </a>
          </div>
        </div>

        {/* Presets (auto-send) */}
        <div className="sr-card mb-4">
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((p, i) => (
              <button
                key={i}
                className="px-3 py-1.5 rounded-full bg-sky-50 text-sky-800 border border-sky-200 hover:bg-sky-100 transition"
                onClick={() => handleSend(p.prompt)}
                title={p.prompt}
              >
                {p.tag}
              </button>
            ))}
          </div>
        </div>

        {/* Contenido principal */}
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-4">
          {/* Conversación */}
          <section className="xl:col-span-3">
            <div
              ref={listRef}
              className="sr-card h_[54vh] overflow-auto pr-1"
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
                      <span className="w-2 h-2 bg-zinc-400 rounded-full [animation-delay:120ms] animate-pulse"></span>
                      <span className="w-2 h-2 bg-zinc-400 rounded-full [animation-delay:240ms] animate-pulse"></span>
                      <span className="sr-small ml-2">Generando…</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Editor / Envío */}
          <section className="xl:col-span-2">
            <div className="sr-card h-[54vh] flex flex-col">
              {/* Documento */}
              <div className="flex items-center justify_between gap-2 mb-2">
                <label className="sr-label m-0">Documento (opcional)</label>
                <div className="flex items-center">
                  <input id="useDoc" type="checkbox" checked={useDoc} onChange={(e) => setUseDoc(e.target.checked)} />
                  <label htmlFor="useDoc" className="sr-small m-0 ml-2">Usar en la generación</label>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-2">
                <input
                  ref={fileRef}
                  type="file"
                  accept=".pdf,.doc,.docx,.txt,.md,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain,text/markdown"
                  onChange={handleFilePick}
                  className="sr-input"
                />
                {docUrl ? (
                  <a className="sr-btn-secondary" href={docUrl} target="_blank" rel="noopener noreferrer">Ver</a>
                ) : (
                  <button className="sr-btn-secondary" onClick={() => fileRef.current?.click()}>Adjuntar</button>
                )}
              </div>

              {/* Prompt */}
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

              {/* Acciones */}
              <div className="mt-3 flex flex-wrap gap-2">
                <button className="sr-btn-primary" onClick={() => handleSend()} disabled={loading || !input.trim()}>
                  {loading ? "Generando…" : (useDoc && docUrl ? "Generar con documento" : "Generar con IA")}
                </button>
                <button className="sr-btn-secondary" onClick={() => setInput("")} disabled={loading || !input}>
                  Limpiar texto
                </button>
                <button className="sr-btn-secondary" onClick={openExport} disabled={!lastAssistantText || loading}>
                  Exportar (DOCX/PDF)
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* Modal exportación */}
        {exportOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/30">
            <div className="bg-whtie rounded-2xl shadow-xl p-6 w-[95%] max-w-2xl">
              <h3 className="sr-h3 m-0">Exportar a DOCX / PDF (Acta)</h3>
              <p className="sr-small text-zinc-600 mt-1">Se utilizará el logo de Mediazion en cabecera.</p>

              <div className="grid gap-3 mt-4">
                <div className="grid md:grid-cols-2 gap-3">
                  <div>
                    <label className="sr-label">Expediente</label>
                    <input
                      className="sr-input"
                      value={exportForm.case_no}
                      onChange={(e) => setExportForm((s) => ({ ...s, case_no: e.target.value }))}
                      placeholder="MED-2025-001"
                    />
                  </div>
                  <div>
                    <label className="sr-label">Fecha</label>
                    <input
                      className="sr-input"
                      type="date"
                      value={exportForm.date_iso}
                      onChange={(e) => setExportForm((s) => ({ ...s, date_iso: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-3">
                  <div>
                    <label className="sr-label">Mediador/a (alias)</label>
                    <input
                      className="sr-input"
                      value={exportForm.mediator_alias}
                      onChange={(e) => setExportForm((s) => ({ ...s, mediator_alias: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="sr-label">Partes</label>
                    <input
                      className="sr-input"
                      value={exportForm.parties}
                      onChange={(e) => setExportForm((s) => ({ ...s, parties: e.target.value }))}
                      placeholder="Parte A; Parte B"
                    />
                  </div>
                </div>

                <div>
                  <label className="sr-label">Resumen / Desarrollo</label>
                  <textarea
                    className="sr-input min-h-[120px]"
                    value={exportForm.summary}
                    onChange={(e) => setExportForm((s) => ({ ...s, summary: e.target.value }))}
                    placeholder="Si lo dejas en blanco, se toma el último resultado de la IA."
                  />
                </div>

                <div>
                  <label className="sr-label">Acuerdos alcanzados</label>
                  <textarea
                    className="sr-input min-h-[100px]"
                    value={exportForm.agreements}
                    onChange={(e) => setExportForm((s) => ({ ...s, agreements: e.target.value }))}
                  />
                </div>

                <div className="flex items-center gap-3">
                  <input
                    id="confid"
                    type="checkbox"
                    checked={exportForm.confidentiality}
                    onChange={(e) => setExportForm((s) => ({ ...s, confidentiality: e.target.checked }))}
                  />
                  <label htmlFor="confid" className="sr-label m-0">Incluir cláusula de confidencialidad</label>
                </div>

                <div>
                  <label className="sr-label">Logo (URL)</label>
                  <input
                    className="sr-input"
                    value={exportForm.logo_url}
                    onChange={(e) => setExportForm((s) => ({ ...s, logo_url: e.target.value }))}
                    placeholder={LOGO_URL_DEFAULT}
                  />
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <button className="sr-btn-primary" onClick={handleExportDocx}>Generar DOCX</button>
                <button className="sr-btn-secondary" onClick={handleExportPdf}>Generar PDF</button>
                <button className="sr-btn-secondary" onClick={() => setExportOpen(false)}>Cancelar</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
