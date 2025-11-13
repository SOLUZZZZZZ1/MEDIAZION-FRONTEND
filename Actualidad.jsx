import React, { useEffect, useState } from "react";
import Seo from "../components/Seo.jsx";

export default function Actualidad() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const r = await fetch("/api/news");
        const data = await r.json();
        if (!r.ok || !data.ok) throw new Error("Error cargando noticias");
        setItems(data.items || []);
      } catch (e) {
        setError(e.message);
      }
    })();
  }, []);

  return (
    <>
      <Seo title="Actualidad" />
      <main className="sr-container py-8">
        <h1 className="sr-h1">Actualidad en Mediación</h1>
        {error && <p className="sr-p text-red-600">Error: {error}</p>}

        {items.length === 0 ? (
          <p className="sr-p">No hay noticias disponibles.</p>
        ) : (
          <div className="grid gap-4 mt-4">
            {items.map((it, idx) => (
              <article key={idx} className="sr-card">
                <h3 className="sr-h3">{it.title}</h3>
                <p className="sr-p">{it.summary}</p>
                <a className="sr-btn-secondary" href={it.url} target="_blank">
                  Leer noticia
                </a>
              </article>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
