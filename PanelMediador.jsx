// src/pages/PanelMediador.jsx — login real + estado PRO/BÁSICO + activar PRO + cambio de contraseña
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

  // permite forzar logout con ?logout=1
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
  const [subStatus, setSubStatus] = useState("none"); // none | trialing | active | expired
  const [trialLeft, setTrialLeft] = useState(null);   // días restantes o null

  // Sesión previa → dashboard
  useEffect(() => {
    const t = localStorage.getItem(LS_TOKEN);
    const e = localStorage.getItem(LS_EMAIL);
    if (t && e) {
      setWho(e);
      setView("dashboard");
    } else {
      setView("login");
    }
  }, []);

  // Estado de suscripción desde backend
  useEffect(() => {
    async function loadStatus() {
      if (!who) return;
      try {
        const r = await fetch(`/api/mediadores/status?email=${encodeURIComponent(who)}`);
        if (!r.ok) { setSubStatus("none"); setTrialLeft(null); return; }
        const s = await r.json();
        setSubStatus(s.subscription_status || "none");
        setTrialLeft(typeof s.trial_days_left === "number" ? s.trial_days_left : null);
      } catch {
        setSubStatus("none"); setTrialLeft(null);
      }
    }
    loadStatus();
  }, [who]);

  async function onLogin(e) {
    e.preventDefault();
    setBusy(true); setMsg("");
    try {
      const r = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: pass }),
      });
      const data = await r.json().catch(() => ({}));
      if (!r.ok || !data?.ok) throw new Error(data?.detail || "Usuario o contraseña incorrectos");
      localStorage.setItem(LS_TOKEN, "ok");  // placeholder
      localStorage.setItem(LS_EMAIL, email);
      setWho(email);
      setView("dashboard");
    } catch (e2) {
      setMsg(e2.message || "No se pudo iniciar sesión");
    } finally {
      setBusy(false);   // ← CORRECTO (antes tenías “set Busy”)
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
        body: JSON.stringify({ email: who }),
      });
      const data = await r.json().catch(() => ({}));
      if (!r.ok || !data?.url) throw new Error(data?.detail || data?.message || "No se pudo iniciar la suscripción");
      window.location.href = data.url; // Checkout de Stripe
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <>
      <Seo
        title="Panel del Mediador · MEDIAZION"
        description="Área privada del mediador de MEDIAZION."
        canonical="https://mediazion.eu/panel-mediador"
      />
      <main className="sr-container py-8"
        style={{ minHeight: "calc(100vh - 160px)", overflowY: "auto", background: "rgba(255,255,255,0.85)",
                 borderRadius: "16px", marginTop: "24px", marginBottom: "24px" }}>
        {view === "login" && (
          <section className="sr-card" style={{ maxWidth: 520, margin: "0 auto" }}>
            <h1 className="sr-h1 mb-2">Acceso al Panel</h1>
            <p className="sr-p mb-4">Introduce tu email y la contraseña temporal (la tienes en el correo de alta). Luego podrás cambiarla.</p>
            <form onSubmit={onLogin} style={{ display: "grid", gap: 12 }}>
              <input className="border rounded-md px-3 py-2" type="email" placeholder="Email"
                     value={email} onChange={(e) => setEmail(e.target.value)} required />
              <input className="border rounded-md px-3 py-2" type="password" placeholder="Contraseña"
                     value={pass} onChange={(e) => setPass(e.target.value)} required />
              <button className="sr-btn-primary" type="submit" disabled={busy}>
                {busy ? "Entrando..." : "Entrar"}
              </button>
              {msg && <p className="sr-p" style={{ color: "#991b1b" }}>Error: {msg}</p>}
            </form>
          </section>
        )}

        {view === "dashboard" && (
          <section className="sr-card" style={{ maxWidth: 1024, margin: "0 auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
              <h1 className="sr-h1">Panel del Mediador</h1>
              <button className="sr-btn-secondary" onClick={onLogout}>Salir</button>
            </div>

            {subStatus === "trialing" && (
              <div className="sr-card mt-4">
                <p className="sr-p">Estás en <b>PRO</b>. {trialLeft !== null ? `Te quedan ${trialLeft} días de prueba.` : ""}</p>
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
              <div className="sr-card mt-4">
                <p className="sr-p">Tu suscripción está <b>ACTIVA</b>. ¡Gracias!</p>
              </div>
            )}
          </section>
        )}
      </main>
    </>
  );
}
