// src/components/ProDashboard.jsx — Dashboard PRO (Seguridad + Instrucciones)
import React from "react";
import { Link } from "react-router-dom";

export default class ProDashboard extends React.Component {
  render() {
    const { who, subStatus, trialLeft, onSubscribe, onLogout } = this.props;
    const isPro = subStatus === "active" || subStatus === "trialing";

    return (
      <section className="sr-card" style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items=center gap-3">
          <div>
            <h1 className="sr-h1">Panel del Mediador</h1>
            <p className="sr-small text-zinc-600">Sesión: <b>{who || "—"}</b></p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link className=" sr-btn-secondary" to="/mediadores/alta">Invitar colega</Link>
            <Link className=" sr-btn-secondary" to="/panel-mediador/perfil">Mi perfil</Link>
            <Link className=" sr-btn-secondary" to="/panel-mediador/perfil?tab=seguridad">Seguridad</Link>
            <button className="sr-btn-secondary" onClick={onLogout}>Salir</button>
          </div>
        </div>

        <div className="mt-4">
          {isPro ? (
            <div className="rounded-2xl p-4 border bg-emerald-50 text-emerald-800">
              <p className="sr-p">
                <b>PRO activo</b> — Tienes acceso completo a IA, plantillas y cobros.
              </p>
            </div>
          ) : (
            <div className="rounded-2xl p-4 border bg-amber-50 text-amber-800">
              <p className="sr-p">
                <b>Panel BÁSICO</b> — Activa tu <b>prueba PRO</b> para desbloquear IA, plantillas y cobros.
              </p>
              <button className="sr-btn-secondary mt-2" onClick={onSubscribe}>Probar PRO 7 días</button>
            </div>
          )}
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
          <Quick to="/panel-mediador/ai"         label="IA Profesional"  emoji="🤖" disabled={!isPro} />
          <Quick to="/panel-mediador/plantillas" label="Recetas IA"      emoji="📚" disabled={!isPro} />
          <Quick to="/panel-mediador/acta"       label="Actas"           emoji="📝" disabled={!isPro} />
          <Quick to="/panel-mediador/pagos"      label="Pagos Rápidos"   emoji="💳" disabled={!isPro} />
          <Quick to="/panel-mediador/casos"      label="Expedientes"     emoji="🗂️" disabled={!isPro} />
          <Quick to="/panel-mediador/agenda"     label="Agenda"          emoji="🗓️" disabled={!isPro} />
    <QuickAction to="/panel-mediador/ai-legal"   title="IA (Experto)"    emoji="⚖️" disabled={!isPro} />

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
}

function Quick({ to, label, emoji, disabled }) {
  const cls = disabled ? "opacity-50 pointer-events-none" : "hover:shadow-md";
  return (
    <Link to={to} className={`rounded-2xl border p-4 bg-white ${cls}`} aria-disabled={disabled}>
      <div className="flex items-center gap-3">
        <div className="text-2xl">{emoji}</div>
        <div>
          <div className="font-semibold">{label}</div>
          <div className="sr-small text-zinc-600">Abrir</div>
        </div>
      </div>
    </Link>
  );
}
