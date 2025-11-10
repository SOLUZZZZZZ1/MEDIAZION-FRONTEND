import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";

export default function VocesDetalle() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    (async () => {
      const r = await fetch(`/api/voces/${slug}`);
      const data = await r.json();
      if (r.ok && data?.ok) setPost(data.post);
    })();
  }, [slug]);

  if (!post) {
    return (
      <main className="sr-container py-8" style={{minHeight:"calc(100vh - 160px)"}}>
        <p className="sr-p">Cargando…</p>
      </main>
    );
  }

  return (
    <>
      <Seo title={`${post.title} · Voces`} description={post.summary?.slice(0,150) || "Artículo de Voces"} />
      <main className="sr-container py-8" style={{minHeight:"calc(100vh - 160px)", background:"rgba(255,255,255,0.95)", borderRadius:16, margin:"24px 0"}}>
        <Link className="sr-btn-secondary mb-3 inline-block" to="/voces">← Volver</Link>
        <h1 className="sr-h1 m-0">{post.title}</h1>
        <p className="sr-small text-zinc-600">Por {post.author_email} · {post.published_at || ""}</p>
        <article className="sr-card mt-4">
          <p className="sr-p whitespace-pre-wrap">{post.content}</p>
          <p className="sr-small text-zinc-500 mt-6">
            Nota: Las opiniones y contenidos pertenecen a sus autores; Mediazion no se hace responsable.
          </p>
        </article>
      </main>
    </>
  );
}
