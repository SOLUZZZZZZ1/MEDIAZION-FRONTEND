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
  const [step, setStep] = useState(1);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function handleRegister(e){
    e.preventDefault();
    if (!form.name || !form.email) { setMsg("Rellena nombre y email"); return; }
    if (!agree) { setMsg("Debes aceptar la política de privacidad"); return; }
    setLoading(true); setMsg("");
    try {
      const res = await fetch(`${API_BASE}/mediadores/register`, {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(form)
      });
      const data = await res.json().catch(()=> ({}));
      if (!res.ok) throw new Error(data?.detail || "No se pudo registrar");
      setStep(2);
      setMsg("✔️ Alta registrada. Revisa tu email. Ahora puedes activar tu prueba gratuita.");
    } catch (e){
      setMsg(e.message || "Error de red");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubscribe(){
    if (!form.email) { setMsg("Falta el email"); return; }
    if (!PRICE_ID) { setMsg("Falta VITE_STRIPE_PRICE_ID en tu .env"); return; }
    setLoading(true); setMsg("");
    try {
      const res = await fetch(`${API_BASE}/subscribe`, {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({ email: form.email, priceId: PRICE_ID })
      });
      const data = await res.json().catch(()=> ({}));
      if (!res.ok) throw new Error(data?.detail || "Error iniciando suscripción");
      window.location.href = data.url; // Stripe Checkout
    } catch (e){
      setMsg(e.message || "Error");
      setLoading(false);
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
        padding: "40px 20px",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div className="grid md:grid-cols-2 gap-16">
          {/* Columna izquierda: formulario / paso 1 o 2 */}
          <div style={{ background:"rgba(255,255,255,0.95)", borderRadius:16, padding:24, boxShadow:"0 8px 24px rgba(0,0,0,0.1)" }}>
            <h1 className="sr-h1 mb-2">Alta de mediadores</h1>
            <p className="sr-p">
              Completa tu alta para aparecer en el directorio de MEDIAZION. Después podrás activar tu
              <strong> prueba de 7 días gratis</strong> del Plan PRO (49,90 €/mes, cancela cuando quieras).
            </p>

            {step === 1 && (
              <form onSubmit={handleRegister}>
                <div className="grid md:grid-cols-2 gap-3">
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
                    <input className="w-full border rounded-md px-3 py-2" name="phone" value={form.telefono} onChange={onChange} />
                  </div>
                  <div>
                    <label className="sr-p">Provincia</label>
                    <input className="w-full border rounded-md px-3 py-2" name="provincia" value={form.provincia} onChange={onChange} />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-3 mt-3">
                  <div>
                    <label className="sr-p">Especialidad</label>
                    <input className="w-full border rounded-md px-3 py-2" name="especialidad" value={form.especialidad} onChange={onChange} placeholder="civil, mercantil, familiar…" />
                  </div>
                  <div>
                    <label className="sr-p">Web (opcional)</label>
                    <input className="w-full border rounded-md px-3 py-2" name="web" value={form.web} onChange={onChange} />
                  </div>
                </div>

                <div className="mt-3">
                  <label className="sr-p">Breve bio</label>
                  <textarea className="w-full border rounded-md px-3 py-2" name="bio" rows={3} value={form.bio} onChange={onChange} />
                </div>
                <div className="mt-3">
                  <label className="sr-p">LinkedIn (opcional)</label>
                  <input className="w-full border rounded-md px-3 py-2" name="linkedin" value={form.linkedin} onChange={onChange} />
                </div>

                <label className="sr-p flex items-center gap-2 mt-4">
                  <input type="checkbox" checked={agree} onChange={(e)=>setAgree(e.target.checked)} />
                  Acepto la <a href="/rgpd" className="text-blue-700 underline">Política de Privacidad</a>.
                </label>

                <div className="flex items-center gap-12 mt-4">
                  <button className="sr-btn-primary" type="submit" disabled={loading || !form.name || !form.email || !agree}>
                    {loading ? "Enviando…" : "Registrar alta"}
                  </button>
                  {msg && <span className="sr-p">{msg}</span>}
                </div>
              </form>
            )}

            {step === 2 && (
              <div>
                <h3 className="sr-h2">✔️ Alta registrada</h3>
                <p className="sr-p">Hemos recibido tu solicitud. Te enviaremos un email de confirmación.</p>
                <p className="sr-p">Ahora puedes activar tu <strong>prueba de 7 días gratis</strong> del Plan PRO:</p>
                <button className="sr-btn-secondary" onClick={handleSubscribe} disabled={loading || !form.email}>
                  {loading ? "Abriendo Stripe…" : "Activar 7 días gratis (49,90 €/mes)"}
                </button>
                {msg && <p className="sr-p mt-3">{msg}</p>}
              </div>
            )}
          </div>

          {/* Columna derecha: info del plan PRO */}
          <aside
            style={{
              background: "rgba(237,248,255,0.95)",
              border: "1px solid #b6e0ff",
              borderRadius: 16,
              padding: 24,
              height: "fit-content",
              alignSelf: "start",
            }}
          >
            <h3 style={{ marginTop: 0, fontWeight: 800, fontSize: 20 }}>Plan Profesional · 7 días gratis</h3>
            <p className="sr-p">
              Diseñado para profesionales de la mediación que quieren digitalizar su práctica y recibir casos de forma ágil.
            </p>
            <ul className="sr-p" style={{ listStyle: "disc", marginLeft: 18 }}>
              <li>Panel de expedientes con estados y trazabilidad.</li>
              <li>Asistente de IA para actas, resúmenes y comunicaciones.</li>
              <li>Subida de documentos (PDF/DOCX/TXT) para análisis.</li>
              <li>Directorio público (visibilidad y captación).</li>
              <li>Notificaciones de casos asignados (email).</li>
            </ul>
            <p className="sr-p">
              <strong>Precio:</strong> 49,90 €/mes (IVA incl.). Cancela cuando quieras.  
              El periodo de prueba se activa en el checkout y no se te cobra nada hasta que termine.
            </p>
          </aside>
        </div>
      </div>
    </main>
  );
}
