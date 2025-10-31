// src/pages/MediadorAlta.jsx
import { useState } from "react";
import Seo from "../components/Seo.jsx";

const API_BASE =
  import.meta.env.VITE_API_BASE || "https://backend-api-mediazion-1.onrender.com";
const PRICE_ID = import.meta.env.VITE_STRIPE_PLACEHOLDER || import.meta.env.VITE_STRIPE_PRICE_ID;

export default function MediadorAlta(){
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
    bio: "",
    provincia: "",
    especialidad: "",
    online: "",
    linkedin: "",
  });
  const [status, setStatus] = useState({ sending: false, ok: null, msg: "" });
  const [subLoading, setSubLoading] = useState(false);

  const onChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus({ sending: true, ok: null, msg: "" });
    try {
      const r = await fetch(API_CF().replace(/\\/$/, "") + "/mediadores/register", {
        method: "POST",
        headers: { "Content-Type":"application/json" },
        body: JSON.stringify({
          name: form.nombre,
          email: form.email,
          telefono: form.telefono,
          bio: form.bio,
          provincia: form.provincia,
          especialidad: form.especialidad,
          online: form.online,
          linkedin: form.linkedin
        })
      });
      const data = await r.json().catch(()=>({}));
      if(!r.ok) throw new Error(data.detail || "No se pudo registrar");
      setStatus({ sending:false, ok:true, msg: data.message || "Alta realizada. Revisa tu correo." });
      // Mantengo email para poder usar en Subscribe
      setForm(prev => ({ ...prev, nombre:"", telefono:"", bio:"", provincia:"", especialidad:"", online:"", linkedin:"" }));
    } catch (e2) {
      setStatus({ sending:false, ok:false, msg: e2.message || "Error" });
    }
  };

  async function onSubscribe(){
    if(!form.email) {
      setStatus({ sending:false, ok:false, msg:"Introduce tu email para crear la suscripción" });
      return;
    }
    setSubLoading(true);
    try {
      const res = await fetch(API_BASE.replace(/\\/$/, "") + "/subscribe", {
        method: "POST",
        headers: { "Content-Type":"application/json" },
        body: JSON.stringify({
          email: form.email,
          priceId: PRICE_ID
        })
      });
      const data = await res.json().catch(()=> ({}));
      if(!res.ok || !data?.url){
        throw new Error(data?.detail || "No se pudo iniciar la suscripción");
      }
      window.location.href = data.url;
    } catch (err){
      setSubLoading(false);
      setStatus({ sending:false, ok:false, msg: err.message });
    }
  }

  function API_CF(){ return API_BASE; }

  return (
    <main className="sr-container py-12" style={{backgroundImage:"url('/marmol.jpg')", backgroundSize:"cover"}}>
      <Seo
        title="Alta de Mediadores · MEDIAZION"
        description="Regístrate como mediador/a en MEDIAZION. Verificación profesional, acceso a área privada y prueba gratuita de 7 días para la suscripción."
        canonical="https://mediazion.eu/mediadores/alta"
      />
      <h1 className="sr-h1 mb-2">Alta de Mediadores</h1>
      <p className="sr-p">Registra tus datos. Te enviaremos un correo de confirmación y, una vez aprobado, podrás activar la suscripción (49,90 €/mes con 7 días de prueba) y acceder al área profesional.</p>

      <form onSubmit={onSubmit} className="sr-card" style={{maxWidth: 900}}>
        <div className="grid" style={{gridTemplateColumns:"repeat(2, minmax(0,1fr))", gap:16}}>
          <div>
            <label className="sr-p">Nombre completo</label>
            <input name="nombre" value={form.nombre} onChange={onChange} required className="w-full border rounded-md px-3 py-2" />
          </div>
          <div>
            <label className="sr-p">Email</label>
            <input type="email" name="email" value={form.email} onChange={onChange} required className="w-full border rounded-md px-3 py-2" />
          </div>
          <div>
            <label className="sr-p">Teléfono</label>
            <input name="telefono" value={form.telefono} onChange={onChange} className="w-full border rounded-md px-3 py-2" />
          </div>
          <div>
            <label className="sr-p">Provincia</label>
            <input name="provincia" value={form.provincia} onChange={onChange} className="w-full border rounded-md px-3 py-2" />
          </div>
          <div className="col-span-2">
            <label className="sr-p">Especialidad (p. ej. civil, mercantil, familiar…)</label>
            <input name="especialidad" value={form.especialidad} onChange={onChange} className="w-full border rounded-md px-3 py-2" />
          </div>
          <div className="col-span-2">
            <label className="sr-p">Perfil / Bio</label>
            <textarea name="bio" value={form.bio} onChange={onChange} className="w-full border rounded-md px-3 py-2" rows={4} />
          </div>
          <div>
            <label className="sr-p">Web / Portfolio (opcional)</label>
            <input name="online" value={form.online} onChange={onChange} className="w-full border rounded-md px-3 py-2" />
          </div>
          <div>
            <label className="sr-p">LinkedIn (opcional)</label>
            <input name="linkedin" value={form.linkedin} onChange={onChange} className="w-full border rounded-md px-3 py-2" />
          </div>
        </div>

        <div className="mt-4" style={{display:"flex", gap:12, alignItems:"center", flexWrap:"wrap"}}>
          <button className="sr-btn-primary" type="submit" disabled={!!status.sending}>
            {status.sending ? "Enviando..." : "Enviar solicitud"}
          </button>

          <button className="sr-btn-secondary" type="button" onClick={onSubscribe} disabled={subDirty() || subLoading || !PRICE_ID}>
            {subLoading ? "Redirigiendo a Stripe…" : "Activar suscripción (49,90 €/mes – 7 días gratis)"}
          </button>

          {status.ok === true && <span className="text-green-700">{status.msg}</span>}
          {status.ok === false && <span className="text-red-700">Error: {status.msg}</span>}
        </div>
      </form>
    </main>
  );

  function subDirty(){
    return !form.email;
  }
}
