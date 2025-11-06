// src/pages/PanelMediador.jsx — requiere login real + estado PRO/BÁSICO por backend
import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import Seo from "../components/Seo.jsx";

const LS_TOKEN = "mediador_token";
const LS_EMAIL = "mediador_email";

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

export default function PanelMediador() {
  const q = useQuery();
  // si añades ?logout=1, limpia sesión
  useEffect(() => {
    if (q.get("logout") === "1") {
      localStorage.removeItem(LS_TOKEN);
      localStorage.removeItem(LS_EMAIL);
      window.location.replace("/panel-mediador");
    }
  }, [q]);

  const [view, setView] = useState("login");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  const [who, setWho] = useState(localStorage.getItem(LS_EMAIL) || "");
  const [subStatus, setSubStatus] = useState("none");
  const [trialLeft, setTrialLeft] = useState(null);

  // Si existe una sesión previa, pedimos estado; si falla, forzamos login
  useEffect(() => {
    const t = localStorage.getItem(LS_TOKEN);
    const e = localStorage.getItem(LS_EMAIL);
    if (t && e) {
      setView("dashboard");
      setWho(e);
    } else {
      setView("login");
    }
  }, []);

  // Cargar estado de suscripción desde backend cuando tengamos email
  useEffect(() => {
    async function loadStatus() {
      if (!who) return;
      try {
        const r = await fetch(`/api/mediadores/status?email=${encodeURIComponent(who)}`);
        const s = await r.json();
        if (s && s.exists) {
          setSubStatus(s.subscription_status || "none");
          setTrialLeft(s.trial_days_left ?? null);
        }
      } catch {}
    }
    loadStatus();
  }, [who]);

  async function onLogin(e) {
    e.preventDefault();
    setBusy(true); setMsg("");
    try {
      const r = await fetch("/api/stripe/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: who })
   });

      const data = await r.json().catch(() => ({}));
      if (!r.ok || !data?.ok) throw new Error(data?.detail || "Usuario o contraseña incorrectos");
      // sesión válida
      localStorage.setItem(LS_TOKEN, "ok");      // placeholder hasta JWT
      localStorage.setItem(LS_EMAIL, email);
      setWho(email);
      setView("dashboard");
    } catch (e) {
      setMsg(e.message || "No se pudo iniciar sesión");
    } finally {
      setBusy(false);
    }
  }

  function onLogout() {
    localStorage.removeItem(LS_TOKEN);
    localStorage.removeItem(LS_EMAIL);
    setWho("");
    setView("login");
  }

  async function onSubscribe() {
    try {
      if (!who) throw new Error("Primero entra en el panel");
      const r = await fetch("/api/stripe/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: who })
   });
      const data = await r.json().catch(() => ({}));
      if (!r.ok || !data?.url) throw new Error(data?.detail || "No se pudo iniciar la suscripción");
      window.location.href = data.url;
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <>
      <Seo title="Panel del Mediador · MEDIAZION" description="Área privada del mediador de MEDIAZION." canonical="https://mediazion.eu/panel-mediador" />
      <main className="sr-container py-8" style={{ minHeight: "calc(100vh - 160px)", overflowY: "auto", background: "rgba(255,255,255,0.85)", borderRadius: "16px", marginTop: "24px", marginBottom: "24px" }}>
        {/* LOGIN */}
        {view === "login" && (
          <section className="sr-card" style={{ maxWidth: 520, margin: "0 auto" }}>
            <h1 className="sr-h1 mb-2">Acceso al Panel</h1>
            <p className="sr-p mb-4">Introduce tu email y la contraseña temporal (la tienes en el correo de alta). Luego podrás cambiarla.</p>
            <form onSubmit={onLogin} style={{ display: "grid", gap: 12 }}>
              <input className="border rounded-md px-3 py-2" type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
              <input className="border rounded-md px-3 py-2" type="password" placeholder="Contraseña" value={pass} onChange={e=>setPass(e.target.value)} required />
              <button className="sr-btn-primary" type="submit" disabled={busy}>{busy ? "Entrando..." : "Entrar"}</button>
              {msg && <p className="sr-p" style={{ color:"#991b1b" }}>Error: {msg}</p>}
            </form>
          </section>
        )}

        {/* DASHBOARD */}
        {view === "dashboard" && (
          <section className="sr-card" style={{ maxWidth: 1024, margin: "0 auto" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", gap:12 }}>
              <h1 className="sr-h1">Panel del Mediador</h1>
              <button className="sr-btn-secondary" onClick={onLogout}>Salir</button>
            </div>

            {/* Bloques PRO/BÁSICO según estado */}
            {subStatus === "trialing" && (
              <div className="sr-card mt-4">
                <p className="sr-p">Estás en <b>PRO</b>. Te quedan {trialLeft ?? "—"} días de prueba.</p>
                <button className="sr-btn-primary" onClick={onSubscribe}>Activar suscripción definitiva</button>
              </div>
            )}
            {(subStatus === "none" || subStatus === "expired") && (
              <div className="sr-card mt-4">
                <p className="sr-p">Tu plan actual es <b>BÁSICO</b>. Puedes activar el plan PRO cuando quieras.</p>
                <button className="sr-btn-secondary" onClick={onSubscribe}>Activar plan PRO</button>
              </div>
            )}
            {subStatus === "active" && (
              <div className="sr-card mt-4"><p className="sr-p">Tu suscripción está <b>ACTIVA</b>. ¡Gracias!</p></div>
            )}

            {/* Contenido demo para comprobar scroll */}
            <div className="mt-4" style={{ display:"grid", gridTemplateColumns:"repeat(3,minmax(0,1fr))", gap:12 }}>
              {Array.from({length: 9}).map((_,i)=>(
                <div key={i} className="sr-card" style={{ background:"white" }}>
                  <h3 className="sr-h3" style={{marginBottom:8}}>Ficha #{i+1}</h3>
                  <p className="sr-p">Contenido de ejemplo.</p>
                </div>
              ))}
            </div>

            {/* Cambio de contraseña */}
            <div className="sr-card mt-8" style={{ background:"white" }}>
              <h3 className="sr-h3 mb-2">Cambiar contraseña</h3>
              <p className="sr-p mb-4">Actualiza tu contraseña temporal por una nueva segura.</p>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  const current = prompt("Contraseña actual:");
                  const nueva = prompt("Nueva contraseña:");
                  if (!who || !current || !nueva) return;
                  try {
                    const r = await fetch("/api/auth/change-password", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ email: who, old_password: current, new_password: nueva }),
                    });
                    const data = await r.json().catch(()=>({}));
                    if (!r.ok) throw new Error(data?.detail || data?.message || "No se pudo cambiar la contraseña");
                    alert("Contraseña actualizada");
                  } catch (err) {
                    alert(err.message || "Error al cambiar la contraseña");
                  }
                }}
              >
                <button type="submit" className="sr-btn-secondary">Cambiar contraseña</button>
              </form>
            </div>
          </section>
        )}
      </main>
    </>
  );
}
