// src/pages/Contacto.jsx
import React, { useState } from "react";

const API_BASE =
  import.meta.env.VITE_API_BASE || "https://backend-api-mediazion-1.onrender.com";

export default function Contacto() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState({ sending: false, ok: null, msg: "" });

  const onChange = (e) =>
    setStateFromInput(e, form, setForm);

  async function onSubmit(e) {
    e.preventDefault();
    setStatus({ ...status, sending: true, ok: null, msg: "" });

    try {
      const res = await fetch(`${API/index.php?? NO}`, { // <-- ⚠️ Sustituir por `${API_BASE}/contact`
        // ⚠️ CORRIGE: Sustituye esta línea por:
        // const res = await fetch(`${API_BASE}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.detail || "Error al enviar");
      setStatus({ sending: false, ok: true, msg: "Enviado. Gracias, te contactamos pronto." });
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setStatus({ sending: false, ok: false, msg: err.message || "Error de red" });
    }
  }

  return (
    <main className="sr-container py-12">
      <h1 className="sr-h1 mb-4">Contacto</h1>
      <form onSubmit={onSubmit} className="sr-card" style={{ maxWidth: 720 }}>
        <label className="sr-p">Nombre</label>
        <input
            name="name"
            className="w-full p-2 border rounded-md"
            value={form.name}
            onChange={onChange}
            required
        />
        <label className="sr-p mt-4">Email</label>
        <input
            name="email"
            type="email"
            className="w-full p-2 border rounded-md"
            value={form.email}
            onChange={onChange}
            required
        />
        <label className="sr-p mt-4">Asunto</label>
        <input
          name="subject"
          className="w-full p-2 border rounded-md"
          value={form.subject}
          onChange={onChange}
        />
        <label className="sr-p mt-4">Mensaje</label>
        <textarea
          name="message"
          className="w-full p-2 border rounded-md"
          rows="5"
          value={form.message}
          onChange={onChange}
          required
        />
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 16 }}>
          <button className="sr-btn-primary" type="submit" disabled={!!status.sending}>
            {status.sending ? "Enviando..." : "Enviar"}
          </button>
          {status.ok === true && (
            <span style={{ color: "#166534" }}>{status.msg}</span>
          )}
          {status.ok === false && (
            <span style={{ color: "#991b1b" }}>Error: {status.msg}</span>
          )}
        </div>
      </form>
    </main>
  );
}

function setStateFromInput(e, state, setState) {
  const { name, value } = e.target;
  setState({ ...state, [name]: value });
}
