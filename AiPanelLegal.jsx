import React, { useState } from "react";
import Seo from "../components/Seo.jsx";

export default function AiPanelLegal() {
  const [q, setQ] = useState("");
  const [items, setItems] = useState([]);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  async function search() {
    const term = q.trim();
    if (!term) return;
    setBusy(true); setErr(""); setItems([]);
    try {
      const r = await fetch(`/api/ai/legal/search?q=${encodeURIComponent(term)}`);
      const data = await r.json();
      if (!r.ok || !data?.ok) throw new Error(data?.detail || "No se pudo obtener resultados");
      setItems(data.items || []);
    } catch (e) {
      setErr(e.message || "Error buscando en fuentes jurídicas");
    } finally { setBusy(false); }
  }

  return (
    <>
      <Seo title="IA · Modo experto jurídico" description="BOE, CGPJ, Confilegal, LegalToday (búsqueda pública)" />
      <main className="sr-container py-8" style={{minHeight:"calc(100vh - 160px)"}}>
        <h1 className="sr-h1">Modo experto jurídico</h1>
        <p className="sr-p">Consulta fuentes públicas: BOE, CGPJ, Confilegal, LegalToday.</p>

        <div className="sr-card mb-4" style={{display:"grid", gap:12, gridTemplateColumns:"1fr auto"}}>
          <input className="sr-input" value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Ej.: mediación civil, arrendamientos..." />
          <button className="sr-btn-primary" onClick={search} disabled={busy}>{busy ? "Buscando…" : "Buscar"}</button>
        </div>

        {err && <p className="sr-p" style={{color:"#991b1b"}}>❌ {err}</p>}

        <section className="grid gap-3">
          {items.map((a, i)=>(
            <article key={i} className="sr-card">
              <h3 className="sr-h3 m-0">
                <a href={a.url} target="_blank" rel="noopener noreferrer">{a.title}</a>
              </h3>
              <p className="sr-small text-zinc-600">{a.source} · {a.date}</p>
              <p className="sr-p" dangerouslySetInnerHTML={{__html:a.summary}} />
            </article>
          ))}
          {(!busy && items.length===0) && <p className="sr-p">Sin resultados. Prueba con otro término.</p>}
        </section>
      </main>
    </>
  );
}
