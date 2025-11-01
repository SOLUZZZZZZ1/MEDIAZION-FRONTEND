// src/pages/MediadoresDirectorio.jsx
import React, { useEffect, useState } from "react";
import Seo from "../components/Seo.jsx";

const API_BASE = import.meta.env.VITE_API_BASE || "https://backend-api-mediazion-1.onrender.com";

export default function MediadoresDirectorio() {
  const [items, setItems] = useState([]);
  const [q, setQ] = useState(""); const [prov, setProv] = useState(""); const [esp, setEsp] = useState("");

  async function load() {
    try {
      const url = new URL(API_BASE.replace(/\/$/,"") + "/mediadores/public");
      if (prov) url.searchParams.set("provincia", prov);
      if (esp)  url.searchParams.set("especialidad", esp);
      if (q)    url.searchParams.set("q", q);
      const r = await fetch(url.toString());
      const data = await r.json();
      setItems(Array.isArray(data) ? data : []);
    } catch {
      setItems([]);
    }
  }
  useEffect(() => { load(); /* init */ }, []);

  return (
    <>
      <Seo
        title="Directorio de mediadores · MEDIAZION"
        description="Mediadores aprobados por MEDIAZION en toda España."
        canonical="https://mediazion.eu/mediadores/directorio"
      />
      <main className="sr-container py-12" style={{backgroundImage:"url('/marmol.jpg')", backgroundSize:"cover", backgroundPosition:"center"}}>
        <h1 className="sr-h1 mb-2">Directorio de mediadores</h1>
        <p className="sr-p mb-4">Profesionales aprobados por <strong>MEDIAZION</strong>.</p>

        <section className="sr-card" style={{ marginBottom: 16 }}>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(1,minmax(0,1fr))", gap:12 }}>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,minmax(0,1fr))", gap:12 }}>
              <input className="border rounded-md px-3 py-2" value={q} onChange={e=>setQ(e.target.value)} placeholder="Buscar nombre o bio..." />
              <input className="border rounded-md px-3 py-2" value={prov} onChange={e=>setProv(e.target.value)} placeholder="Provincia" />
              <select className="border rounded-md px-3 py-2" value={esp} onChange={e=>setEsp(e.target.value)}>
                <option value="">Especialidad (todas)</option>
                <option value="civil">Civil</option>
                <option value="mercantil">Mercantil</option>
                <option value="familiar">Familiar</option>
                <option value="comunitaria">Comunitaria</option>
                <option value="laboral">Laboral</option>
              </select>
            </div>
            <div><button className="sr-btn-primary" onClick={load}>Aplicar filtros</button></div>
          </div>
        </section>

        <section className="sr-grid-3">
          {items.length === 0 && <div className="sr-card">No hay mediadores que coincidan con el filtro.</div>}
          {items.map((m) => (
            <article key={m.id} className="sr-card" style={{ background:"rgba(255,255,255,0.96)" }}>
              <div style={{display:"flex", gap:12}}>
                <img src={m.photo_url || "/logo.png"} alt={m.name} style={{width:72, height:72, borderRadius:12, objectFit:"cover", border:"1px solid #e5e7eb"}} />
                <div>
                  <h3 className="sr-h3" style={{margin:0}}>{m.name}</h3>
                  <p className="sr-p" style={{margin:0}}>{m.especialidad || ""}</p>
                  <p className="sr-p" style={{margin:0}}>{m.provincia || "—"}</p>
                </div>
              </div>
              {m.bio && <p className="sr-p" style={{marginTop:12}}>{m.bio}</p>}
              {m.cv_url && <a className="sr-btn-secondary" href={m.cv_url} target="_blank" rel="noopener noreferrer" style={{marginTop:8}}>Ver currículum</a>}
            </article>
          ))}
        </section>
      </main>
    </>
  );
}
