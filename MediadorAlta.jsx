// src/pages/MediadorAlta.jsx — Alta de Mediadores completa (DNI/CIF + tipo + gating Stripe)
import { useState } from "react";

function extractError(detail) {
  if (Array.isArray(detail)) return detail.map(d => d?.msg || JSON.stringify(d)).join("; ");
  if (typeof detail === "string") return detail;
  if (detail && typeof detail === "object") return detail.msg || JSON.stringify(detail);
  return "No se pudo registrar";
}

export default function MediadorAlta() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
    provincia: "",
    especialidad: "",
    dni_cif: "",
    tipo: "",
    accept: false,
  });
  const [status, setStatus] = useState({ sending: false, ok: null, msg: "" });
  const [busy, setBusy] = useState(false);
  const [altaOk, setAltaOk] = useState(false);

  const onChange = (e) => {
    const { name, type, checked, value } = e.target;
    setForm(s => ({ ...s, [name]: type === "checkbox" ? checked : value }));
  };

  async function onSubmit(e) {
    e.preventDefault();
    setStatus({ sending: true, ok: null, msg: "" });

    // Validación rápida en cliente
    const required = ["nombre","email","telefono","provincia","especialidad","dni_cif","tipo"];
    const missing = required.filter(f => !form[f].trim());
    if (missing.length) {
      setStatus({ sending: false, ok: false, msg: "Completa todos los campos obligatorios." });
      return;
    }
    if (!form.accept) {
      setStatus({ sending: false, ok: false, msg: "Debes aceptar la política de privacidad." });
      return;
    }

    try {
      const res = await fetch("/api/mediadores/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.nombre,
          email: form.email,
          phone: form.telefono,
          provincia: form.provincia,
          especialidad: form.especialidad,
          dni_cif: form.dni_cif,
          tipo: form.tipo,
          accept: !!form.accept,
        }),
      });
      const raw = await res.text();
      let data = {};
      try { data = raw ? JSON.parse(raw) : {}; } catch {}
      if (!res.ok) {
        const msg = extractError(data?.detail) || data?.message || raw || "No se pudo registrar";
        throw new Error(msg);
      }
      setStatus({ sending: false, ok: true, msg: data?.message || "Alta realizada. Revisa tu correo con la contraseña temporal." });
      setAltaOk(true);
    } catch (err) {
      setStatus({ sending: false, ok: false, msg: err.message || "Error de red" });
      setAltaOk(false);
    }
  }

  async function onSubscribe() {
    try {
      if (!form.email) throw new Error("Indica tu email antes de suscribirte");
      if (!altaOk)     throw new Error("Completa y confirma el alta antes de suscribirte");
      setBusy(true);
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email }),
      });
      const text = await res.text();
      if (!res.ok) {
        let msg = "No se pudo iniciar la suscripción";
        try {
          const j = JSON.parse(text);
          msg = extractError(j?.detail) || j?.message || msg;
        } catch {}
        throw new Error(msg);
      }
      const data = JSON.parse(text);
      if (!data?.url) throw new Error("No se pudo obtener la URL de Stripe");
      window.location.href = data.url;
    } catch (e) {
      alert(e.message);
      setBusy(false);
    }
  }

  return (
    <main className="sr-image bg-cover-center py-12" style={{ backgroundImage: "url('/marmol.jpg')" }}>
      <div className="sr-container">
        <h1 className="sr-h1 mb-2">Alta de Mediadores</h1>
        <p className="sr-p">Registra tus datos. Recibirás una contraseña temporal por email.</p>

        <form onSubmit={onSubmit} className="sr-card" style={{ maxWidth: 720 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 12 }}>
            <div>
              <label className="sr-p block mb-1">Nombre completo</label>
              <input name="nombre" value={form.nombre} onChange={onChange} className="w-full border rounded-md px-3 py-2" required />
            </div>
            <div>
              <label className="sr-p block mb-1">Email</label>
              <input type="email" name="email" value={form.email} onChange={onChange} className="w-full border rounded-md px-3 py-2" required />
            </div>
            <div>
              <label className="sr-p block mb-1">Teléfono</label>
              <input name="telefono" value={form.telefono} onChange={onChange} className="w-full border rounded-md px-3 py-2" required />
            </div>
            <div>
              <label className="sr-p block mb-1">Provincia</label>
              <input name="provincia" value={form.provincia} onChange={onChange} className="w-full border rounded-md px-3 py-2" required />
            </div>
            <div>
              <label className="sr-p block mb-1">Especialidad</label>
              <input name="especialidad" value={form.especialidad} onChange={onChange} className="w-full border rounded-md px-3 py-2" required />
            </div>
            <div>
              <label className="sr-p block mb-1">DNI o CIF</label>
              <input name="dni_cif" value={form.dni_cif} onChange={onChange} className="w-full border rounded-md px-3 py-2" required />
            </div>
            <div>
              <label className="sr-p block mb-1">Tipo</label>
              <select name="tipo" value={form.tipo} onChange={onChange} className="w-full border rounded-md px-3 py-2" required>
                <option value="">Seleccionar...</option>
                <option value="física">Persona física</option>
                <option value="empresa">Empresa</option>
              </select>
            </div>
            <label className="sr-p flex items-center gap-2 mt-1">
              <input type="checkbox" name="accept" checked={form.accept} onChange={onChange} required />
              Acepto la política de privacidad y el tratamiento de datos.
            </label>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 16 }}>
            <button type="submit" className="sr-btn-primary" disabled={status.sending}>
              {status.sending ? "Registrando..." : "Dar de alta"}
            </button>
            {status.ok === true  && <span style={{ color: "#166534" }}>{status.msg}</span>}
            {status.ok === false && <span style={{ color: "#991b1b" }}>Error: {status.msg}</span>}
          </div>

          <div className="mt-8">
            <h2 className="sr-h2">Activar prueba gratuita (49,50 € / mes al finalizar)</h2>
            <p className="sr-p">Tras el alta, puedes activar tu prueba. Se cobrará después del periodo gratuito.</p>
            <button
              type="button"
              className="sr-btn-secondary"
              onClick={onSubscribe}
              disabled={busy || !form.email || !altaOk}
              title={altaOk ? "" : "Completa el alta y confirma antes de suscribirte"}
            >
              {busy ? "Redirigiendo..." : "Activar prueba gratuita"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
