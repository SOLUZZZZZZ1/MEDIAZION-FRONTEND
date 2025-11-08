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
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        <QuickAction to="/panel-mediador/ai"            title="IA Profesional"   emoji="🤖" disabled={!isPro} />
        <QuickAction to="/panel-mediador/plantillas"    title="Recetas IA"      emoji="📚" disabled={!isPro} />
        <QuickAction to="/panel-mediador/pagos"         title="Pagos Rápidos"   emoji="💳" disabled={!isPro} />
        <QuickAction to="/panel-mediador/casos"         title="Expedientes"     emoji="🗂️" disabled={!isPro} />
        <QuickAction to="/panel-mediador/agenda"        title="Agenda"          emoji="🗓️" disabled={!isPro} />
        {/* NUEVA acción rápida: Actas */}
        <QuickAction to="/panel-mediador/acta"          title="Actas"           emoji="📝" disabled={!isPro} />
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

          {/* Plantillas + botón extra “Nueva acta” */}
          <FeatureCard
            title="Plantillas & Documentos"
            desc="Recetas listas + variables. Exportación a PDF/DOCX (fase 2)."
            bullets={["Acta estándar", "Convocatoria", "Correo de seguimiento"]}
            ctaText="Ver recetas"
            to="/panel-mediador/plantillas"
            extraLinks={[
              { to: "/panel-mediador/acta", text: "Nueva acta" } // <-- AQUÍ ESTÁ TU BOTÓN
            ]}
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
    <Link to={to} className={`rounded-2xl border p-4 bg-white ${cls}`}>
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

function FeatureCard({ title, desc, bullets = [], ctaText, to, extraLinks = [] }) {
  return (
    <article className="rounded-2xl border p-5 bg-white hover:shadow-sm transition-shadow">
      <h3 className="sr-h3">{title}</h3>
      <p className="sr-p mt-1">{desc}</p>
      {bullets.length > 0 && (
        <ul className="sr-ul mt-2">
          {bullets.map((b, i) => <li key={i}>{b}</li>)}
        </ul>
      )}
      <div className="mt-3 flex flex-wrap gap-8">
        <Link className="sr-btn-secondary" to={to}>{ctaText}</Link>
        {extraLinks.map((x, i) => (
          <Link key={i} className="sr-btn-secondary" to={x.to}>{x.text}</Link>
        ))}
      </div>
    </article>
  );
}

function MiniCard({ title, desc, to, emoji }) {
  return (
    <article className="rounded-2xl border p-5 bg-white">
      <div className="flex items-center gap-3">
        <div className="text-2xl">{emoji}</div>
        <h3 className="sr-h3 m-0">{title}</h3>
      </div>
      <p className="sr-p mt-2">{desc}</p>
      <Link className "sr-btn-secondary mt-2 inline-block" to={to}>Abrir</Link>
    </article>
  );
}
