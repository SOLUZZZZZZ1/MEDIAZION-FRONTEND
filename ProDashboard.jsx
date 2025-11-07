// src/components/ProDashboard.jsx
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
        <div className="flex gap-2">
          <Link className="sr-btn-secondary" to="/mediadores/alta">Invitar colega</Link>
          <button className="sr-btn-secondary" onClick={onLogout}>Salir</button>
        </div>
      </div>

      {/* Status Banner */}
      <div className="mt-4">
        {subStatus === "active" && (
          <div className="rounded-2xl p-4 bg-emerald-50 border border-emerald-200">
            <p className="sr-p">
              <span className="inline-flex items-center gap-2 font-semibold text-emerald-700">
                ✅ PRO Activo
              </span>{" "}
              — Tienes acceso completo a IA, plantillas, cobros y utilidades PRO.
            </p>
          </div>
        )}

        {subStatus === "trialing" && (
          <div className="rounded-2xl p-4 bg-sky-50 border border-sky-200">
            <p className="sr-p">
              <span className="inline-flex items-center gap-2 font-semibold text-sky-700">
                ⭐ Prueba PRO 7 días
              </span>
              {trialLeft !== null ? ` — te quedan ${trialLeft} día(s).` : ""} Disfruta de todo y, si te encaja, actívalo.
            </p>
            <div className="mt-3">
              <button className="sr-btn-primary" onClick={onSubscribe}>Activar suscripción definitiva</button>
            </div>
          </div>
        )}

        {(subStatus === "none" || subStatus === "expired" || subStatus === "canceled") && (
          <div className="rounded-2xl p-4 bg-amber-50 border border-amber-200">
            <p className="sr-p">
              <span className="inline-flex items-center gap-2 font-semibold text-amber-700">
                ⚠️ Panel BÁSICO
              </span>{" "}
              — Activa tu <b>prueba PRO de 7 días</b> para acceder a IA, plantillas y cobros.
            </p>
            <div className="mt-3">
              <button className="sr-btn-secondary" onClick={onSubscribe}>Probar PRO 7 días</button>
            </div>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        <QuickAction to="/panel-mediador/ai"       title="IA Profesional"     emoji="🤖"    disabled={!isPro} />
        <QuickAction to="/panel-mediador/plantillas" title="Recetas IA"     emoji="📚"    disabled={!isPro} />
        <QuickAction to="/panel-mediador/pagos"    title="Pagos Rápidos"     emoji="💳"    disabled={!isPro} />
        <QuickAction to="/panel-mediador/casos"    title="Expedientes"       emoji="🗂️"    disabled={!isPro} />
        <QuickAction to="/panel-mediador/agenda"   title="Agenda"            emoji="🗓️"    disabled={!isPro} />
      </div>

      {/* Feature Cards */}
      {isPro ? (
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
          <FeatureCard
            title="Asistente IA Profesional"
            desc="Redacta actas, resúmenes y comunicaciones. Con documento: extrae puntos clave de PDF/DOCX."
            bullets={["Actas y acuerdos", "Resúmenes ejecutivos", "Análisis de documentos"]}
            ctaText="Abrir IA"
            to="/panel-mediador/ai"
          />
          <FeatureCard
            title="Plantillas & Documentos"
            desc="Recetas listas + variables. Exportación a PDF/DOCX (fase 2)."
            bullets={["Acta estándar", "Convocatoria", "Correo de seguimiento"]}
            ctaText="Ver recetas"
            to="/panel-mediador/plantillas"
          />
          <FeatureCard
            title="Cobros & Operativa"
            desc="Cobra con tarjeta en segundos. Recibos automáticos y, en breve, cupones."
            bullets={["Stripe Elements", "Links de pago", "Historial (fase 2)"]}
            ctaText="Pagos rápidos"
            to="/panel-mediador/pagos"
          />
        </div>
      ) : (
        <div className="mt-6 sr-card">
          <h2 className="sr-h2">Ventajas del plan PRO</h2>
          <ul className="sr-ul">
            <li>🤖 Asistente IA (texto + documentos)</li>
            <li>📚 Plantillas profesionales (actas, acuerdos, comunicaciones)</li>
            <li>💳 Cobros con tarjeta + recibos</li>
            <li>🗂️ Expedientes con notas y bitácora</li>
            <li>🗓️ Agenda con recordatorios (en camino)</li>
          </ul>
          <div className="mt-3">
            <button className="sr-btn-primary" onClick={onSubscribe}>Probar PRO 7 días</button>
          </div>
        </div>
      )}

      {/* Secondary section (Casos / Agenda destacadas) */}
      {isPro && (
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <MiniCard
            title="Expedientes"
            desc="Crea y organiza casos, añade notas y mantén el control de tu práctica."
            to="/panel-mediador/casos"
            emoji="🗂️"
          />
          <MiniCard
            title="Agenda"
            desc="Citas con asunto, fecha/hora y lugar. Próximamente invitaciones y recordatorios."
            to="/panel-mediador/agenda"
            emoji="🗓️"
          />
        </div>
      )}

      {/* Footer info */}
      <div className="mt-8 text-center sr-small text-zinc-500">
        <span>MEDIAZION · Panel PRO — {new Date().getFullYear()}</span>
      </div>
    </section>
  );
}

/* ---------- Subcomponentes UI ---------- */

function QuickAction({ to, title, emoji, disabled }) {
  const cls = disabled
    ? "opacity-50 pointer-events-none"
    : "hover:shadow-md transition-shadow";
  return (
    <Link to={to} className={`rounded-2xl border p-4 bg-white ${cls}`}>
      <div className="flex items-center gap-3">
        <div className="text-2xl">{emoji}</
