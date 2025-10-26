import { useState } from "react";
import { getApiBase } from "../lib/api";

export default function Contacto(){
  const [form, setForm] = useState({ nombre: "", email: "", asunto: "", mensaje: "" });
  const [status, setStatus] = useState({ sending: false, ok: null, error: "" });

  const onChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus({ sending: true, ok: null, error: "" });

    const API = getApiBase();
    try {
      const res = await fetch(`${API.replace(/\/$/,'')}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.nombre,
          email: form.email,
          subject: form.asunto,
          message: form.mensaje,
        }),
      });
      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "Error al enviar el mensaje");
      }
      await res.json();
      setStatus({ sending: false, ok: true, error: "" });
      setForm({ nombre: "", email: "", asunto: "", mensaje: "" });
    } catch (err) {
      setStatus({ sending: false, ok: false, error: err.message || "Error de red" });
    }
  };

  return (
    <main className="sr-container py-12">
      <h1 className="sr-h1 mb-4">Contacto</h1>
      <p className="sr-p">Cuéntanos tu caso. Te responderemos con la máxima confidencialidad.</p>

      <form onSubmit={onSubmit} className="sr-card mt-6" style={{maxWidth: 720}}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="sr-p block mb-1">Nombre</label>
            <input required name="nombre" value={form.nombre} onChange={onChange} className="w-full border rounded-md px-3 py-2" placeholder="Tu nombre" />
          </div>
          <div>
            <label className="sr-p block mb-1">Email</label>
            <input required type="email" name="email" value={form.email} onChange={onChange} className="w-full border rounded-md px-3 py-2" placeholder="tu@email.com" />
          </div>
          <div className="md:col-span-2">
            <label className="sr-p block mb-1">Asunto</label>
            <input required name="asunto" value={form.asunto} onChange={onChange} className="w-full border rounded-md px-3 py-2" placeholder="Motivo del contacto" />
          </div>
          <div className="md:col-span-2">
            <label className="sr-p block mb-1">Mensaje</label>
            <textarea required name="mensaje" value={form.mensaje} onChange={onChange} rows="5" className="w-full border rounded-md px-3 py-2" placeholder="Cuéntanos brevemente tu situación" />
          </div>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <button className="sr-btn-primary" type="submit" disabled={status.sending}>
            {status.sending ? "Enviando..." : "Enviar"}
          </button>
          {status.ok === true && <span className="text-green-700">Enviado. Gracias, te contactamos pronto.</span>}
          {status.ok === false && <span className="text-red-700">Error: {status.error}</span>}
        </div>

        <p className="sr-p mt-4"><strong>Backend:</strong> {getApiBase()}</p>
      </form>
    </main>
  );
}
