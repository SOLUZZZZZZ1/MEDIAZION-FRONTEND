// src/pages/PanelMediador.jsx — versión completa con Stripe PRO + trial + downgrade

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import StripeButton from "../components/StripeButton.jsx";

export default function PanelMediador() {
  const nav = useNavigate();
  const email = localStorage.getItem("mediador_email");

  const [loading, setLoading] = useState(true);
  const [isPro, setIsPro] = useState(false);
  const [statusText, setStatusText] = useState("");

  useEffect(() => {
    if (!email) nav("/acceso");
  }, [email, nav]);

  useEffect(() => {
    if (!email) return;

    async function check() {
      try {
        // Comprobar estado actual
        const r = await fetch(`/api/mediadores/status?email=${encodeURIComponent(email)}`);
        const data = await r.json();

        if (!r.ok || data.status === "missing") {
          localStorage.removeItem("mediador_email");
          nav("/acceso");
          return;
        }

        // Si ha expirado trial → basic
        if (data.subscription_status === "expired") {
          setIsPro(false);
          setStatusText("Plan Básico (prueba expirada)");
        }

        // Si está activo o trial
        if (data.subscription_status === "active" || data.subscription_status === "trialing") {
          setIsPro(true);
          setStatusText(
            data.subscription_status === "trialing"
              ? "PRO (Periodo de prueba)"
              : "PRO Activo"
          );
        }

        // Si está en none → activar trial automáticamente
        if (data.subscription_status === "none") {
          const t = await fetch(`/api/mediadores/set_trial?email=${encodeURIComponent(email)}`, {
            method: "POST",
          });
          const td = await t.json();
          if (t.ok && td.ok) {
            setIsPro(true);
            setStatusText("PRO (Trial Activado)");
          } else {
            setIsPro(false);
            setStatusText("Plan Básico");
          }
        }
      } catch {
        setStatusText("Error verificando estado");
      } finally {
        setLoading(false);
      }
    }

    check();
  }, [email, nav]);

  function logout() {
    localStorage.removeItem("mediador_email");
    nav("/acceso");
  }

  if (!email) return null;

  return (
    <>
      <Seo title="Panel del Mediador · Mediazion" />
      <main className="sr-container py-8">

        <h1 className="sr-h1">Panel del Mediador</h1>
        <p className="sr-p">Sesión: <b>{email}</b></p>

        {loading && <p className="sr-p">Cargando…</p>}

        {!loading && (
          <>
            <section className="sr-card mt-4">
              <p className="sr-p">Estado actual: <b>{statusText}</b></p>

              {!isPro && (
                <>
                  <p className="sr-p mt-2">
                    Tu plan actual es <b>BASIC</b>. Puedes suscribirte para obtener acceso PRO.
                  </p>
                  <StripeButton />
                </>
              )}

              <button className="sr-btn-secondary mt-4" onClick={logout}>
                Cerrar sesión
              </button>
            </section>

            {isPro && (
              <section className="sr-card mt-6">
                <h2 className="sr-h2 mb-2">Herramientas PRO</h2>
                <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">

                  <Link className="sr-btn-secondary" to="/panel-mediador/ai">🤖 IA Profesional</Link>
                  <Link className="sr-btn-secondary" to="/panel-mediador/ai-legal">⚖️ IA Legal</Link>
                  <Link className="sr-btn-secondary" to="/panel-mediador/acta">📝 Actas</Link>
                  <Link className="sr-btn-secondary" to="/panel-mediador/casos">🗂️ Casos</Link>
                  <Link className="sr-btn-secondary" to="/panel-mediador/agenda">🗓️ Agenda</Link>
                  <Link className="sr-btn-secondary" to="/panel-mediador/pagos">📚 Recursos</Link>
                  <Link className="sr-btn-secondary" to="/panel-mediador/perfil">👤 Perfil</Link>
                  <Link className="sr-btn-secondary" to="/panel-mediador/voces">🖊️ Voces (Publicar)</Link>
                  <Link className="sr-btn-secondary" to="/voces">📰 Voces Públicas</Link>

                </div>
              </section>
            )}
          </>
        )}
      </main>
    </>
  );
}
