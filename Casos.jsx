// src/pages/Casos.jsx — Lista/crea expedientes + notas (MVP)
import React, { useEffect, useState } from "react";
import Seo from "../components/Seo.jsx";

const LS_EMAIL = "mediador_email";

export default function Casos() {
  const [email, setEmail] = useState(localStorage.getItem(LS_EMAIL) || "");
  const [items, setItems] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const [notaTexto, setNotaTexto] = useState("");
  const [notaCasoId, setNotaCasoId] = useState("");

  async function load() {
    if (!email) return;
    setLoading(true);
    try {
      const r = await fetch(`/api/casos?email=${encodeURIComponent(email)}`);
      const data = await r.json();
      setItems(Array.isArray(data.items) ? data.items : []);
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); /* eslint-disable-next-line */ }, [email]);

  async function crearCaso(e) {
    e.preventDefault();
    setMsg("");
    try {
      const r = await fetch("/api/casos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, titulo }),
      });
      const data = await r.json();
      if (!r.ok || !data?.ok) throw new Error(data?.detail || "No se pudo crear el caso");
      setTitulo("");
      await load();
      setMsg("Caso creado correctamente.");
    } catch (err) {
      setMsg(err.message || "Error creando caso");
    }
  }

  async function agregarNota(e) {
    e.preventDefault();
    setMsg("");
    try {
      if (!notaCasoId || !notaTexto.trim()) return;
      const r = await fetch(`/api/casos/${encodeURIComponent(notaCasoId)}/nota`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nota: notaTexto }),
      });
      const data = await r.json();
      if (!r.ok || !data?.ok) throw new Error(data?.detail || "No se pudo agregar la nota");
      setNotaTexto("");
      setNotaCasoId("");
      await load();
      setMsg("Nota añadida.");
    } catch (err) {
      setMsg(err.message || "Error añadiendo nota");
    }
  }

  return (
    <>
      <Seo
        title="Expedientes · MEDIAZION"
        description="Crea y gestiona expedientes de mediación. Añade notas y organiza tu trabajo."
        canonical="https://mediazion.eu/panel-mediador/casos"
      />
      <main className="sr-container py-8"
        style={{ minHeight:"calc(100vh - 160px)", background:"rgba(255,255,255,0.95)", borderRadius:16, margin:"24px 0" }}>

        <header className="sr-card">
          <h1 className="sr-h1">Expedientes</h1>
          <p className="sr-p">Organiza tus casos, añade notas y mantén una vista rápida.</p>
        </header>

        {/* Crear caso */}
        <section className="sr-card mt-4" style={{ maxWidth: 720, margin:"0 auto" }}>
          <h2 className="sr-h2">Nuevo expediente</h2>
          <form onSubmit={crearCaso} style={{ display:"grid", gap:12 }}>
            <label className="sr-label">Email del mediador</label>
            <input className="sr-input" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required />

            <label className="sr-label">Título del caso</label>
            <input className="sr-input" value={titulo} onChange={(e)=>setTitulo(e.target.value)} placeholder="Conflicto comercial #1" required />

            <button className="sr-btn-primary" type="submit" disabled={!email || !titulo.trim()}>
              Crear expediente
            </button>
            {msg && <p className="sr-p" style={{ color:"#166534" }}>{msg}</p>}
          </form>
        </section>

        {/* Lista de casos */}
        <section className="sr-card mt-4">
          <h2 className="sr-h2">Mis expedientes</h2>
          {loading && <p className="sr-p">Cargando…</p>}
          {!loading && items.length === 0 && <p className="sr-p">No hay expedientes todavía.</p>}
          <div className="mt-3" style={{ display:"grid", gap:12 }}>
            {items.map(it => (
              <article key={it.id} className="sr-card" style={{ background:"rgba(248,250,252,0.75)" }}>
                <h3 className="sr-h3">{it.titulo}</h3>
                <p className="sr-small">ID: {it.id} · Estado: {it.estado} · Fecha: {new Date(it.created_at).toLocaleString()}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Añadir nota */}
        <section className="sr-card mt-4" style={{ maxWidth: 720, margin:"0 auto" }}>
          <h2 className="sr-h2">Añadir nota a un expediente</h2>
          <form onSubmit={agregarNota} style={{ display:"grid", gap:12 }}>
            <label className="sr-label">ID del expediente</label>
            <input className="sr-input" value={notaCasoId} onChange={(e)=>setNotaCasoId(e.target.value)} placeholder="Ej.: 1" required />

            <label className="sr-label">Nota</label>
            <textarea className="sr-input" rows={4} value={notaTexto} onChange={(e)=>setNotaTexto(e.target.value)} placeholder="Texto de la nota…" required />

            <button className="sr-btn-secondary" type="submit" disabled={!notaCasoId || !notaTexto.trim()}>
              Guardar nota
            </button>
          </form>
        </section>
      </main>
    </>
  );
}
