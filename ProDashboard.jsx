// src/components/ProDashboard.jsx — Dashboard PRO (botón Seguridad con query)
import React from "react";
import { Link } from "react-router-dom";

/**
 * ProDashboard
 * Props:
 *  - who: string (email del mediador)
 *  - subStatus: "active" | "trialing" | "none" | "expired" | "canceled"
 *  - trialLeft: number | null
 *  - onSubscribe: () => void
 *  - onLogout: () => void
 */
export default function ProDashboard({ who, subStatus, trialLeft, onSubscribe, onLogout }) {
  const isPro = subStatus === "active" || subStatus === "trialing";

  return (
    <section className="sr-card" style={{ maxWidth: 1200, margin: "0 auto" }}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h1 className="sr-h1">Panel del Mediador</h1>
          <p className="sr-small text-zinc-600">Sesión: <b>{who || "—"}</b></p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Link className="sr-btn-secondary" to="/mediadores/alta" title="Invitar a un colega">Invitar colega</Link>
          <Link className="sr-btn-secondary" to="/panel-mediador/perfil" title="Abrir mi perfil">Mi perfil</Link>
          <Link className="sr-btn-secondary" to="/panel-mediador/perfil?tab=seguridad" title="Cambiar contraseña">Seguridad</Link>
          <button className="sr-btn-secondary" onClick={onLogout} title="Cerrar sesión">Salir</button>
        </div>
      </div>

      {/* Status Banner */}
      <div className="mt-4">
        {subStatus === "active" && (
          <Banner color="emerald" icon="✅" title="PRO Activo">
            Tienes acceso completo a IA, plantillas, cobros y utilidades PRO.
          </Banner>
        )}
        {subStatus === "trialing" && (
          <Banner color="sky" icon="⭐" title="Prueba PRO 7 días">
            {trialLeft !== null ? `Te quedan ${trialLeft} día(s). ` : ""}Disfruta de todo y, si te encaja, actívalo.
            <div className="mt-3">
              <button className="sr-btn-primary" onClick={onSubscribe}>Activar suscripción definitiva</button>
            </div>
          </Banner>
        )}
        {(subStatus === "none" || subStatus === "expired" || subStatus === "canceled") && (
          <Banner color="amber" icon="⚠️" title="Panel BÁSICO">
            Activa tu <b>prueba PRO de 7 días</b> para acceder a IA, plantillas y cobros.
            <div className="mt-3">
              <button className="sr-btn-secondary" onClick={onSubscribe}>Probar PRO 7 días</button>
            </div>
          </Banner>
        )}
      </div>

      {/* Quick Actions */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
        <QuickAction to="/panel-mediador/ai"            title="IA Profesional"   emoji="🤖" disabled={!isPro} />
        <QuickAction to="/panel-mediador/plantillas"    title="Recetas IA"      emoji="📚" disabled={!isPro} />
        <QuickAction to="/panel-mediador/acta"          title="Actas"           emoji="📝" disabled={!isPro} />
        <QuickAction to="/panel-mediador/pagos"         title="Pagos Rápidos"   emoji="💳" disabled={!isPro} />
        <QuickAction to="/panel-mediador/casos"         title="Expedientes"     emoji="🗂️" disabled={!isPro} />
        <QuickAction to="/panel-mediador/agenda"        title="Agenda"          emoji="🗓️" disabled={!isPro} />
      </div>
    </section>
  );
}

function Banner({ color, icon, title, children }) {
  const palette = {
    emerald: "bg-emerald-50 border-emerald-200 text-emerald-800",
    sky:     "bg-sky-50 border-sky-200 text-sky-800",
    amber:   "bg-amber-50 border-amber-200 text-amber-800"
  };
  const classes = palette[color] || "bg-zinc-50 border-zinc-200";
  return (
    <div className={`rounded-2xl p-4 border ${classes}`}>
      <p className="sr-p">
        <span className="inline-flex items-center gap-2 font-semibold">{icon} {title}</span> — {children}
      </p>
    </div>
  );
}

function QuickAction({ to, title, emoji, disabled }) {
  const cls = disabled ? "opacity-50 pointer-events-none" : "hover:shadow-md transition-shadow";
  return (
    <Link to={to} className={`rounded-2xl border p-4 bg-white ${cls}`} aria-disabled={disabled}>
      <div className="flex items-center gap-3">
        <div className="text-2xl">{emoji}</div>
        <div>
          <div className="font-semibold">{title}</div>
          <div className="sr-small text-zinc-600">Abrir</div>
        </div>
      </div>
    </Link>
  );
}
