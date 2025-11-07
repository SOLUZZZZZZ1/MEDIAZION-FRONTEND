// src/pages/PanelMediador.jsx — Panel PRO completo (trial 7 días, PRO, BÁSICO) + IA/Plantillas/Pagos
import React, { useEffect, useMemo, useState } from "react";
import { useLocation, Link } from "react-router-dom";
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
  const [subStatus, setSubStatus] = useState("none"); // none | trialing | active | expired | canceled
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
        // si en el futuro devuelves trial_days_left, lo mostraremos:
        setTrialLeft(typeof s.trial_days_left === "number" ? s.trial_days_left : null);
      } catch {
        setSubStatus("none"); setTrialLeft(null);
      }
    }
    loadStatus();
  }, [who]);

  // Login
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
      // token placeholder (si luego pones JWT, guarda aquí el real)
      localStorage.setItem(LS_TOKEN, "ok");
      localStorage.setItem(LS_EMAIL, email);
      setWho(email);
      setView("dashboard");
    } catch (e2) {
      setMsg(e2.message || "No se pudo iniciar sesión");
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

  // Checkout suscripción
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

  // (Opcional) cambio de contraseña simple si ya tienes endpoint /api/auth/change_password
  // async function onChangePassword() { ... }

  // Bloque informativo según estado
  function BlockStatus() {
    if (subStatus === "active") {
      return (
        <div className="sr-card mt-4" style={{ borderLeft: "6px solid #16a34a" }}>
          <p className="sr-p">Tu suscripción está <b>ACTIVA</b>. Gracias por apoyar MEDIAZION PRO.</p>
        </div>
      );
    }
    if (subStatus === "trialing") {
      return (
        <div className="sr-card mt-4" style={{ borderLeft: "6px solid #0ea5e9" }}>
          <p className="sr-p">
            Estás en <b>PRO (prueba gratuita de 7 días)</b>.
            {trialLeft !== null ? ` Te quedan ${trialLeft} día(s).` : ""} Disfruta de IA profesional, plantillas y cobros.
          </p>
          <button className="sr-btn-primary mt-2" onClick={onSubscribe}>Activar suscripción definitiva</button>
        </div>
      );
    }
    if (subStatus === "expired" || subStatus === "canceled") {
      return (
        <div className="sr-card mt-4" style={{ borderLeft: "6px solid #f59e0b" }}>
          <p className="sr-p">
            Tu prueba ha <b>finalizado</b>. Has pasado al <b>panel BÁSICO</b>.
            Activa PRO para acceder a IA, plantillas y más herramientas.
          </p>
          <button className="sr-btn-secondary mt-2" onClick={onSubscribe}>Activar plan PRO</button>
        </div>
      );
    }
    // none (alta sin PRO)
    return (
      <div className="sr-card mt-4" style={{ borderLeft: "6px solid #475569" }}>
        <p className="sr-p">
          Tu plan actual es <b>BÁSICO</b>. Puedes activar la <b>prueba gratuita de 7 días</b> y pasar a PRO cuando quieras.
        </p>
        <button className="sr-btn-secondary mt-2" onClick={onSubscribe}>Probar PRO 7 días</button>
      </div>
    );
  }

  // Bloques de herramientas — visibles con PRO (active o trialing)
  function ProTools() {
    if (!(subStatus === "active" || subStatus === "trialing")) return null;
    return (
      <>
        <div className="sr-card mt-4">
          <h2 className="sr-h2">Asistente IA Profesional</h2>
          <p className="sr-p">Redacta actas, resúmenes y comunicaciones con enfoque de mediación.</p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <Link className="sr-btn-primary" to="/panel-mediador/ai">Abrir IA</Link>
            <Link className="sr-btn-secondary" to="/panel-mediador/plantillas">Recetas IA</Link>
          </div>
        </div>

        <div className="sr-card mt-4">
          <h2 className="sr-h2">Plantillas y Documentos</h2>
          <p className="sr-p">Actas, acuerdos y correos. Exporta a PDF/Word. (MVP: desde Recetas IA)</p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <Link className="sr-btn-secondary" to="/panel-mediador/plantillas">Ver plantillas</Link>
          </div>
        </div>

        <div className="sr-card mt-4">
          <h2 className="sr-h2">Cobros</h2>
          <p className="sr-p">Genera cobros con tarjeta (Stripe) en segundos.</p>
          <Link className="sr-btn-secondary" to="/panel-mediador/pagos">Pagos Rápidos</Link>
        </div>

        <div className="sr-card mt-4">
          <h2 className="sr-h2">Agenda</h2>
          <p className="sr-p">Crea citas con recordatorio y enlace de videollamada (próximamente).</p>
          <button className="sr-btn-secondary" disabled>Próximamente</button>
        </div>

        <div className="sr-card mt-4">
          <h2 className="sr-h2">Directorio PRO</h2>
          <p className="sr-p">Perfil destacado público, tarjeta digital y QR.</p>
          <button className="sr-btn-secondary" disabled>Próximamente</button>
        </div>
      </>
    );
  }

  // Bloques básicos — visibles con none/expired/canceled
  function BasicTools() {
    if (subStatus === "active" || subStatus === "trialing") return null;
    return (
      <>
        <div className="sr-card mt-4">
          <h2 className="sr-h2">Tu panel BÁSICO</h2>
          <p className="sr-p">Consulta tus datos y activa PRO cuando quieras. Con PRO tendrás IA, plantillas y cobros.</p>
          <button className="sr-btn-primary" onClick={onSubscribe}>Probar PRO 7 días</button>
        </div>
        <div className="sr-card mt-4">
          <h2 className="sr-h2">Ventajas PRO</h2>
          <ul className="sr-ul">
            <li>Asistente IA profesional (con o sin documentos)</li>
            <li>Plantillas (actas, acuerdos, comunicaciones) + exportación</li>
            <li>Cobros con tarjeta y recibos automáticos</li>
            <li>Perfil PRO destacado en el directorio</li>
          </ul>
        </div>
      </>
    );
  }

  return (
    <>
      <Seo
        title="Panel del Mediador · MEDIAZION"
        description="Área privada del mediador de MEDIAZION. Prueba PRO 7 días gratis."
        canonical="https://mediazion.eu/panel-mediador"
      />
      <main className="sr-container py-8"
        style={{
          minHeight: "calc(100vh - 160px)",
          overflowY: "auto",
          background: "rgba(255,255,255,0.85)",
          borderRadius: "16px",
          marginTop: "24px",
          marginBottom: "24px"
        }}>
        {/* LOGIN */}
        {view === "login" && (
          <section className="sr-card" style={{ maxWidth: 520, margin: "0 auto" }}>
            <h1 className="sr-h1 mb-2">Acceso al Panel</h1>
            <p className="sr-p mb-4">
              Introduce tu email y la <b>contraseña temporal</b> (la recibiste en el correo de alta). Después podrás cambiarla.
            </p>
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

        {/* DASHBOARD */}
        {view === "dashboard" && (
          <section className="sr-card" style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
              <h1 className="sr-h1">Panel del Mediador</h1>
              <div style={{ display: "flex", gap: 8 }}>
                <button className="sr-btn-secondary" onClick={onLogout}>Salir</button>
              </div>
            </div>

            {/* Estado */}
            <BlockStatus />

            {/* Herramientas según estado */}
            <ProTools />
            <BasicTools />
          </section>
        )}
      </main>
    </>
  );
}
