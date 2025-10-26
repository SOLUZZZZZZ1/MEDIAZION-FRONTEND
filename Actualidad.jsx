import { useEffect, useState } from "react";
import { fetchNews, getNewsApiBase } from "../lib/newsApi";

const SOURCES = ["", "BOE", "CGPJ", "MINISTERIO_JUSTICIA", "EURLEX_DOUE", "CONFILEGAL", "LEGALTODAY"];
const TAGS = ["", "civil", "mercantil", "laboral", "penal", "internacional", "normativa", "jurisprudencia", "doctrina"];

export default function Actualidad(){
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({ source: "", tag: "", q: "" });

  const onChange = (e) => setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const load = async () => {
    setLoading(true); setError("");
    try {
      const data = await fetchNews(filters);
      setItems(data);
    } catch (e){
      setError(e.message || "Error al cargar");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const onSubmit = (e) => { e.preventDefault(); load(); };

  return (
    <main className="sr-container py-12">
      <h1 className="sr-h1 mb-2">Actualidad en Mediación</h1>
      <p className="sr-p">Noticias, resoluciones y artículos de fuentes oficiales y medios jurídicos.</p>

      <form onSubmit={onSubmit} className="sr-card mt-6" style={{display:"grid", gap: "12px"}}>
        <div style={{display:"grid", gridTemplateColumns:"repeat(1,minmax(0,1fr))", gap:"12px"}}>
          <div style={{display:"grid", gridTemplateColumns:"repeat(3,minmax(0,1fr))", gap:"12px"}}>
            <select name="source" value={filters.source} onChange={onChange} className="border rounded-md px-3 py-2">
              {SOURCES.map(s => <option key={s} value={s}>{s || "Todas las fuentes"}</option>)}
            </select>
            <select name="tag" value={filters.tag} onChange={onChange} className="border rounded-md px-3 py-2">
              {TAGS.map(t => <option key={t} value={t}>{t || "Todas las materias"}</option>)}
            </select>
            <input name="q" value={filters.q} onChange={onChange} className="border rounded-md px-3 py-2" placeholder="Buscar texto..." />
          </div>
          <div>
            <button className="sr-btn-primary" type="submit">Filtrar</button>
          </div>
          <div className="sr-p"><strong>Backend:</strong> {getNewsApiBase() || "VITE_NEWS_API no configurado"}</div>
        </div>
      </form>

      {loading && <p className="sr-p mt-6">Cargando...</p>}
      {error && <p className="sr-p mt-6 text-red-700">Error: {error}</p>}

      <section className="mt-6" style={{display:"grid", gridTemplateColumns:"repeat(1,minmax(0,1fr))", gap:"12px"}}>
        {items.map((it, idx) => (
          <article key={idx} className="sr-card">
            <div style={{display:"flex", justifyContent:"space-between", gap:"12px", alignItems:"baseline"}}>
              <h3 className="sr-h3" style={{margin:0}}>{it.title}</h3>
              <span className="sr-p" style={{opacity:.7}}>{it.date || ""}</span>
            </div>
            <p className="sr-p" style={{marginTop:"6px"}}>{it.summary || ""}</p>
            <div className="sr-p" style={{marginTop:"8px", display:"flex", gap:"8px", flexWrap:"wrap", alignItems:"center"}}>
              <span style={{fontWeight:600}}>{it.source}</span>
              {(it.tags||[]).map((tg,i)=>(<span key={i} className="sr-p" style={{background:"#eef2ff", padding:"2px 8px", borderRadius:"9999px"}}>{tg}</span>))}
            </div>
            {it.url && <a className="sr-btn-secondary" style={{display:"inline-block", marginTop:"8px"}} href={it.url} target="_blank" rel="noopener noreferrer">Ver fuente</a>}
          </article>
        ))}
      </section>
    </main>
  );
}
