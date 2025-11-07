// src/pages/AiPanel.jsx
import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Seo from "../components/Seo.jsx";

function useQuery(){ const {search}=useLocation(); return new URLSearchParams(search); }

export default function AiPanel() {
  const q = useQuery();

  const [tab, setTab] = useState("texto"); // "texto" | "documento"
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState("");
  const [busy, setBusy] = useState(false);
  const [docUrl, setDocUrl] = useState("");
  const [error, setError] = useState("");

  // Placeholder: cuando tengas login real, guarda aquí tu JWT
  const tokenRef = useRef("ok");

  // Soporta abrir con prompt precargado: /panel-mediador/ai?prefill=...
  useEffect(()=>{ const pre=q.get("prefill"); if(pre && !prompt) setPrompt(pre); },[q,prompt]);

  async function askText(){
    setBusy(true); setError(""); setReply("");
    try{
      const r = await fetch("/api/ai/assist", {
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          "Authorization":`Bearer ${tokenRef.current}`
        },
        body: JSON.stringify({ prompt })
      });
      const data = await r.json();
      if(!r.ok) throw new Error(data?.detail || "Error de IA");
      setReply(data.text || "(Sin respuesta)");
    }catch(e){ setError(e.message || "Error de conexión"); }
    finally{ setBusy(false); }
  }

  async function askWithDoc(){
    setBusy(true); setError(""); setReply("");
    try{
      const r = await fetch("/api/ai/assist_with", {
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          "Authorization":`Bearer ${tokenRef.current}`
        },
        body: JSON.stringify({ doc_url: docUrl, prompt })
      });
      const data = await r.json();
      if(!r.ok) throw new Error(data?.detail || "Error de IA");
      setReply(data.text || "(Sin respuesta)");
    }catch(e){ setError(e.message || "Error de conexión"); }
    finally{ setBusy(false); }
  }

  return (
    <>
      <Seo
        title="Asistente IA Profesional · MEDIAZION"
        description="Redacta actas, resúmenes y comunicaciones con IA, exclusivo PRO."
        canonical="https://mediazion.eu/panel-mediador/ai"
      />
      <main className="sr-container py-8"
        style={{ minHeight:"calc(100vh - 160px)", background:"rgba(255,255,255,0.95)", borderRadius:16, margin:"24px 0" }}>
        <header className="sr-card">
          <h1 className="sr-h1">Asistente IA Profesional</h1>
          <p className="sr-p">Exclusivo <b>PRO</b> — incluye <b>7 días de prueba gratuita</b>.</p>
        </header>

        <nav className="sr-card" style={{ display:"flex", gap:8 }}>
          <button className={`sr-btn-${tab==="texto"?"primary":"secondary"}`} onClick={()=>setTab("texto")}>
            Consulta de texto
          </button>
          <button className={`sr-btn-${tab==="documento"?"primary":"secondary"}`} onClick={()=>setTab("documento")}>
            Con documento
          </button>
        </nav>

        <section className="sr-card mt-4">
          <label className="sr-label">Instrucciones / Encargo</label>
          <textarea
            className="sr-input"
            rows={tab==="texto"?8:6}
            value={prompt}
            onChange={(e)=>setPrompt(e.target.value)}
            placeholder={
              tab==="texto"
              ? "Ej.: Redacta un acta neutral de la sesión, con asistentes, acuerdos y próximos pasos…"
              : "Ej.: Lee el documento y redacta un acta/resumen con acuerdos y tareas…"
            }
          />

          {tab==="documento" && (
            <>
              <label className="sr-label mt-3">Documento (URL o /uploads/...)</label>
              <input
                className="sr-input"
                value={docUrl}
                onChange={(e)=>setDocUrl(e.target.value)}
                placeholder="https://... o /uploads/ID/archivo.pdf"
              />
              <p className="sr-small mt-1">Formatos: TXT, MD, PDF y DOCX.</p>
            </>
          )}

          <div style={{ display:"flex", gap:8, marginTop:12 }}>
            {tab==="texto" ? (
              <button className="sr-btn-primary" disabled={busy || !prompt.trim()} onClick={askText}>
                {busy ? "Consultando…" : "Generar con IA"}
              </button>
            ) : (
              <button className="sr-btn-primary" disabled={busy || !prompt.trim() || !docUrl.trim()} onClick={askWithDoc}>
                {busy ? "Procesando…" : "Procesar documento + IA"}
              </button>
            )}
            <button className="sr-btn-secondary" onClick={()=>{ setPrompt(""); setDocUrl(""); setReply(""); setError(""); }}>
              Limpiar
            </button>
          </div>

          {error && <p className="sr-p mt-3" style={{ color:"#991b1b" }}>Error: {error}</p>}
          {reply && (
            <div className="sr-card mt-4" style={{ whiteSpace:"pre-wrap" }}>
              <h3 className="sr-h3 mb-2">Resultado</h3>
              {reply}
            </div>
          )}
        </section>
      </main>
    </>
  );
}
