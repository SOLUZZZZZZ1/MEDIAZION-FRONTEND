// src/pages/VocesDetalle.jsx — versión FINAL (corrige slug undefined, carga artículo y comentarios)

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";

export default function VocesDetalle() {
  const { slug } = useParams();  // ❤️ SLUG correcto desde la URL
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loadingPost, setLoadingPost] = useState(true);
  const [loadingComments, setLoadingComments] = useState(true);
  const [msg, setMsg] = useState("");

  const email = localStorage.getItem("mediador_email") || "";
  const [canComment, setCanComment] = useState(false);
  const [commentText, setCommentText] = useState("");


  // 🟩 Cargar artículo
  useEffect(() => {
    if (!slug) {
      setMsg("Slug inválido.");
      setLoadingPost(false);
      return;
    }

    (async () => {
      try {
        const r = await fetch(`/api/voces/${encodeURIComponent(slug)}`);
        const data = await r.json();

        if (!r.ok || !data?.ok) {
          throw new Error(data?.detail || "No se pudo cargar el artículo");
        }

        setPost(data.post);
      } catch (e) {
        setMsg(e.message || "Error cargando el artículo.");
      } finally {
        setLoadingPost(false);
      }
    })();
  }, [slug]);


  // 🟩 Cargar comentarios
  useEffect(() => {
    if (!slug) return;
    (async () => {
      try {
        const r = await fetch(`/api/voces/${encodeURIComponent(slug)}/comments`);
        const data = await r.json();
        if (r.ok && data?.items) {
          setComments(data.items);
        }
      } catch {}
      finally {
        setLoadingComments(false);
      }
    })();
  }, [slug]);


  // 🟩 Saber si el usuario puede comentar (PRO o active)
  useEffect(() => {
    if (!email) return;

    (async () => {
      try {
        const r = await fetch(`/api/mediadores/status?email=${encodeURIComponent(email)}`);
        const d = await r.json();
        const subs = (d.subscription_status || "").toLowerCase();
        const st = (d.status || "").toLowerCase();

        setCanComment(st === "active" && ["active", "trialing"].includes(subs));
      } catch {
        setCanComment(false);
      }
    })();
  }, [email]);


  // 🟩 Publicar comentario
  async function sendComment() {
    if (!email) {
      setMsg("❌ Debes iniciar sesión.");
      return;
    }
    if (!canComment) {
      setMsg("❌ Solo mediadores PRO pueden comentar.");
      return;
    }
    if (!commentText.trim()) return;

    try {
      const r = await fetch("/api/voces/comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          slug,
          content: commentText.trim(),
        }),
      });

      const data = await r.json();
      if (!r.ok || !data?.ok) {
        throw new Error(data?.detail || "No se pudo publicar el comentario");
      }

      setComments((prev) => [...prev, data.comment]);
      setCommentText("");
      setMsg("✅ Comentario publicado.");
    } catch (e) {
      setMsg("❌ " + (e.message || "Error publicando comentario"));
    }
  }


  // 💛 MENSAJES DE CARGA
  if (loadingPost) {
    return (
      <main className="sr-container py-8">
        <p className="sr-p">Cargando artículo…</p>
      </main>
    );
  }

  if (!post) {
    return (
      <main className="sr-container py-8">
        <p className="sr-p">{msg || "No se encontró el artículo."}</p>
        <Link className="sr-btn-secondary mt-4 inline-block" to="/voces">
          Volver
        </Link>
      </main>
    );
  }


  // 🟩 CONTENIDO FINAL
  return (
    <>
      <Seo title={`${post.title} · Voces`} />

      <main className="sr-container py-8">
        <Link className="sr-btn-secondary mb-3 inline-block" to="/voces">
          ← Volver
        </Link>

        <h1 className="sr-h1">{post.title}</h1>
        <p className="sr-small text-zinc-600">
          Por {post.author_email} · {post.published_at}
        </p>

        <article className="sr-card mt-4">
          <p className="sr-p whitespace-pre-wrap">{post.content}</p>
        </article>


        {/* COMENTARIOS */}
        <section className="sr-card mt-6">
          <h2 className="sr-h3 mb-2">Comentarios</h2>

          {loadingComments && <p className="sr-small">Cargando comentarios…</p>}

          {!loadingComments && comments.length === 0 && (
            <p className="sr-small text-zinc-600">Aún no hay comentarios.</p>
          )}

          {!loadingComments &&
            comments.map((c) => (
              <div key={c.id} className="mt-3 border-t pt-2">
                <p className="sr-small text-zinc-600">
                  {c.author_email} ·{" "}
                  {c.created_at
                    ? new Date(c.created_at).toLocaleString()
                    : ""}
                </p>
                <p className="sr-p whitespace-pre-wrap">{c.content}</p>
              </div>
            ))}


          {/* FORMULARIO PARA PRO */}
          <div className="mt-4">
            {email && canComment ? (
              <>
                <label className="sr-label">Añadir comentario</label>
                <textarea
                  className="sr-input min-h-[80px]"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
                <button
                  className="sr-btn-primary mt-2"
                  onClick={sendComment}
                  disabled={!commentText.trim()}
                >
                  Publicar comentario
                </button>
              </>
            ) : (
              <p className="sr-small text-zinc-500 mt-2">
                Solo mediadores PRO pueden comentar este artículo.
              </p>
            )}

            {msg && (
              <p
                className="sr-small mt-2"
                style={{ color: msg.startsWith("✅") ? "#166534" : "#991b1b" }}
              >
                {msg}
              </p>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
