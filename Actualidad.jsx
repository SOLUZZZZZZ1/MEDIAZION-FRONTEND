// helpers (arriba del componente)
const SAVED_KEY = "mediazion_news_saved";
function loadSaved() {
  try { return JSON.parse(localStorage.getItem(SAVED_KEY) || "[]"); }
  catch { return []; }
}
function saveSaved(list) {
  localStorage.setItem(SAVED_KEY, JSON.stringify(list));
}

// dentro del componente:
const [saved, setSaved] = useState(loadSaved());
const [onlySaved, setOnlySaved] = useState(false);

const toggleSave = (item) => {
  setSaved(prev => {
    const exists = prev.find(x => x.url === item.url);
    const next = exists
      ? prev.filter(x => x.url !== item.url)
      : [...prev, { title: item.title, url: item.url, source: item.source, date: item.date }];
    saveSaved(next);
    return next;
  });
};

const isSaved = (it) => saved.some(x => x.url === it.url);

// al pintar la lista:
const visibleItems = onlySaved
  ? items.filter(it => isSaved(it))
  : items;

// en el formulario de filtros añade:
<label className="sr-p flex items-center gap-2">
  <input type="checkbox" checked={onlySaved} onChange={e=>setOnlySaved(e.target.checked)} />
  Mis guardadas (este navegador)
</label>

// en cada card de noticia (dentro del map)
<button
  className="sr-btn-secondary"
  onClick={() => toggleSave(it)}
  aria-label={isSaved(it) ? "Quitar de guardadas" : "Guardar noticia"}
  style={{marginLeft:8}}
>
  {isSaved(it) ? "Quitar" : "Guardar"}
</button>
