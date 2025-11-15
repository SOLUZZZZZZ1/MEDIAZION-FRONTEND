// src/pages/AiPanelLegal.jsx — IA Experta Jurídica (chat + buscador de noticias)
import React, { useEffect, useRef, useState } from "react";
import Seo from "../components/Seo.jsx";

function ChatBubble({ role, content }) {
  const isUser = role === "user";
  return (
    <div className={`mb-3 flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={
          "max-w-[90%] px-4 py-3 rounded-2xl shadow-sm " +
          (isUser
            ? "bg-sky-600 text-white rounded-br-xl"
            : "bg-white border border-zinc-200 text-zinc-800 rounded-bl-xl")
        }
      >
        <pre className="whitespace-pre-wrap m-0">{content}</pre>
      </div>
    </div>
  );
}

export default function AiPanelLegal() {
  const [question, setQuestion] = useState("");
  const [chat, setChat] = useState([
    {
      role: "assistant",
      content:
        "Soy la IA Experta Jurídica de MEDIAZION. Puedo orientarte sobre mediación civil, mercantil, familiar y resolución de conflictos. ¿Cuál es tu consulta?"
    }
  ]);
  const [chatLoading, setChatLoading] = useState(false);
  const [chatError, setChatError] = useState("");
  const chatRef = useRef(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchItems, setSearchItems] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState("");

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight + 200;
    }
  }, [chat, chatLoading]);

  async function sendQuestion(e) {
    if (e) e.preventDefault();
    const q = question.trim();
    if (!q) return;

    const token = localStorage.getItem("jwt_token") || "ok";

    setChat(prev => [...prev, { role: "user", content: q }]);
    setQuestion("");
    setChatError("");
    setChatLoading(true);

    try {
      const r = await fetch("/api/ai/legal/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        },
        body: JSON.stringify({ question: q })
      });
      const data = await r.json().catch(() => ({}));
      if (!r.ok || !data?.answer) {
        throw new Error(data?.detail || data?.message || "No se pudo obtener respuesta");
      }
      setChat(prev => [...prev, { role: "assistant", content: data.answer }]);
    } catch (err) {
      setChatError(err.message || "Error en IA Legal");
    } finally {
      setChatLoading(false);
    }
  }

  async function doSearch(e) {
    if (e) e.preventDefault();
    const q = searchQuery.trim();
    if (!q) return;
    setSearchLoading(true);
    setSearchError("");
    setSearchItems([]);

    try {
      const r = await fetch(`/api/ai/legal/search?q=${encodeURIComponent(q)}`);
      const data = await r.json().catch(() => ({}));
      if (!r.ok || !data?.ok) {
        throw new Error(data?.detail || "No se pudieron cargar las noticias");
      }
      setSearchItems(data.items || []);
    } catch (err) {
      setSearchError(err.message || "Error al buscar noticias");
    } finally {
      setSearchLoading(false);
    }
  }

  return (
    <>
      <Seo
        title="IA Experta Jurídica · MEDIAZION"
        description="Consulta jurídica sobre mediación civil, mercantil y familiar con la IA Legal de MEDIAZION."
      />
      <main className="sr-container py-8">
        <h1 className="sr-h1">IA Experta Jurídica ⚖️</h1>
        <p className="sr-p mb-4">
          Pregunta sobre mediación y resolución de conflictos. La IA te orientará con
          criterios jurídicos, sin sustituir el asesoramiento profesional presencial.
        </p>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Chat Jurídico */}
          <section className="sr-card flex flex-col h-[60vh]">
            <h2 className="sr-h2 mb-2">Chat jurídico</h2>
            <div
              ref={chatRef}
              className="flex-1 overflow-auto border border-zinc-200 rounded-lg p-3 mb-3"
            >
              {chat.map((m, idx) => (
                <ChatBubble key={idx} role={m.role} content={m.content} />
              ))}
              {chatLoading && (
                <p className="sr-small text-zinc-500">La IA está pensando…</p>
              )}
            </div>

            <form onSubmit={sendQuestion} className="flex flex-col gap-2">
              <textarea
                className="sr-input resize-none"
                rows={3}
                placeholder="Ej.: ¿Se puede utilizar la mediación para un conflicto entre socios de una empresa?"
                value={question}
                onChange={e => setQuestion(e.target.value)}
              />
              {chatError && (
                <p className="sr-small text-red-700">{chatError}</p>
              )}
              <button
                className="sr-btn-primary self-start"
                type="submit"
                disabled={!question.trim() || chatLoading}
              >
                {chatLoading ? "Consultando…" : "Preguntar a la IA Legal"}
              </button>
            </form>
          </section>

          {/* Buscador de noticias jurídicas */}
          <section className="sr-card flex flex-col h-[60vh]">
            <h2 className="sr-h2 mb-2">Actualidad jurídica (BOE, Confilegal…)</h2>
            <form onSubmit={doSearch} className="mb-3 flex gap-2">
              <input
                className="sr-input flex-1"
                placeholder="Buscar en BOE / Confilegal / CGPJ… (ej.: 'mediación familiar')"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
              <button className="sr-btn-secondary" type="submit" disabled={!searchQuery.trim() || searchLoading}>
                {searchLoading ? "Buscando…" : "Buscar"}
              </button>
            </form>

            {searchError && (
              <p className="sr-small text-red-700 mb-2">{searchError}</p>
            )}

            <div className="flex-1 overflow-auto space-y-3">
              {searchLoading && <p className="sr-small">Cargando noticias…</p>}
              {!searchLoading && searchItems.length === 0 && (
                <p className="sr-small text-zinc-500">
                  Introduce un término para buscar noticias relacionadas.
                </p>
              )}
              {searchItems.map((it, i) => (
                <article key={i} className="sr-card">
                  <h3 className="sr-h3">{it.title}</h3>
                  <p className="sr-small text-zinc-600 mb-1">
                    {it.source} · {it.date}
                  </p>
                  <p className="sr-p">{it.summary}</p>
                  <a
                    className="sr-btn-secondary mt-2 inline-block"
                    href={it.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ver fuente
                  </a>
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
