// src/pages/Contacto.jsx — Página de contacto MEDIAZION (usa proxy /api/contact)
import React, { useState } from "react";
import Seo from "../components/Seo.jsx";

export default function Contacto() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(false);
  const [error, setError] = useState("");

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true); setOk(false); setError("");

    // Validación mínima en cliente
    if (!form.name.trim() || !form.email.trim() || !form.subject.trim() || !form.message.trim()) {
      setLoading(false);
      setError("Por favor, completa todos los campos.");
      return;
    }

    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      if (!r.ok) {
        const txt = await r.text();
        throw new Error(`Error ${r.status}${txt ? `: ${txt.slice(0,160)}` : ""}`);
      }
      setOk(true);
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (e) {
      setError(e.message || "No se pudo enviar el mensaje");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Seo
        title="Contacto · MEDIAZION"
        description="Contacta con el equipo de MEDIAZION para consultas, soporte o colaboraciones."
        canonical="https://mediazion.eu/contacto"
      />
      <main className="sr-container py-12" style={{ backgroundImage:"url('/marmol.jpg')", backgroundSize:"cover" }}>
        <h1 className="sr-h1 mb-2">Contacto</h1>
        <p className="sr-p mb-6">Cuéntanos en qué podemos ayudarte.</p>

        <form onSubmit={onSubmit} className="sr-card" style={{ maxWidth: 840, margin: "0 auto", background:"rgba(255,255,255,0.96)" }}>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(2,minmax(0,1fr))", gap:12 }}>
            <input className="border rounded-md px-3 py-2" name="name" value={form.name} onChange={onChange} placeholder="Tu nombre" />
            <input className="border rounded-md px-3 py-2" name="email" type="email" value={form.email} onChange={onChange} placeholder="Tu email" />
          </div>
          <input className="border rounded-md px-3 py-2 mt-3 w-full" name="subject" value={form.subject} onChange={onChange} placeholder="Asunto" />
          <textarea className="border rounded-md px-3 py-2 mt-3 w-full" rows={6} name="message" value={form.message} onChange={onChange} placeholder="Mensaje" />

          {ok && <p className="sr-p mt-3" style={{ color:"#166534" }}>¡Mensaje enviado! Te responderemos pronto.</p>}
          {error && <p className="sr-p mt-3" style={{ color:"#991b1b" }}>Error: {error}</p>}

          <div className="mt-4">
            <button className="sr-btn-primary" type="submit" disabled={loading}>
              {loading ? "Enviando..." : "Enviar mensaje"}
            </button>
          </div>
        </form>
      </main>
    </>
  );
}
