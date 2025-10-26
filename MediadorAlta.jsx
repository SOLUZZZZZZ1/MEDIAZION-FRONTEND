import { useState } from "react";
const API_BASE = import.meta.env.VITE_API_BASE || "https://backend-api-mediazion-1.onrender.com";
const PRICE_ID  = import.meta.env.VITE_STRIPE_PRICE_ID;

export default function MediadorAlta(){
  const [form, setForm] = useState({ nombre: "", email: "" });
  const [status, setStatus] = useState({ sending: false, ok: null, msg: "" });
  const [subLoading, setSubLoading] = useState(false);

  const onChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus({ sending: true, ok: null, msg: "" });
    try {
      const r = await fetch(API_BASE.replace(/\/$/,'') + "/mediadores/register", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.nombre, email: form.email })
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.detail || "Error en el registro");
      setStatus({ sending: false, ok: true, msg: data.warning ? data.warning : "Alta realizada. Revisa tu correo." });
    } catch (err) {
      setStatus({ sending: false, ok: false, msg: err.message || "Error de red" });
    }
  };

  const onSubscribe = async () => {
    try {
      setSubLoading(true);
      const res = await fetch(API_BASE.replace(/\/$/,'') + "/subscribe", {
        method: "POST", headers: { "Content-Type":"application/json" },
        body: JSON.stringify({ email: form.email, priceId: PRICE_ID })
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      if (!data.url) throw new Error("No se recibió URL de suscripción");
      window.location.href = data.url;
    } catch (e) {
      alert(e.message || "Error iniciando suscripción");
      setSubLoading(false);
    }
  };

  return (
    <main className="sr-container py-12">
      <h1 className="sr-h1 mb-2">Alta de Mediadores</h1>
      <p className="sr-p">Registra mediadores con su email. Recibirán su contraseña temporal por correo.</p>

      <form onSubmit={onSubmit} className="sr-card mt-6" style={{maxWidth: 720}}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4" style={{display:"grid", gap:"12px", gridTemplateColumns:"repeat(1,minmax(0,1fr))"}}>
          <div>
            <label className="sr-p block mb-1">Nombre</label>
            <input required name="nombre" value={form.nombre} onChange={onChange} className="w-full border rounded-md px-3 py-2" placeholder="Nombre completo" />
          </div>
          <div>
            <label className="sr-p block mb-1">Email</label>
            <input required type="email" name="email" value={form.email} onChange={onChange} className="w-full border rounded-md px-3 py-2" placeholder="mediador@correo.com" />
          </div>
        </div>

        <div className="mt-4" style={{display:"flex", alignItems:"center", gap:"12px"}}>
          <button className="sr-btn-primary" type="submit" disabled={status.sending}>
            {status.sending ? "Registrando..." : "Dar de alta"}
          </button>
          {status.ok === true && <span style={{color:"#166534"}}>{status.msg}</span>}
          {status.ok === false && <span style={{color:"#991b1b"}}>Error: {status.msg}</span>}
        </div>

        <div className="mt-8">
          <h2 className="sr-h2">Activar suscripción (49,90 € / mes)</h2>
          <p className="sr-p">La tarjeta quedará guardada y se renovará automáticamente cada mes. Podrás gestionarla o cancelarla en cualquier momento.</p>
          <button className="sr-btn-secondary mt-2" onClick={onSubscribe} disabled={subLoading || !form.email || !PRICE_ID}>
            {subLoading ? "Redirigiendo a Stripe..." : "Suscribirse ahora"}
          </button>
        </div>

        <p className="sr-p mt-4"><strong>Backend:</strong> {API_BASE}</p>
      </form>
    </main>
  );
}
