import React, { useEffect, useState } from "react";
import Seo from "../components/Seo.jsx";

const LS_EMAIL = "mediador_email";

export default function VocesEditor() {
  const [email] = useState(localStorage.getItem(LS_EMAIL) || "");
  const [pro, setPro] = useState(false);
  const [post, setPost] = useState({ title: "", summary: "", content: "", accept_terms: false });
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  // Comprobar PRO
  useEffect(() => {
    (async () => {
      if (!email) return;
      try {
        const r = await fetch(`/api/mediadores/status?email=${encodeURIComponent(email)}`);
        const data = await r.json();
        setPro(r.ok && ["trialing", "active"].includes(data?.subscription_status));
      } catch {
        setPro(false);
      }
    })();
  }, [email]);

  async function publicar() {
    setBusy(true); setMsg("");
    try {
      if (!post.title || !post.summary || !post.content) throw new Error("Rellena título, resumen y contenido.");
      if (!post.accept_terms) throw new Error("Debes aceptar las condiciones.");
      const r = await fetch("/api/voces/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...post, email, status: "published" }),
      });
      const data = await r.json();
      if (!r.ok || !data?.ok) throw new Error(data?.detail || data?.message || "No se pudo publicar el artículo");
      setMsg(`✅ Publicado correctamente. URL: /#/voces/${data.slug}`);
    } catch (e) {
      setMsg("❌ " + (e.message || "Error publicando"));
    } finally {
      setBusy(false);
    }
  }

  if (!email) {
    return (
      <main className="sr-container py-8" style={{minHeight:"calc(100vh - 160px)"}}>
        <p className="sr-p">Inicia sesión en el panel para publicar.</p>
      </main>
    );
  }

  if (!pro) {
    return (
      <main className="sr-container py-8" style={{minHeight:"calc(100vh - 160px)"}}>
        <h1 className="sr-h1">Voces · Publicar</h1>
        <p className="sr-p">Esta sección es exclusiva para mediadores/as <b>PRO</b>.</p>
        <p className="sr-p">Activa PRO desde el panel para publicar tus artículos.</p>
      </main>
    );
  }

  return (
    <>
      <Seo title="Publicar artículo · Voces" description="Escribe y publica artículos como mediador PRO." />
      <main className="sr-container py-8" style={{minHeight:"calc(100vh - 160px)", background:"rgba(255,255,255,0.95)", borderRadius:16, margin:"24px 0"}}>
        <h1 className="sr-h1 m-0">Voces · Publicar</h1>
        <form className="sr-card mt-4" style={{display:"grid", gap:12, maxWidth:900}}>
          <div>
            <label className="sr-label">Título</label>
            <input className="sr-input" value={post.title} onChange={(e)=>setPost(s=>({...s, title:e.target.value}))} />
          </div>
          <div>
            <label className="sr-label">Resumen (2–3 líneas)</label>
            <textarea className="sr-input" rows={3} value={post.summary} onChange={(e)=>setPost(s=>({...s, summary:e.target.value}))} />
          </div>
          <div>
            <label className="sr-label">Contenido</label>
            <textarea className="sr-input" rows={12} value={post.content} onChange={(e)=>setPost(s=>({...s, content:e.target.value}))} />
          </div>
          <div className="rounded-2xl border p-4 bg-white">
            <h3 className="sr-h3 m-0">Condiciones de publicación</h3>
            <ul className="sr-ul mt-2">
              <li>No se permiten contenidos políticos ni proselitistas.</li>
              <li>Sin ataques personales ni contenido ofensivo.</li>
              <li>El autor declara que el texto es propio o cuenta con permiso.</li>
              <li>Mediazion no comparte necesariamente las publicaciones ni se hace responsable.</li>
            </ul>
            <div className="flex items-center gap-2 mt-2">
              <input id="terms" type="checkbox" checked={post.accept_terms} onChange={(e)=>setPost(s=>({...s, accept_terms:e.target.checked}))} />
              <label htmlFor="terms" className="sr-label m-0">Acepto las condiciones</label>
            </div>
          </div>

          <div className="flex gap-2">
            <button type="button" className="sr-btn-primary" onClick={publicar} disabled={busy}>
              {busy ? "Publicando…" : "Publicar"}
            </button>
          </div>
          {msg && <p className="sr-p" style={{color: msg.startsWith("✅") ? "#166534" : "#991b1b"}}>{msg}</p>}
        </form>
      </main>
    </>
  );
}
