// src/pages/PanelMediador.jsx — VERSIÓN COMPLETA Y FINAL

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Seo from "../components/Seo.jsx";

export default function PanelMediador() {
  const nav = useNavigate();
  const email = localStorage.getItem("mediador_email");

  const [loading, setLoading] = useState(true);
  const [isPro, setIsPro] = useState(false);
  const [statusText, setStatusText] = useState("");

  // 🔐 1. Si no hay sesión → redirigir a login
  useEffect(() => {
    if (!email) {
      nav("/acceso");
    }
  }, [email, nav]);

  // 🔥 2. Comprobar estado del mediador
  useEffect(() => {
    if (!email) return;

    async function checkStatus() {
      try {
        const r = await fetch(
          `/api/mediadores/status?email=${encodeURIComponent(email)}`
        );
        const data = await r.json();

        // Si no existe → logout y pedir acceso
        if (!r.ok || data.status === "missing") {
          localStorage.removeItem("mediador_email");
          nav("/acceso");
          return;
        }

        // Si está en trial o activo → PRO
        if (data.subscription_status === "trialing" || data.subscription_status === "active") {
          setIsPro(true);
          setStatusText(
            data.subscription_status === "trialing"
              ? "PRO (Periodo de prueba)"
              : "PRO Activo"
          );
        } else {
          // Si está en "none" → activar trial automáticamente
          const t = await fetch(
            `/api/mediadores/set_trial?email=${encodeURIComponent(email)}`,
            { method: "POST" }
          );
          const td = await t.json();

          if (t.ok && td.ok) {
            setIsPro(true);
            setStatusText("PRO (Periodo de prueba activado)");
          } else {
            setIsPro(false);
            setStatusText("Plan Básico");
          }
        }
      } catch {
        setIsPro(false);
      } finally {
        setLoading(false);
      }
    }

    checkStatus();
  }, [email, nav]);

  // 🔐 logout
  function logout() {
    localStorage.removeItem("mediador_email");
    nav("/acceso");
  }

  if (!email) return null;

  return (
    <>
      <Seo title="Panel del Mediador · MEDIAZION" />

      <main className="sr-container py-8" style={{ minHeight: "calc(100vh - 160px)" }}>
        <h1 className="sr-h1">Panel del Mediador</h1>
        <p className="sr-p">
          Sesión: <b>{email}</b>
        </p>

        {loading && <p className="sr-p mt-4">Cargando estado...</p>}

        {!loading && (
          <>
            <section className="sr-card mt-4">
              <p className="sr-p">
                Estado actual: <b>{statusText}</b>
              </p>
              <button className="sr-btn-secondary mt-2" onClick={logout}>
                Cerrar sesión
              </button>
            </section>

            {isPro && (
              <section className="sr-card mt-4">
                <h2 className="sr-h2 mb-2">Herramientas PRO</h2>
                <div className="mt-3 grid gap-2 md:grid-cols-2 lg:grid-cols-3">
                  <Link className="sr-btn-secondary" to="/panel-mediador/ai">🤖 IA Profesional</Link>
                  <Link className="sr-btn-secondary" to="/panel-mediador/ai-legal">⚖️ IA Legal</Link>
                  <Link className="sr-btn-secondary" to="/panel-mediador/acta">📝 Actas</Link>
                  <Link className="sr-btn-secondary" to="/panel-mediador/casos">🗂️ Casos</Link>
                  <Link className="sr-btn-secondary" to="/panel-mediador/agenda">🗓️ Agenda</Link>
                  <Link className="sr-btn-secondary" to="/panel-mediador/pagos">💳 Pagos</Link>
                  <Link className="sr-btn-secondary" to="/panel-mediador/perfil">👤 Perfil</Link>
                  <Link className="sr-btn-secondary" to="/panel-mediador/voces">🖊️ Voces (publicar)</Link>
                  <Link className="sr-btn-secondary" to="/voces">📰 Voces (público)</Link>
                </div>
              </section>
            )}
          </>
        )}
      </main>
    </>
  );
}
