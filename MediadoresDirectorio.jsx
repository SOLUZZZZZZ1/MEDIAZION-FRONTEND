// src/pages/MediadoresDirectorio.jsx (versión proxy /api/*)
import React, { useEffect, useState, useMemo } from "react";
import Seo from "../components/Seo.jsx";

function buildUrl({ q, prov, esp }) {
  const url = new URL("/api/mediadores/public", window.location.origin);
  if (prov) url.searchParams.set("provincia", prov);
  if (esp)  url.searchParams.set("especialidad", esp);
  if (q)    url.searchParams.set("q", q);
  return url.toString();
}

export default function MediadoresDirectorio() {
  const [items, setItems] = useState([]);
  const [q, setQ] = useState("");
  const [prov, setProv] = useState("");
  const [esp, setEsp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const url = useMemo(() => buildUrl({ q, prov, esp }), [q, prov, esp]);

  async function load(signal) {
    setLoading(true); setError("");
    try {
      const r = await fetch(url, { signal });
      if (!r.ok) {
        const text = await r.text();
        throw new Error(`Error ${r.status}${text ? `: ${text.slice(0, 200)}` : ""}`);
      }
      const data = await r.json();
      setItems(Array.isArray(data) ? data : []);
    } catch (e) {
      if (e.name !== "AbortError") {
        setError(e.message || "Error al cargar");
        setItems([]);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const controller = new AbortController();
    load(controller.signal);
    return () => controller.abort();
  }, []);

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
              <input aria-label="Búsqueda" className="border rounded-md px-3 py-2" value={q} onChange={e=>setQ(e.target.value)} placeholder="Buscar nombre o bio..." />
              <input aria-label="Provincia" className="border rounded-md px-3 py-2" value={prov} onChange={e=>setProv(e.target.value)} placeholder="Provincia" />
              <select aria-label="Especialidad" className="border rounded-md px-3 py-2" value={esp} onChange={e=>setEsp(e.target.value)}>
                <option value="">Especialidad (todas)</option>
                <option value="civil">Civil</option>
                <option value="mercantil">Mercantil</option>
                <option value="familiar">Familiar</option>
                <option value="comunitaria">Comunitaria</option>
                <option value="laboral">Laboral</option>
              </select>
            </div>
            <div className="flex items-center gap-3">
              <button className="sr-btn-primary" onClick={() => load()} disabled={loading}>
                {loading ? "Cargando..." : "Aplicar filtros"}
              </button>
              <span className="sr-p" style={{opacity:.7, fontSize:12}}>
                Fuente: /api/mediadores/public (proxy Vercel)
              </span>
            </div>
          </div>
        </section>

        {error && (
          <div className="sr-card" style={{ borderLeft:"4px solid #ef4444", background:"rgba(254,242,242,0.9)", marginBottom:16 }}>
            <p className="sr-p" style={{color:"#991b1b", margin:0}}>
              {error.includes("Failed to fetch")
                ? "No se pudo conectar con el servidor. Verifica la reescritura /api/* en vercel.json."
                : `Error: ${error}`}
            </p>
          </div>
        )}

        <section className="sr-grid-3">
          {!loading && !error && items.length === 0 && (
            <div className="sr-card">No hay mediadores que coincidan con el filtro.</div>
          )}
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
