// src/pages/PanelMediador.jsx
import React, { useEffect, useState } from "react";

const API_BASE =
  import.meta.env.VITE_API_BASE || "https://backend-api-mediazion-1.onrender.com";

function useAuthToken() {
  const key = "mediador_token";
  const [token, setToken] = useState(() => localStorage.getItem(key) || "");
  const save = (t) => { setToken(t || ""); if (t) localStorage.setItem(key, t); else localStorage.removeItem(key); };
  return [token, save];
}

export default function PanelMediador() {
  const [token, setToken] = useAuthToken();
  const [view, setView] = useState("loading"); // loading | login | dashboard
  const [me, setMe] = useState(null);
  const [profile, setProfile] = useState(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const boot = async () => {
      if (!token) { setView("login"); return; }
      try {
        const r = await fetch(`${API_BASE.replace(/\/$/,"")}/me`, { headers: { Authorization: `Bearer ${token}` }});
        if (!r.ok) throw new Error("Sesión no válida");
        const data = await r.json();
        setMe(data);
        await fetchProfile();
        setView("dashboard");
      } catch { setView("login"); }
    };
    boot();
  }, [token]);

  const fetchProfile = async () => {
    const r = await fetch(`${API_BASE.replace(/\/$/,"")}/panel/profile`, { headers: { Authorization: `Bearer ${token}` }});
    if (r.ok) setProfile(await r.json());
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value.trim();
    const password = e.target.password.value;
    setBusy(true); setMsg("");
    try {
      const r = await fetch(`${API_BASE.replace(/\/$/,"")}/users/login`, {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ email, password })
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data?.detail || "No se pudo iniciar sesión");
      setToken(data.token);
      setMe({ email, role:data.role, status:data.status, must_change_password:data.must_change_password });
      await fetchProfile();
      setView("dashboard");
      if (data.must_change_password) setMsg("Por seguridad, cambia tu contraseña temporal.");
    } catch (err) {
      setMsg(err.message || "Error de autenticación");
    } finally { setBusy(false); }
  };

  const handleLogout = () => { setToken(""); setMe(null); setProfile(null); setView("login"); };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    const current_password = e.target.current_password.value;
    const new_password = e.target.new_password.value;
    const confirm_password = e.target.confirm_password.value;
    if (!current_password || !new_password) return alert("Rellena contraseñas");
    if (new_password !== confirm_password) return alert("No coincide la confirmación");
    try {
      setBusy(true);
      const r = await fetch(`${API_BASE.replace(/\/$/,"")}/users/change_password`, {
        method:"POST",
        headers:{"Content-Type":"application/json", Authorization: `Bearer ${token}`},
        body: JSON.stringify({ current_password, new_password })
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data?.detail || "No se pudo actualizar la contraseña");
      alert("Contraseña actualizada");
      setMe(m => ({...m, must_change_password:false}));
    } catch (e2) {
      alert(e2.message || "Error al cambiar contraseña");
    } finally { setBusy(false); }
  };

  const handleProfileSave = async (e) => {
    e.preventDefault();
    setBusy(true); setMsg("");
    try {
      const p = profile?.mediador || {};
      const payload = {
        name: p.name || "", telefono: p.telefono || "", bio: p.bio || "",
        provincia: p.provincia || "", especialidad: p.especialidad || [],
        web: p.web || "", linkedin: p.linkedin || ""
      };
      const r = await fetch(`${API_BASE.replace(/\/$/,"")}/panel/profile`, {
        method:"PUT", headers:{"Content-Type":"application/json", Authorization:`Bearer ${token}`},
        body: JSON.stringify(payload)
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data?.detail || "No se pudo guardar el perfil");
      setMsg("Perfil actualizado correctamente.");
      await fetchProfile();
    } catch (e2) {
      setMsg(e2.message || "Error al guardar perfil");
    } finally { setBusy(false); }
  };

  const uploadFile = async (file, kind) => {
    const fd = new FormData(); fd.append("file", file);
    setBusy(true);
    try {
      const r = await fetch(`${API_BASE.replace(/\/$/,"")}/upload/file?kind=${encodeURIComponent(kind)}`, {
        method:"POST", headers:{ Authorization:`Bearer ${token}`}, body: fd
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data?.detail || "Error al subir archivo");
      await fetchProfile();
      alert(kind==="photo" ? "Foto actualizada" : "CV actualizado");
    } catch (e) { alert(e.message || "No se pudo subir"); }
    finally { setBusy(false); }
  };

  if (view==="loading") return <main className="sr-container py-12"><p className="sr-p">Cargando…</p></main>;

  if (view==="login") {
    return (
      <main className="sr-container py-12">
        <div className="sr-card" style={{ maxWidth: 520 }}>
          <h1 className="sr-h1 mb-4">Acceso Mediadores</h1>
          {msg && <div className="sr-p" style={{ color: "#f87171" }}>{msg}</div>}
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
            ¿Aún no tienes cuenta? <a className="text-blue-600 underline" href="/mediadores/alta">Darte de alta</a>
          </div>
        </div>
      </main>
    );
  }

  // Dashboard
  const m = profile?.mediador || {};
  return (
    <main className="sr-container py-12">
      <div className="flex justify-between items-center mb-6">
        <h1 className="sr-h1">Área de Mediadores</h1>
        <button className="sr-btn-secondary" onClick={handleLogout}>Cerrar sesión</button>
      </div>

      {me?.must_change_password && (
        <div className="sr-card mb-6" style={{ background: "#fff6e5" }}>
          <h2 className="sr-h2">Cambia tu contraseña</h2>
          <form onSubmit={handleChangePassword} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div><label className="sr-p block mb-1">Actual</label><input name="current_password" type="password" className="w-full border rounded-md px-3 py-2" required /></div>
            <div><label className="sr-p block mb-1">Nueva</label><input name="new_password" type="password" className="w-full border rounded-md px-3 py-2" required /></div>
            <div><label className="sr-p block mb-1">Repetir</label><input name="confirm_password" type="password" className="w-full border rounded-md px-3 py-2" required /></div>
            <div className="col-span-full"><button className="sr-btn-primary" type="submit" disabled={busy}>Guardar</button></div>
          </form>
        </div>
      )}

      <div className="sr-card mb-6">
        <h2 className="sr-h2">Mi estado</h2>
        <p className="sr-p"><strong>Email:</strong> {me?.email}</p>
        <p className="sr-p"><strong>Estado:</strong> {profile?.user?.status || me?.status}</p>
        <p className="sr-p"><strong>Suscripción:</strong> {m.subscription_status || "—"}</p>
      </div>

      <div className="sr-card">
        <h2 className="sr-h2">Mi perfil profesional</h2>
        {!profile ? <p className="sr-p">Cargando…</p> : (
          <form onSubmit={handleProfileSave} className="grid grid-cols-1 gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className="sr-p block mb-1">Nombre completo</label><input className="w-full border rounded-md px-3 py-2" value={m.name || ""} onChange={e=>setProfile(p=>({...p, mediador:{...p.mediador, name:e.target.value}}))} /></div>
              <div><label className="sr-p block mb-1">Teléfono (privado)</label><input className="w-full border rounded-md px-3 py-2" value={m.telefono || ""} onChange={e=>setProfile(p=>({...p, mediador:{...p.mediador, telefono:e.target.value}}))} /></div>
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
                          setProfile(p=>{
                            const cur=new Set(p.mediador?.especialidad||[]);
                            if(e.target.checked) cur.add(tag); else cur.delete(tag);
                            return {...p, mediador:{...p.mediador, especialidad:Array.from(cur)}};
                          })
                        }} />
                        <span className="sr-p capitalize">{tag}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
              <div><label className="sr-p block mb-1">Web</label><input className="w-full border rounded-md px-3 py-2" value={m.web||""} onChange={e=>setProfile(p=>({...p, mediador:{...p.mediador, web:e.target.value}}))} /></div>
            </div>

            <div><label className="sr-p block mb-1">LinkedIn</label><input className="w-full border rounded-md px-3 py-2" value={m.linkedin||""} onChange={e=>setProfile(p=>({...p, mediador:{...p.mediador, linkedin:e.target.value}}))} /></div>

            <div><label className="sr-p block mb-1">Bio</label><textarea className="w-full border rounded-md px-3 py-2" rows={5} value={m.bio||""} onChange={e=>setProfile(p=>({...p, mediador:{...p.mediador, bio:e.target.value}}))} /></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="sr-p block mb-1">Foto (JPG/PNG)</label>
                <input type="file" accept="image/*" onChange={e=>e.target.files?.[0] && uploadFile(e.target.files[0],"photo")} />
                {m.photo_url && <div className="mt-2"><img src={m.photo_url} alt="Foto" style={{width:120,height:120,objectFit:"cover",borderRadius:8}} /></div>}
              </div>
              <div>
                <label className="sr-p block mb-1">CV (PDF)</label>
                <input type="file" accept="application/pdf" onChange={e=>e.target.files?.[0] && uploadFile(e.target.files[0],"cv")} />
                {m.cv_url && <div className="mt-2"><a className="sr-btn-secondary" href={m.cv_url} target="_blank" rel="noopener noreferrer">Ver CV</a></div>}
              </div>
            </div>

            <div><button className="sr-btn-primary" type="submit" disabled={busy}>Guardar cambios</button></div>
            {msg && <div className="sr-p" style={{color:"#16a34a"}}>{msg}</div>}
          </form>
        )}
      </div>
    </main>
  );
}
