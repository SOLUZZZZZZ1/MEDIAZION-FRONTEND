// src/components/ProDashboard.jsx — Dashboard PRO (Seguridad + Instrucciones)
import React from "react";
import { Link } from "react-router-dom";
export default function ProDashboard({ who, subStatus, trialLeft, onSubscribe, onLogout }) {
  const isPro = subStatus === "active" || subStatus === "trialing";
  return (
    <section className="sr-card" style={{ maxWidth: 1200, margin: "0 auto" }}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h1 className="sr-h1">Panel del Mediador</h1>
          <p className="sr-small text-zinc-600">Sesión: <b>{who || "—"}</b></p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Link className="sr-btn-secondary" to="/mediadores/alta">Invitar colega</Link>
          <Link className="sr-btn-secondary" to="/panel-mediador/perfil">Mi perfil</Link>
          <Link className="sr-btn-secondary" to="/panel-mediador/perfil?tab=seguridad">Seguridad</Link>
          <button className="sr-btn-secondary" onClick={onLogout}>Salir</button>
        </div>
      </div>
      <div className="mt-4">
        {subStatus === "active" && <Banner color="emerald" title="PRO Activo" />}
        {subStatus === "trialing" && <Banner color="sky" title="Prueba PRO 7 días">
          {trialLeft !== null ? `Te quedan ${trialLeft} día(s). ` : ""}
          <div className="mt-3"><button className="sr-btn-primary" onClick={onSubscribe}>Activar suscripción definitiva</button></div>
        </Banner>}
        {(subStatus === "none" || subStatus === "expired" || subStatus === "canceled") && <Banner color="amber" title="Panel BÁSICO">
          <div className="mt-3"><button className="sr-btn-secondary" onClick={onSubscribe}>Probar PRO 7 días</button></div>
        </Banner>}
      </div>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
        <QuickAction to="/panel-mediador/ai" title="IA Profesional" emoji="🤖" disabled={!isPro} />
        <QuickAction to="/panel-mediador/plantillas" title="Recetas IA" emoji="📚" disabled={!isPro} />
        <QuickAction to="/panel-mediador/acta" title="Actas" emoji="📝" disabled={!isPro} />
        <QuickAction to="/panel-mediador/pagos" title="Pagos Rápidos" emoji="💳" disabled={!isPro} />
        <QuickAction to="/panel-mediador/casos" title="Expedientes" emoji="🗂️" disabled={!isPro} />
        <QuickAction to="/panel-mediador/agenda" title="Agenda" emoji="🗓️" disabled={!isPro} />
      </div>
      <div className="mt-8 text-center sr-small text-zinc-500">
        MEDIAZION · Panel PRO — {new Date().getFullYear()} <br />
        <a href="https://mediazion.eu/instrucciones-pro" target="_blank" rel="noopener noreferrer" className="underline text-sky-600 hover:text-sky-800">
          Instrucciones de uso
        </a>
      </div>
    </section>
  );
}
function Banner({ color, title, children }) {
  const palette = { emerald:"bg-emerald-50 border-emerald-200 text-emerald-800", sky:"bg-sky-50 border-sky-200 text-sky-800", amber:"bg-amber-50 border-amber-200 text-amber-800" };
  const classes = palette[color] || "bg-zinc-50 border-zinc-200";
  return <div className={"rounded-2xl p-4 border " + classes}><p className="sr-p m-0"><b>{title}</b> — {children}</p></div>;
}
function QuickAction({ to, title, emoji, disabled }) {
  const cls = disabled ? "opacity-50 pointer-events-none" : "hover:shadow-md transition-shadow";
  return (
    <Link to={to} className={"rounded-2xl border p-4 bg-white " + cls} aria-disabled={disabled}>
      <div className="flex items-center gap-3"><div className="text-2xl">{emoji}</div><div><div className="font-semibold">{title}</div><div className="sr-small text-zinc-600">Abrir</div></div></div>
    </Link>
  );
}
