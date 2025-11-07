// src/pages/Agenda.jsx — Crear citas (MVP)
import React, { useState } from "react";
import Seo from "../components/Seo.jsx";

const LS_EMAIL = "mediador_email";

export default function Agenda() {
  const [email, setEmail] = useState(localStorage.getItem(LS_EMAIL) || "");
  const [asunto, setAsunto] = useState("Sesión de mediación");
  const [fecha, setFecha] = useState(""); // YYYY-MM-DD
  const [hora, setHora] = useState("");   // HH:MM
  const [lugar, setLugar] = useState("Online");
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  function buildISO() {
    if (!fecha || !hora) return null;
    // Construye "YYYY-MM-DDTHH:MM:00Z" (UTC) — sencillo para MVP
    return `${fecha}T${hora}:00Z`;
  }

  async function crearEvento(e) {
    e.preventDefault();
    setBusy(true); setMsg("");
    try {
      const fecha_iso = buildISO();
      if (!fecha_iso) throw new Error("Selecciona fecha y hora");
      const r = await fetch("/api/agenda/evento", {
        method: "POST",
        headers: { "Content-Type":"application/json" },
        body: JSON.stringify({ email, asunto, fecha_iso, lugar }),
      });
      const data = await r.json();
      if (!r.ok || !data?.ok) throw new Error(data?.detail || "No se pudo crear la cita");
      setMsg(`Cita creada (#${data.id}).`);
      // reset suave
      // setAsunto("Sesión de mediación"); setFecha(""); setHora(""); setLugar("Online");
    } catch (err) {
      setMsg(err.message || "Error creando cita");
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <Seo
        title="Agenda · MEDIAZION"
        description="Crea citas con asunto, fecha/hora y lugar. Próximamente: recordatorios y videollamada."
        canonical="https://mediazion.eu/panel-mediador/agenda"
      />
      <main className="sr-container py-8"
        style={{ minHeight:"calc(100vh - 160px)", background:"rgba(255,255,255,0.95)", borderRadius:16, margin:"24px 0" }}>

        <header className="sr-card">
          <h1 className="sr-h1">Agenda</h1>
          <p className="sr-p">Crea citas de trabajo. Próximamente enviaremos recordatorios por email y enlace de videollamada.</p>
        </header>

        <section className="sr-card mt-4" style={{ maxWidth: 800, margin:"0 auto" }}>
          <h2 className="sr-h2">Nueva cita</h2>
          <form onSubmit={crearEvento} style={{ display:"grid", gap:12 }}>
            <label className="sr-label">Email del mediador</label>
            <input className="sr-input" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required />

            <label className="sr-label">Asunto</label>
            <input className="sr-input" value={asunto} onChange={(e)=>setAsunto(e.target.value)} required />

            <div style={{ display:"grid", gap:12, gridTemplateColumns:"1fr 1fr" }}>
              <div>
                <label className="sr-label">Fecha</label>
                <input className="sr-input" type="date" value={fecha} onChange={(e)=>setFecha(e.target.value)} required />
              </div>
              <div>
                <label className="sr-label">Hora</label>
                <input className="sr-input" type="time" value={hora} onChange={(e)=>setHora(e.target.value)} required />
              </div>
            </div>

            <label className="sr-label">Lugar</label>
            <input className="sr-input" value={lugar} onChange={(e)=>setLugar(e.target.value)} placeholder="Online / Dirección" />

            <button className="sr-btn-primary" type="submit" disabled={busy || !email || !asunto || !fecha || !hora}>
              {busy ? "Guardando…" : "Crear cita"}
            </button>

            {msg && <p className="sr-p" style={{ color:"#166534" }}>{msg}</p>}
          </form>
        </section>
      </main>
    </>
  );
}
