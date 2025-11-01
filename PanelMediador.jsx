// src/pages/PanelMediador.jsx — Panel Mediador con IA y modo demo
import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Seo from "../components/Seo.jsx";

const API =
  (import.meta.env.VITE_API_BASE && import.meta.env.VITE_API_BASE.trim())
    ? import.meta.env.VITE_API_BASE.trim().replace(/\/$/,"")
    : ""; // si está vacío, usaremos el proxy /api

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

function useAuthToken() {
  const KEY = "mediador_token";
  const [token, setToken] = useState(() => localStorage.getItem(KEY) || "");
  const save = (t) => { if (t) localStorage.setItem(KEY, t); else localStorage.removeItem(KEY); setToken(t||""); };
  return [token, save];
}

export default function PanelMediador() {
  const q = useQuery();
  const demo = q.get("demo") === "1";
  const [token, setToken] = useAuthToken();

  // estado
  const [view, setView] = useState(demo ? "dashboard" : (token ? "loading" : "login"));
  const [me, setMe] = useState(null);
  const [profile, setProfile] = useState(null);
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  // IA
  const [aiInput, setAiInput] = useState("");
  const [aiBusy, setAiBusy] = useState(false);
  const [aiReply, setAiReply] = useState("");

  // endpoints (proxy si no hay API base)
  const url = (path) => (API ? `${API}${path}` : `/api${path}`);

  // demo: datos simulados
  const demoMe = { email: "demo@mediazion.eu", role: "mediador", status: "active", must_change_password: false };
  const demoProfile = {
    user: { status: "active" },
    mediador: {
      name: "Mediador/a Demo",
      telefono: "600000000",
      bio: "Especialista en civil y mercantil. 10 años de experiencia.",
      provincia: "Madrid",
      especialidad: ["civil","mercantil"],
      web: "https://mediazion.eu",
      linkedin: "https://linkedin.com/in/demo",
      photo_url: "",
      cv_url: ""
    }
  };

  // bootstrap real (si hay token y no demo)
  useEffect(() => {
    if (demo) return;
    const boot = async () => {
      if (!token) { setView("login"); return; }
      try {
        // /me
        const r = await fetch(url("/me"), { headers: { Authorization: `Bearer ${token}` } });
        if (!r.ok) throw new Error("Sesión no válida");
        const data = await r.json();
        setMe(data);
        // /panel/profile
        const r2 = await fetch(url("/panel/profile"), { headers: { Authorization: `Bearer ${token}` } });
        setProfile(r2.ok ? await r2.json() : null);
        setView("dashboard");
      } catch {
        setView("login");
        setMsg("La sesión no es válida. Inicia sesión de nuevo.");
      }
    };
    if (view === "loading") boot();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  // login fake (cliente) para pruebas (en real, cambia a tu /users/login)
  const handleLogin = async (e) => {
    e.preventDefault();
    setBusy(true); setMsg("");
    try {
      const email = e.target.email.value.trim();
      const password = e.target.password.value;
      if (!email || !password) throw new Error("Completa usuario y contraseña");
      // DEMO: simula login correcto y token
      setToken("DEMO-TOKEN"); setMe({ email, role: "mediador", status: "active", must_change_password: false });
      setProfile(demoProfile);
      setView("dashboard");
    } catch (err) {
      setMsg(err.message || "Error de autenticación");
    } finally { setBusy(false); }
  };

  const handleLogout = () => { setToken(""); setMe(null); setProfile(null); setView("login"); };

  const handleProfileSave = async (e) => {
    e.preventDefault();
    if (demo) { setMsg("Guardado (demo)."); return; }
    setBusy(true); setMsg("");
    try {
      const p = profile?.mediador || {};
      const payload = {
        name: p.name || "", telefono: p.telefono || "", bio: p.bio || "",
        provincia: p.provincia || "", especialidad: p.especialidad || [],
        web: p.web || "", linkedin: p.linkedin || ""
      };
      const r = await fetch(url("/panel/profile"), {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data?.detail || "No se pudo guardar el perfil");
      setMsg("Perfil actualizado correctamente.");
      // recarga
      const r2 = await fetch(url("/panel/profile"), { headers: { Authorization: `Bearer ${token}` } });
      setProfile(r2.ok ? await r2.json() : null);
    } catch (e2) { setMsg(e2.message || "Error al guardar perfil"); }
    finally { setBusy(false); }
  };

  const uploadFile = async (file, kind) => {
    if (demo) { alert("Subida (demo)"); return; }
    const fd = new FormData(); fd.append("file", file);
    setBusy(true);
    try {
      const r = await fetch(url(`/upload/file?kind=${encodeURIComponent(kind)}`), {
        method: "POST", headers:{ Authorization:`Bearer ${token}`}, body: fd
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data?.detail || "Error al subir archivo");
      alert(kind==="photo" ? "Foto actualizada" : "CV actualizado");
      const r2 = await fetch(url("/panel/profile"), { headers: { Authorization: `Bearer ${token}` } });
      setProfile(r2.ok ? await r2.json() : null);
    } catch (e) { alert(e.message || "No se pudo subir"); }
    finally { setBusy(false); }
  };

  // IA: consulta al backend (proxy /api)
  const askAI = async () => {
    setAiBusy(true); setAiReply(""); setMsg("");
    try {
      const prompt = aiInput.trim();
      if (!prompt) return;
      const r = await fetch(url("/ai/assist"), {
        method: "POST",
        headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify({ prompt })
      });
      if (!r.ok) {
        const t = await r.text();
        throw new Error(`IA no disponible ahora mismo. ${t?.slice(0,160) || ""}`);
      }
      const data = await r.json().catch(()=> ({}));
      setAiReply(data?.answer || "He recibido tu consulta, pero no tengo respuesta estructurada.");
    } catch (e) { setAiReply(e.message || "No se pudo consultar IA"); }
    finally { setAiBusy(false); }
  };

  // VISTA LOGIN
  if (view === "login") {
    return (
      <>
        <Seo title="Área Mediadores · Acceso" description="Inicia sesión para gestionar tu perfil." canonical="https://mediazion.eu/mediadores/panel" />
        <main className="sr-container py-12">
          <div className="sr-card" style={{ maxWidth: 520 }}>
            <h1 className="sr-h1 mb-4">Área de Mediadores</h1>
            {msg && <div className="sr-p" style={{ color:"#f87171" }}>{msg}</div>}
            <form onSubmit={handleLogin}>
              <label className="sr-p block mb-1">Email</label>
              <input name="email" type="email" className="w-full border rounded-md px-3 py-2" required />
              <label className="sr-p block mt-4 mb-1">Contraseña</label>
              <input name="password" type="password" className="w-full border rounded-md px-3 py-2" required />
              <button className="sr-btn-primary mt-4" type="submit" disabled={busy}>
                {busy ? "Accediendo…" : "Entrar"}
              </button>
            </form>
            <div className="sr-p mt-4">
              ¿Aún no tienes cuenta? <Link className="text-blue-600 underline" to="/mediadores/alta">Darte de alta</Link>
              <span className="ml-3">·</span>
              <Link className="text-blue-600 underline ml-3" to="/mediadores/panel?demo=1">Entrar en modo demo</Link>
            </div>
          </div>
        </main>
      </>
    );
  }

  // VISTA DASHBOARD (demo o real)
  const p = demo ? demoProfile : (profile || demoProfile);
  const m = p?.mediador || {};

  return (
    <>
      <Seo title="Área de Mediadores" description="Panel profesional con ayuda IA." canonical="https://mediazion.eu/mediadores/panel" />
      <main className="sr-container py-12">
        <div className="flex justify-between items-center mb-6">
          <h1 className="sr-h1">Área de Mediadores</h1>
          <div className="flex gap-2">
            <Link className="sr-btn-secondary" to="/mediadores/alta">Completar alta</Link>
            {!demo && <button className="sr-btn-secondary" onClick={handleLogout}>Cerrar sesión</button>}
            {demo && <span className="sr-p" style={{opacity:.7}}>Modo demo</span>}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Perfil */}
          <section className="sr-card md:col-span-2">
            <h2 className="sr-h2">Mi perfil</h2>
            <form onSubmit={handleProfileSave} className="grid grid-cols-1 gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className="sr-p block mb-1">Nombre</label><input className="w-full border rounded-md px-3 py-2" value={m.name||""} onChange={e=>setProfile(x=>({...x, mediador:{...x?.mediador, name:e.target.value}}))} /></div>
                <div><label className="sr-p block mb-1">Teléfono</label><input className="w-full border rounded-md px-3 py-2" value={m.telefono||""} onChange={e=>setProfile(x=>({...x, mediador:{...x?.mediador, telefono:e.target.value}}))} /></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="sr-p block mb-1">Especialidad</label>
                  <div className="flex flex-wrap gap-2">
                    {["civil","mercantil","familiar","comunitaria","laboral"].map(tag=>{
                      const has=(m.especialidad||[]).includes(tag);
                      return (
                        <label key={tag} className="inline-flex items-center gap-2">
                          <input type="checkbox" checked={!!has} onChange={e=>{
                            setProfile(x=>{
                              const cur=new Set(x?.mediador?.especialidad||[]);
                              if(e.target.checked) cur.add(tag); else cur.delete(tag);
                              return {...x, mediador:{...x?.mediador, especialidad:Array.from(cur)}};
                            });
                          }} />
                          <span className="sr-p capitalize">{tag}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
                <div><label className="sr-p block mb-1">Provincia</label><input className="w-full border rounded-md px-3 py-2" value={m.provincia||""} onChange={e=>setProfile(x=>({...x, mediador:{...x?.mediador, provincia:e.target.value}}))} /></div>
              </div>
              <div><label className="sr-p block mb-1">Bio</label><textarea className="w-full border rounded-md px-3 py-2" rows={5} value={m.bio||""} onChange={e=>setProfile(x=>({...x, mediador:{...x?.mediador, bio:e.target.value}}))} /></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="sr-p block mb-1">Foto</label>
                  <input type="file" accept="image/*" onChange={e=>e.target.files?.[0] && uploadFile(e.target.files[0],"photo")} />
                  {m.photo_url && <div className="mt-2"><img src={m.photo_url} alt="Foto" style={{width:120,height:120,objectFit:"cover",borderRadius:8}} /></div>}
                </div>
                <div>
                  <label className="sr-p block mb-1">CV (PDF)</label>
                  <input type="file" accept="application/pdf" onChange={e=>e.target.files?.[0] && uploadFile(e.target.files[0],"cv")} />
                  {m.cv_url && <div className="mt-2"><a className="sr-btn-secondary" href={m.cv_url} target="_blank" rel="noopener noreferrer">Ver CV</a></div>}
                </div>
              </div>
              {!demo && <button className="sr-btn-primary" type="submit" disabled={busy}>Guardar cambios</button>}
              {msg && <div className="sr-p" style={{color:"#16a34a"}}>{msg}</div>}
            </form>
          </section>

          {/* Ayuda IA */}
          <section className="sr-card">
            <h2 className="sr-h2">Ayuda IA</h2>
            <p className="sr-p">Haz una pregunta (jurídica general, redacción de texto, email a cliente…).</p>
            <textarea className="w-full border rounded-md px-3 py-2" rows={6} value={aiInput} onChange={e=>setAiInput(e.target.value)} placeholder="Escribe tu consulta…" />
            <button className="sr-btn-secondary mt-3" onClick={askAI} disabled={aiBusy || !aiInput.trim()}>
              {aiBusy ? "Pensando…" : "Preguntar"}
            </button>
            {aiReply && <div className="sr-card mt-3" style={{background:"rgba(248,250,252,.9)"}}>
              <div className="sr-p" style={{whiteSpace:"pre-wrap"}}>{aiReply}</div>
            </div>}
          </section>
        </div>
      </main>
    </>
  );
}
