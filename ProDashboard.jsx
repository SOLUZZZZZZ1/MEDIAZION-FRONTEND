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
          <Link className="sr-btn-secondary" to="/panel-mediador/perfil?tab=seguridad">Cambiar contraseña</Link>
          <button className="sr-btn-secondary" onClick={onLogout}>Salir</button>
        </div>
      </div>

      {/* …aquí tus banners y quick actions… */}

      <div className="mt-8 text-center sr-small text-zinc-500">
        MEDIAZION · Panel PRO — {new Date().getFullYear()}<br />
        <a href="https://mediazion.eu/instrucciones-pro" target="_blank" rel="noopener noreferrer" className="underline text-sky-600 hover:text-sky-800">
          Instrucciones de uso
        </a>
      </div>
    </section>
  );
}
