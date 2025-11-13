// IA Legal (Modo Experto)
import React, { useState } from "react";
import Seo from "../components/Seo.jsx";

export default function AiPanelLegal() {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState([]);

  async function buscar() {
    const r = await fetch("/api/ai/legal/search?q=" + encodeURIComponent(query));
    const data = await r.json();
    if (r.ok && data.ok) setItems(data.items);
  }

  return (
    <>
      <Seo title="IA Legal" />
      <main className="sr-container py-8">
        <h1 className="sr-h1">IA Experta Jurídica ⚖️</h1>

        <div className="sr-card grid gap-2 mt-4">
          <input
            className="sr-input"
            placeholder="Buscar jurisprudencia, leyes, BOE..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="sr-btn-primary" onClick={buscar}>
            Buscar
          </button>
        </div>

        <div className="grid gap-3 mt-6">
          {items.map((it, i) => (
            <article key={i} className="sr-card">
              <h3 className="sr-h3">{it.title}</h3>
              <p className="sr-p">{it.summary}</p>
              <a className="sr-btn-secondary" href={it.url} target="_blank">
                Abrir fuente
              </a>
            </article>
          ))}
        </div>
      </main>
    </>
  );
}
