import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";

export default function VocesPublic() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    (async () => {
      const r = await fetch("/api/voces/public?page=1&size=20");
      const data = await r.json();
      if (r.ok && data?.ok) setItems(data.items || []);
    })();
  }, []);

  return (
    <>
      <Seo title="Voces · Artículos de Mediadores PRO" description="Reflexiones y artículos publicados por mediadores PRO de Mediazion." />
      <main className="sr-container py-8" style={{minHeight:"calc(100vh - 160px)", background:"rgba(255,255,255,0.95)", borderRadius: 16, margin:"24px 0"}}>
        <h1 className="sr-h1">Voces</h1>
        <p className="sr-p">Reflexiones publicadas por mediadores/as. <i>Las opiniones pertenecen a sus autores.</i></p>
        <section className="grid gap-3 mt-4">
          {items.map((p) => (
            <article key={p.slug} className="rounded-2xl border p-4 bg-white">
              <h3 className="sr-h3 m-0">
                <Link to={`/voces/${p.slug}`}>{p.title}</Link>
              </h3>
              <p className="sr-small text-zinc-600 m-0">Por {p.author_email} · {p.published_at || ""}</p>
              <p className="sr-p mt-2">{p.summary}</p>
              <Link className="sr-btn-secondary" to={`/voces/${p.slug}`}>Leer más</Link>
            </article>
          ))}
          {items.length === 0 && <p className="sr-p">No hay artículos publicados todavía.</p>}
        </section>
      </main>
    </>
  );
}
