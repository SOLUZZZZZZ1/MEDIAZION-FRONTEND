// src/pages/VocesEditor.jsx
import React, { useEffect, useState } from "react";
import Seo from "../components/Seo.jsx";

export default function VocesEditor() {
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [accept, setAccept] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const e = localStorage.getItem("mediador_email") || "";
    setEmail(e);
  }, []);

  async function publicar() {
    setMsg("");
    try {
      if (!email) throw new Error("No hay sesión activa");
      if (!title || !summary || !content) throw new Error("Rellena título, resumen y contenido");
      if (!accept) throw new Error("Debes aceptar las condiciones de publicación");
      const res = await fetch("/api/voces/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, title, summary, content, accept_terms: accept }),
      });
      const data = await res.json();
      if (!res.ok || !data?.ok) throw new Error(data?.detail || "No se pudo publicar");
      setMsg(`✅ Publicado. Ver: /#/voces/${data.slug}`);
      setTitle(""); setSummary(""); setContent(""); setAccept(false);
    } catch (e) {
      setMsg("❌ " + e.message);
    }
  }

  return (
    <>
      <Seo title="Voces · Publicar" />
      <main className="sr-container py-8" style={{ minHeight: "calc(100vh - 160px)" }}>
        <h1 className="sr-h1">Publicar en Voces</h1>
        <div className="sr-card" style={{ maxWidth: 900, margin: "16px auto" }}>
          <div className="grid gap-3">
            <input className="sx-input" placeholder="Tu email (PRO)" value={email} onChange={e=>setEmail(e.target.value)} />
            <input className="sr-input" placeholder="Título del artículo" value={title} onChange={e=>setTitle(e.target.value)} />
            <textarea className="sr-input" rows={3} placeholder="Resumen breve" value={summary} onChange={e=>setSummary(e.target.value)} />
            <textarea className="sr-input" rows={12} placeholder="Contenido (Markdown o texto plano)" value={content} onChange={e=>setContent(e.target.value)} />
            <label className="sr-small">
              <input type="checkbox" checked={accept} onChange={e=>setAccept(e.target.checked)} /> Acepto las condiciones de publicación (no contenido político/ofensivo; soy autor del texto).
            </label>
            <div className="flex gap-2">
              <button className="sr-btn-primary" onClick={publicar}>Publicar ahora</button>
              {msg && <span className="sr-small">{msg}</span>}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
