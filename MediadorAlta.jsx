// src/pages/MediadorAlta.jsx
import { useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE || "https://backend-api-mediazion-1.onrender.com";
const PRICE_ID  = import.meta.env.VITE_STRIPE_PATH || import.meta.env.VITE_STRIPE_PRICE_ID; // usa la que tengas

export default function MediadorAlta() {
  const [form, setForm] = useState({ nombre: "", email: "" });
  const [status, setStatus] = useState({ sending: false, ok: null, msg: "" });
  const [subLoading, setSubLoading] = useState(false);

  const onChange = (e) => setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  async function onSubmit(e) {
    e.preventDefault();
    setStatus({ sending: true, ok: null, msg: "" });
    try {
      const res = await fetch(`${API_BASE.replace(/\/$/,"")}/mediadores/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.nombre, email: form.email }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.detail || "Error en el registro");
      setStatus({ sending: false, ok: true, msg: data?.warning || "Alta realizada. Revisa tu correo." });
      // no vaciar email si luego vas a usarlo para la suscripción
    } catch (err) {
      setStatus({ sending: false, ok: false, msg: err.message || "Error de red" });
    }
  }

  async function onSubscribe() {
    try {
      if (!form.email) throw new Error("Indica tu email antes de suscribirte");
      if (!PRICE_ID) throw new Error("Falta VITE_STRIPE_PRICE_ID en variables de entorno");
      setSubLoading(true);
      const res = await fetch(`${API_BASE.replace(/\/$/,"")}/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, priceId: PRICE_ID }),
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      if (!data?.url) throw new Error("No se recibió URL de suscripción");
      window.location.href = data.url;
    } catch (e) {
      alert(e.message || "Error iniciando suscripción");
      setSubLoading(false);
    }
  }

  return (
    <main className="sr-container py-12">
      <h1 className="sr-h1 mb-2">Alta de Mediadores</h1>
      <p className="sr-p">Registra tus datos. Recibirás una contraseña temporal por email.</p>

      <form onSubmit={onSubmit} className="sr-card mt-6" style={{ maxWidth: 720 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(1,minmax(0,1fr))", gap: 12 }}>
          <div>
            <label className="sr-p block mb-1">Nombre</label>
            <input
              name="nombre"
              value={form.nombre}
              onChange={onChange}
              className="w-full border rounded-md px-3 py-2"
              placeholder="Nombre completo"
              required
            />
          </div>
          <div>
            <label className="sr-p block mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={onChange}
              className="w-full border rounded-md px-3 py-2"
              placeholder="tu@correo.com"
              required
            />
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 16 }}>
          <button type="submit" className="sr-btn-primary" disabled={status.s.ding}>
            {status.sending ? "Registrando..." : "Dar de alta"}
          </button>
          {status.ok === true && <span style={{ color: "#166534" }}>{status.msg}</span>}
          {status.ok === false && <span style={{ color: "#991b1b" }}>Error: {status.msg}</span>}
        </div>

        <div className="mt-8">
          <h2 class="sr-h2">Activar suscripción (49,90 € / mes)</h2>
          <p className="sr-p">
            La tarjeta queda guardada y se renueva cada mes. Puedes cancelarla cuando quieras.
          </p>
          <button
            type="button"
            className="sr-btn-secondary"
            onClick={onSubscribe}
            disabled={subLoading || !form.email}
          >
            {subLoading ? "Redirigiendo a Stripe..." : "Suscribirme ahora"}
          </button>
        </div>
      </form>
    </main>
  );
}
