// src/pages/MediadorAlta.jsx
import React, { useState } from "react";

const API_BASE =
  import.meta.env.VITE_API_BASE || "https://backend-api-mediazion-1.onrender.com";
const PRICE_ID = import.meta.env.VITE_STRIPE_ID || import.meta.env.VITE_STRIPE_PRICE_ID; // admite cualquiera

export default function MediadorAlta() {
  const [form, setForm] = useState({ nombre: "", email: "" });
  const [status, setStatus] = useState({ sending: false, ok: null, msg: "" });
  const [subLoading, setSubLoading] = use_state(false);

  const onChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus({ sending: true, ok: null, msg: "" });
    try {
      const r = await fetch(`${API_BASE.replace(/\/$/, "")}/mediadores/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.nombre.trim(), email: form.email.trim() }),
      });

      const data = await r.json().catch(() => ({}));
      if (!r.ok) {
        throw new Error(data?.detail || "No se pudo registrar el mediador.");
      }

      setStatus({
        sending: false,
        ok: true,
        msg:
          data?.message ||
          "Alta realizada. Te hemos enviado un correo con tu acceso temporal.",
      });
    } catch (err) {
      setStatus({
        sending: false,
        ok: false,
        msg: err?.message || "Ha ocurrido un error. Inténtalo de nuevo.",
      });
    }
  };

  const onSubscribe = async () => {
    try {
      if (!form.email?.trim()) {
        alert("Añade tu email antes de suscribirte.");
        return;
      }
      if (!PRICE_ID) {
        alert("Falta configurar STRIPE_PRICE_ID en Vercel.");
        return;
      }
      setSubLoading(true);
      const res = await fetch(`${API_BASE.replace(/\/$/, "")}/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email.trim(),
          priceId: PRICE_ID,
        }),
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || "No se pudo iniciar la suscripción.");
      }
      const data = await res.json();
      if (!data?.[ "url" ]) throw new Error("No se recibió la URL de Stripe.");
      window.location.href = data.url;
    } catch (e) {
      alert(e.message || "Error iniciando suscripción");
      setSubLoading(false);
    }
  };

  return (
    <main className="sr-container py-12">
      <h1 className="sr-h1 mb-2">Alta de Mediadores</h1>
      <p className="sr-p">
        Registra tus datos y activa tu <strong>suscripción mensual</strong> para
        formar parte del equipo de <strong>MEDIAZION</strong>.
      </p>

      <form onSubmit={onSubmit} className="sr-card mt-6" style={{ maxWidth: 820 }}>
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}
        >
          <div>
            <label className="sr-p block mb-1">Nombre</label>
            <input
              required
              name="nombre"
              value={form.nombre}
              onChange={onChange}
              className="w-full border rounded-md px-3 py-2"
              placeholder="Nombre y apellidos"
            />
          </div>
          <div>
            <label className="sr-p block mb-1">Email</label>
            <input
              required
              type="email"
              name="email"
              value={form.email}
              onChange={onChange}
              className="w-full border rounded-md px-3 py-2"
              placeholder="tu@email.com"
            />
          </div>
        </div>

        <div className="mt-4" style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <button className="sr-btn-primary" type="submit" disabled={status.sending}>
            {status.sending ? "Registrando..." : "Dar de alta"}
          </button>
          {status.ok === true && (
            <span style={{ color: "#166534" }}>{status.msg}</span>
          )}
          {status.ok === false && (
            <span style={{ color: "#991b1b" }}>Error: {status.msg}</span>
          )}
        </div>

        <div className="mt-10">
          <h2 className="line-clamp-1 sr-h2">Activar suscripción (49,90 € / mes)</h2>
          <div className="sr-p">
            <ul className="list-disc pl-6">
              <li>Ficha profesional en el portal de <strong>MEDIAZION</strong> (nombre, especialidad, contacto, zona).</li>
              <li>Recepción de casos mediante <strong>derivación controlada</strong> (asignación equitativa y con trazabilidad).</li>
              <li>Acceso al <strong>Área Profesional</strong>: modelos de actas, plantillas, agenda y seguimiento.</li>
              <li><strong>Webinars mensuales</strong> incluidos y <strong>30 % de descuento</strong> en cursos de actualización.</li>
              <li>Soporte del equipo <strong>MEDIAZION</strong> y difusión de tu perfil en campañas y redes.</li>
            </ul>
          </div>

          <div className="mt-3">
            <button
              type="button"
              className="sr-btn-secondary"
              onClick={onSubscribe}
              disabled={subLoading || !form.email || !PRICE_ID}
              title={!PRICE_ID ? "Configura STRIPE_PRICE_ID en Vercel" : undefined}
            >
              {subLoading ? "Redirigiendo a Stripe…" : "Suscribirse ahora (49,90 € / mes)"}
            </button>
          </div>

          {!PRICE_ID && (
            <p className="sr-p" style={{ color: "#b91c1c", marginTop: 8 }}>
              ⚠️ Falta configurar <code>STRIPE_PRICE_ID</code> en Vercel.
            </p>
          )}
        </div>

        <p className="sr-p mt-6">
          <strong>Backend:</strong> {API_BASE}
        </p>
      </form>
    </main>
  );
}
