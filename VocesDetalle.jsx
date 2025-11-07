// src/pages/VocesDetalle.jsx — Detalle público + comentarios (solo PRO pueden comentar)
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Seo from "../components/Seo.jsx";

const LS_EMAIL = "mediador_email";

export default function VocesDetalle() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cmt, setCmt] = useState("");
  const email = localStorage.getItem(LS_EMAIL) || "";

  async function load() {
    setLoading(true);
    try {
      const r = await fetch(`/api/voces/${encodeURIComponent(slug)}`);
      const data = await r.json();
      if (!r.ok || !data?.ok) throw new Error(data?.detail || "No encontrado");
      setPost(data.post);
      // comentarios
      const rc = await fetch(`/api/voces/${data.post.id}/comments`);
      const dc = await rc.json();
      setComments(Array.isArray(dc.items) ? dc.items : []);
    } catch {
      setPost(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(()=>{ load(); /* eslint-disable-next-line */ }, [slug]);

  async function publicarComentario() {
    try {
      if (!email) { alert("Inicia sesión en el panel para comentar."); return; }
      if (!cmt.trim()) return;
      const r = await fetch(`/api/voces/${post.id}/comments`, {
        method: "POST",
        headers: { "Content-Type":"application/json" },
        body: JSON.stringify({ email, content: cmt })
      });
      const data = await r.json();
      if (!r.ok || !data?.ok) throw new Error(data?.detail || "No se pudo comentar");
      setCmt("");
      await load();
    } catch (e) {
      alert(e.message || "Error al comentar");
    }
  }

  return (
    <>
      <Seo
        title={post ? `${post.title} · Voces` : "Voces · MEDIAZION"}
        description={post?.summary || "Publicaciones de mediadores PRO"}
        canonical={`https://mediazion.eu/voces/${slug}`}
      />
      <main className="sr-container py-10">
        {loading && <div className="sr-card">Cargando…</div>}
        {!loading && !post && <div className="sr-card">No encontrado o no publicado.</div>}
        {!loading && post && (
          <>
            <article className="sr-card">
              <h1 className="sr-h1">{post.title}</h1>
              {post.summary && <p className="sr-p mt-1">{post.summary}</p>}
              <p className="sr-small text-zinc-500 mt-1">
                Por: {post.author_email} · {post.published_at ? new Date(post.published_at).toLocaleString() : ""}
              </p>
              <hr className="my-3" />
              <div className="sr-p" style={{ whiteSpace:"pre-wrap" }}>
                {post.content}
              </div>
            </article>

            <section className="sr-card mt-4">
              <h2 className="sr-h2">Comentarios</h2>
              {comments.length === 0 && <p className="sr-p">Sé el primero en comentar.</p>}
              <div className="mt-2 grid gap-3">
                {comments.map(cm=>(
                  <div key={cm.id} className="rounded-xl border p-3 bg-white">
                    <p className="sr-small text-zinc-500 mb-1">
                      {cm.author_email} · {new Date(cm.created_at).toLocaleString()}
                    </p>
                    <div className="sr-p" style={{ whiteSpace:"pre-wrap" }}>{cm.content}</div>
                  </div>
                ))}
              </div>

              <div className="mt-4">
                <label className="sr-label">Comentar (solo PRO, sesión iniciada)</label>
                <textarea className="sr-input" rows={3} value={cmt} onChange={e=>setCmt(e.target.value)}
                  placeholder={email ? "Escribe tu comentario…" : "Inicia sesión en el Panel para comentar"} />
                <button className="sr-btn-primary mt-2" onClick={publicarComentario} disabled={!email || !cmt.trim()}>
                  Publicar comentario
                </button>
              </div>
            </section>
          </>
        )}
      </main>
    </>
  );
}
