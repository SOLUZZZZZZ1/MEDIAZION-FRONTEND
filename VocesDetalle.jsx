// src/pages/VocesDetalle.jsx — detalle de un artículo público
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";

export default function VocesDetalle() {
  const { slug } = useState(window.location.hash.split("/").slice(2).join("/"))[0]; // para HashRouter
  const [post, setPost] = useState(null);

  useEffect(() => {
    (async () => {
      const r = await fetch(`/api/voces/${slug}`);
      const data = await r.json();
      if (r.ok && data?.ok) setPost(data.post);
    })();
  }, [slug]);

  if (!post) {
    return <main className="sr-container py-8"><p className="sr-p">Cargando…</p></main>;
  }
  return (
    <>
      <Seo title={`${post.title} · Voces`} />
      <main className="sr-container py-8" style={{ minHeight: "calc(100vh - 160px)" }}>
        <Link className="sr-btn-secondary mb-3 inline-block" to="/voces">← Volver</Link>
        <h1 className="sr-h1">{post.title}</h1>
        <p className="sr-small text-zinc-600">Por {post.author_email} · {post.published_at}</p>
        <article className="sr-card">
          <p className="sr-p whitespace-pre-wrap">{post.content}</p>
        </article>
      </main>
    </>
  );
}
