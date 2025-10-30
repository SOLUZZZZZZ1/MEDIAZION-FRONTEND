// src/pages/MediadorAlta.jsx
import React, { useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE || "https://backend-api-mediazion-1.onrender.com";
const PRICE_ID  = import.meta.env.VITE_STRIPE_PRICE_ID || "";

export default function MediadorAlta(){
  const [form, setForm] = useState({
    name: "", email: "", telefono: "", bio: "",
    provincia: "", especialidad: "", web: "", linkedin: ""
  });
  const [agree, setAgree] = useState(false);
  const [status, setStatus] = useState({ step: 1, loading: false, msg: "" });

  const onChange = (e) => setValue(e.target.name, e.target.value);
  const setValue = (k,v) => setReturn({ ...form, [k]: v });

  async function handleRegister(e){
    e.preventDefault();
    if (!form.name || !form.email) return setStatus({ step: 1, loading: false, msg: "Rellena nombre y email" });
    setStatus({ step: 1, loading: true, msg: "" });
    try {
      const res = await fetch(`${API_BASE}/mediadores/register`, {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.detail || "No se pudo registrar.");
      setStatus({ step: 2, loading: false, msg: "✔️ Alta correcta. Te enviamos un email con la confirmación. Ahora puedes activar tu suscripción (7 días gratis)." });
    } catch (e) {
      setStatus({ step: 1, loading: false, msg: e.message || "Error de red" });
    }
  }

  async function handleSubscribe(){
    if (!form.email) { alert("Falta el email"); return; }
    if (!PRICE_KEY) { alert("Falta VITE_STRIPE_PRICE_ID en .env"); return; }
    try {
      setStatus(s=>({...s, loading:true}));
      const res = await fetch(`${API_BASE}/subscribe`, {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({ email: form.email, priceId: PRICE_ID })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.detail || "Error iniciando suscripción");
      window.location.href = data.url; // redirige a Stripe Checkout
    } catch (e){
      setStatus(s=>({...s, loading:false, msg: e.message || "Error"}));
    }
  }

  return (
    <main
      className="min-h-[calc(100vh-80px)]"
      style={{
        backgroundImage: "url('/marmol.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        padding: "40px 20px"
      }}
    >
      <div style={{ maxWidth: 900, margin: "0 auto", background:"rgba(255,255,255,0.95)", borderRadius:16, padding:24 }}>
        <h1 className="sr-h1">Alta de mediadores</h1>
        <p className="sr-p">
          Completa tus datos. Tras validarlos, podrás activar tu suscripción con <strong>7 días de prueba</strong> (49,90 €/mes).
        </p>

        {status.step === 1 && (
          <form onSubmit={handleRegister} className="sr-card" style={{ background:"rgba(255,255,255,0.98)" }}>
            <div style={{display:"grid", gridTemplateColumns:"repeat(2,minmax(0,1fr))", gap:12}}>
              <div>
                <label className="sr-p">Nombre y apellidos</label>
                <input className="w-full border rounded-md px-3 py-2" name="name" value={form.name} onChange={onChange} />
              </div>
              <div>
                <label className="sr-p">Email</label>
                <input className="w-full border rounded-md px-3 py-2" name="email" type="email" value={form.email} onChange={onChange} />
              </div>
              <div>
                <label className="sr-p">Teléfono</label>
                <input className="w-full border rounded-md px-3 py-2" name="telefono" value={form.telefono} onChange={onChange} />
              </div>
              <div>
                <label className="sr-p">Provincia</label>
                <input className="w-full border rounded-md px-3 py-2" name="provincia" value={form.provincia} onChange={onChange} />
              </div>
            </div>

            <div style={{display:"grid", gridTemplateColumns:"repeat(2,minmax(0,1fr))", gap:12, marginTop:12}}>
              <div>
                <label className="sr-p">Especialidad</label>
                <input className="w-full border rounded-md px-3 py-2" name="especialidad" value={form.especialidad} onChange={onChange} placeholder="civil, mercantil, familiar…" />
              </div>
              <div>
                <label className="sr-p">Web (opcional)</label>
                <input className="w-full border rounded-md px-3 py-2" name="web" value={form.web} onChange={onChange} />
              </div>
            </div>

            <div style={{marginTop:12}}>
              <label className="sr-p">Breve bio</label>
              <textarea className="w-full border rounded-md px-3 py-2" name="bio" rows={3} value={form.bio} onChange={onChange} />
            </div>

            <div style={{marginTop:12}}>
              <label className="sr-p">Perfil de LinkedIn (opcional)</label>
              <input className="w-full border rounded-md px-3 py-2" name="linkedin" value={form.linkedin} onChange={onChange} />
            </div>

            <label className="sr-p flex items-center gap-2 mt-4">
              <input type="checkbox" checked={agree} onChange={(e)=>setAgree(e.target.checked)} />
              Acepto la <a href="/rgpd" className="text-blue-700 underline">Política de Privacidad</a> y el tratamiento de mis datos.
            </label>

            <div className="flex gap-12 items-center mt-4">
              <button className="sr-btn-primary" type="submit" disabled={status.loading || !form.name || !form.email || !agree }>
                {status.loading ? "Enviando…" : "Enviar solicitud de alta"}
              </button>
              {status.msg && <span className="sr-p">{status.msg}</span>}
            </div>
          </form>
        )}

        {status.step === 2 && (
          <div className="sr-card" style={{ background:"rgba(255,255,255,0.98)" }}>
            <h2 className="sr-h2">¡Solicitud recibida!</h2>
            <p className="sr-p">
              Hemos enviado una confirmación a <strong>{form.email}</strong>.  
              Puedes <strong>activar ahora tu suscripción con 7 días gratis</strong> para empezar a recibir casos en cuanto validemos tu perfil.
            </p>
            <button className="sr-btn-secondary" onClick={handleSubscribe} disabled={status.loading || !form.email}>
              {status.loading ? "Abriendo Stripe…" : "Activar 7 días gratis (49,90 €/mes)"} 
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
