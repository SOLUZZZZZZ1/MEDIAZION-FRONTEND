import { useEffect, useState } from "react";
import { fetchNews, getNewsApiBase } from "./newsApi";

// Claves de guardado local (no usa backend)
const SAVED_KEY = "mediazion_news_saved";

function loadSaved() {
  try { return JSON.parse(localStorage.getItem(SAVED_KEY) || "[]"); }
  catch { return []; }
}
function saveSaved(list) { localStorage.setItem(SAVED_KEY, JSON.stringify(list)); }

export default function Actualidad(){
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({ source: "", tag: "", q: "" });

  // Guardadas localmente en este navegador
  const [saved, setSaved] = useState(loadSaved());
  const [onlySaved, setOnlySaved] = useState(false);

  const SOURCES = ["", "BOE", "CGPJ", "MINISTERIO_JUSTICIA", "EURLEX_DOUE", "CONFILEGAL", "LEGALTODAY"];
  const TAGS = ["", "civil", "mercantil", "laboral", "penal", "internacional", "normativa", "jurisprudencia", "doctrina"];

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

  useEffect(() => { load(); /* eslint-disable-next-line */ }, []);

  const onSubmit = (e) => { e.preventDefault(); load(); };

  // Guardar/Quitar noticia localmente
  const isSaved = (it) => saved.some(x => x.url === it.url);
  const toggleSave = (it) => {
    setSaved(prev => {
      const exists = prev.find(x => x.url === it.url);
      const next = exists
        ? prev.filter(x => x.url !== it.url)
        : [...prev, { title: it.title, url: it.url, source: it.source, date: it.date }];
      saveSaved(next);
      return next;
    });
  };

  const visibleItems = onlySaved ? items.filter(isSaved) : items;

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

          <div className="flex items-center gap-3">
            <button className="sr-btn-primary" type="submit">Filtrar</button>
            <label className="sr-p flex items-center gap-2">
              <input type="checkbox" checked={onlySaved} onChange={e=>setOnlySaved(e.target.checked)} />
              Mis guardadas (este navegador)
            </label>
          </div>

          <div className="sr-p"><strong>Backend:</strong> {getNewsApiBase() || "VITE_NEWS_API no configurado"}</div>
        </div>
      </form>

      {loading && <p className="sr-p mt-6">Cargando...</p>}
      {error && <p className="sr-p mt-6 text-red-700">Error: {error}</p>}

      <section className="mt-6" style={{display:"grid", gridTemplateColumns:"repeat(1,minmax(0,1fr))", gap:"12px"}}>
        {visibleItems.map((it, idx) => (
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
            <div style={{display:"flex", gap:"8px", marginTop:"10px"}}>
              {it.url && <a className="sr-btn-primary" href={it.url} target="_blank" rel="noopener noreferrer">Ver fuente</a>}
              <button className="sr-btn-secondary" onClick={()=>toggleSave(it)}>
                {isSaved(it) ? "Quitar" : "Guardar"}
              </button>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
