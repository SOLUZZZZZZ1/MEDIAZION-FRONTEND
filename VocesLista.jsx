// src/pages/VocesLista.jsx — Listado público de Voces
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";

export default function VocesLista() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    let alive = true;
    (async ()=>{
      try {
        const r = await fetch("/api/voces?limit=20");
        const data = await r.json();
        if (alive) setItems(Array.isArray(data.items) ? data.items : []);
      } catch {
        if (alive) setItems([]);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return ()=>{ alive = false; };
  },[]);

  return (
    <>
      <Seo
        title="Voces · MEDIAZION"
        description="Artículos y reflexiones de mediadores PRO."
        canonical="https://mediazion.eu/voces"
      />
      <main className="sr-container py-10">
        <header className="sr-card">
          <h1 className="sr-h1">Voces</h1>
          <p className="sr-p">Artículos, ideas y reflexiones de mediadores PRO.</p>
        </header>

        <section className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {loading && <div className="sr-card">Cargando…</div>}
          {!loading && items.length === 0 && (
            <div className="sr-card">No hay publicaciones todavía.</div>
          )}
          {items.map(p=>(
            <article key={p.id} className="sr-card hover:shadow-sm transition-shadow">
              <h2 className="sr-h2 mb-1">
                <Link to={`/voces/${encodeURIComponent(p.slug)}`}>{p.title}</Link>
              </h2>
              {p.summary && <p className="sr-p">{p.summary}</p>}
              <p className="sr-small mt-2 text-zinc-500">
                Por: {p.author_email} · {p.published_at ? new Date(p.published_at).toLocaleString() : ""}
              </p>
              <div className="mt-3">
                <Link className="sr-btn-secondary" to={`/voces/${encodeURIComponent(p.slug)}`}>Leer</Link>
              </div>
            </article>
          ))}
        </section>
      </main>
    </>
  );
}
