// src/pages/PanelMediador.jsx — demo visible + scroll + login simple opcional
import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import Seo from "../components/Seo.jsx";

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}
const LS_TOKEN = "mediador_token";

export default function PanelMediador() {
  const q = useQuery();
  const demo = q.get("demo") === "1";
  const [view, setView] = useState(demo ? "dashboard" : "login");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  // Si ya tenías un token guardado previamente, mostramos dashboard
  useEffect(() => {
    const t = localStorage.getItem(LS_TOKEN);
    if (!demo && t) setView("dashboard");
  }, [demo]);

  async function onLogin(e) {
    e.preventDefault();
    setBusy(true); setMsg("");
    try {
      // Si aún no tienes /api/auth/login implementado, forzamos demo:
      // descomenta la siguiente línea para entrar sin backend:
      // return setView("dashboard"), setBusy(false);

      const r = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: pass }),
      });
      const data = await r.json().catch(() => ({}));
      if (!r.ok || !data?.ok) throw new Error(data?.detail || "Credenciales no válidas");
      localStorage.setItem(LS_TOKEN, "ok"); // placeholder hasta tener token real
      setView("dashboard");
    } catch (e) {
      setMsg(e.message || "No se pudo iniciar sesión");
    } finally {
      setBusy(false);
    }
  }

  function onLogout() {
    localStorage.removeItem(LS_TOKEN);
    setView("login");
  }

  return (
    <>
      <Seo title="Panel del Mediador · MEDIAZION" description="Área privada del mediador de MEDIAZION." canonical="https://mediazion.eu/panel-mediador" />
      {/* Contenedor con altura y scroll propio */}
      <main
        className="sr-container py-8"
        style={{
          minHeight: "calc(100vh - 160px)", // evita que footer tape el contenido
          overflowY: "auto",
          background: "rgba(255,255,255,0.85)",
          borderRadius: "16px",
          marginTop: "24px",
          marginBottom: "24px",
        }}
      >
        {view === "login" && (
          <section className="sr-card" style={{ maxWidth: 520, margin: "0 auto" }}>
            <h1 className="sr-h1 mb-2">Acceso al Panel</h1>
            <p className="sr-p mb-4">Introduce tus credenciales. Si aún no las tienes, completa el alta y revisa tu email.</p>
            <form onSubmit={onLogin} style={{ display: "grid", gap: 12 }}>
              <input
                className="border rounded-md px-3 py-2"
                type="email" placeholder="Email"
                value={email} onChange={e=>setEmail(e.target.value)} required
              />
              <input
                className="border rounded-md px-3 py-2"
                type="password" placeholder="Contraseña"
                value={pass} onChange={e=>setPass(e.target.value)} required
              />
              <button className="sr-btn-primary" type="submit" disabled={busy}>
                {busy ? "Entrando..." : "Entrar"}
              </button>
              {msg && <p className="sr-p" style={{ color:"#991b1b" }}>Error: {msg}</p>}
              <p className="sr-p" style={{ opacity:.7, marginTop:8 }}>
                ¿Solo quieres ver el panel? Prueba la <a className="sr-link" href="/panel-mediador?demo=1">demo</a>.
              </p>
            </form>
          </section>
        )}

        {view === "dashboard" && (
          <section className="sr-card" style={{ maxWidth: 1024, margin: "0 auto" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", gap:12 }}>
              <h1 className="sr-h1">Panel del Mediador</h1>
              <button className="sr-btn-secondary" onClick={onLogout}>Salir</button>
            </div>

            {/* Tarjetas demo para asegurar que hay scroll */}
            <div className="mt-4" style={{ display:"grid", gridTemplateColumns:"repeat(3,minmax(0,1fr))", gap:12 }}>
              {Array.from({length: 12}).map((_,i)=>(
                <div key={i} className="sr-card" style={{ background:"white" }}>
                  <h3 className="sr-h3" style={{marginBottom:8}}>Ficha #{i+1}</h3>
                  <p className="sr-p">Contenido de ejemplo para verificar scroll y layout.</p>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <h2 className="sr-h2">Próximas funciones</h2>
              <ul className="sr-p" style={{ listStyle:"disc", paddingLeft: "1.25rem" }}>
                <li>Subir documentación y ver estado de casos.</li>
                <li>Cambiar contraseña y datos de perfil.</li>
                <li>Ver estado de suscripción y facturas (Stripe).</li>
              </ul>
            </div>
          </section>
        )}
      </main>
    </>
  );
}
