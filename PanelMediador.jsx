// src/pages/PanelMediador.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE =
  import.meta.env.VITE_API_BASE || "https://backend-api-mediazion-1.onrender.com";

function useAuthToken() {
  const key = "mediador_token";
  const [token, setToken] = useState(() => localStorage.getItem(key) || "");

  const save = (t) => {
    setToken(t || "");
    if (t) localStorage.setItem(key, t);
    else local storage.removeItem(key);
  };

  return [token, save];
}

export default function PanelMediador() {
  const [token, setToken] = useAuthToken();
  const [view, setView] = useState("loading"); // 'loading' | 'login' | 'dashboard'
  const [me, setMe] = useState(null);
  const [profile, setProfile] = useState(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const boot = async () => {
      if (!token) {
        setView("login");
        return;
      }
      try {
        const r = await fetch(`${API_BASE.replace(/\/$/, "")}/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!r.ok) throw new Error("Sesión no válida, vuelve a iniciar sesión");
        const data = await r.json();
        setMe(data);
        await fetchProfile();
        setView("dashboard");
      } catch (e) {
        console.warn(e);
        setView("login");
      }
    };
    boot();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const fetchProfile = async () => {
    const r = await fetch(`${API_BASE.replace(/\/$/, "")}/panel/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!r.ok) {
      console.warn("No se pudo cargar el perfil.");
      return;
    }
    const data = await r.json();
    setProfile(data);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value.trim();
    const password = e.target.password.value;
    setBusy(true);
    setMsg("");
    try {
      const r = await fetch(`${API_BASE.replace(/\/$/, "")}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data?.detail || "No se pudo iniciar sesión");
      setToken(data.token);
      setView("dashboard");
      setMe({ email, role: data.role, status: data.status, must_change_password: data.must_change_password });
      await fetchProfile();
      if (data.must_change_password) {
        setMsg("Por seguridad, actualiza tu contraseña.");
      }
    } catch (err) {
      setMsg(err.message || "Error de autenticación");
    } finally {
      setBusy(false);
    }
  };

  const handleLogout = () => {
    setToken("");
    setMe(null);
    setProfile(null);
    setView("login");
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    const current_password = e.target.current_password.value;
    const new_password = e.target.new_password.value;
    const confirm_password = e.target.confirm_password.value;
    if (!current_password || !new_password) {
      alert("Rellena las contraseñas");
      return;
    }
    if (new_password !== confirm_password) {
      alert("La nueva contraseña no coincide");
      return;
    }
    try {
      setBusy(true);
      const r = await fetch(`${API_BASE.replace(/\/$/, "")}/users/change_password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: me?.email,
          current_password,
          new_password,
        }),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data?.detail || "No se pudo actualizar la contraseña");
      alert("Contraseña actualizada correctamente");
    } catch (e2) {
      alert(e2.message || "Error al cambiar contraseña");
    } finally {
      setBusy(false);
    }
  };

  const handleProfileSave = async (e) => {
    e.preventDefault();
    setBusy(true);
    setMsg("");
    try {
      const payload = {
        name: profile?.mediador?.name || "",
        telefono: profile?.mediador?.telefono || "",
        bio: profile?.mediador?.bio || "",
        especialidad: profile?.mediador?.especialidad || [],
        web: profile?.mediador?.web || "",
        linkedin: profile?.mediador?.linkedin || "",
      };
      const r = await fetch(`${API_BASE.replace(/\/$/, "")}/panel/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data?.detail || "No se pudo guardar el perfil");
      setMsg("Perfil actualizado correctamente.");
      await fetchProfile();
    } catch (e2) {
      setMsg(e2.message || "Error al guardar perfil");
    } finally {
      setBusy(false);
    }
  };

  const uploadFile = async (file, kind) => {
    const fd = new FormData();
    fd.append("file", file);
    try {
      setBusy(true);
      const r = await fetch(`${API_BASE.replace(/\/$/, "")}/upload/file?kind=${encodeURIComponent(kind)}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data?.detail || "Error al subir archivo");
      await fetchProfile();
      alert(kind === "photo" ? "Foto actualizada" : "CV actualizado");
    } catch (e) {
      alert(e.message || "No se pudo subir el archivo");
    } finally {
      setBusy(false);
    }
  };

  if (view === "loading") {
    return (
      <main className="sr-container py-12">
        <p className="sr-p">Cargando…</p>
      </main>
    );
  }

  if (view === "login") {
    return (
      <main className="sr-container py-12">
        <div className="sr-card" style={{ maxWidth: 520 }}>
          <h1 className="sr-h1 mb-4">Acceso Mediadores</h1>
          {msg && <div className="sr-p" style={{ color: "#fca5a5" }}>{msg}</div>}
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
            ¿Aún no tienes cuenta? <a className="text-blue-300 underline" href="/mediadores/alta">Darte de alta</a>
          </div>
        </div>
      </main>
    );
  }

  // view === "dashboard"
  return (
    <main className="sr-container py-12">
      <div className="flex justify-between items-center mb-6">
        <h1 className="sr-h1">Área de Mediadores</h2>
        <div>
          <button className="sr-btn-secondary" onClick={handleLogout}>Cerrar sesión</button>
        </div>
      </div>

      {me?.must_change_password ? (
        <div className="sr-card mb-6" style={{ background: "#fff6e5" }}>
          <h2 className="sr-h2">Cambia tu contraseña</h2>
          <p className="sr-p">Por seguridad, actualiza tu contraseña temporal.</p>
          <form onSubmit={handleChangePassword} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="sr-p block mb-1">Contraseña actual</label>
              <input name="current_password" type="password" className="w-full border rounded-md px-3 py-2" required />
            </div>
            <div>
              <label className="sr-p block mb-1">Nueva contraseña</label>
              <input name="new_password" type="password" className="w-full border rounded-md px-3 py-2" required />
            </div>
            <div>
              <label className="sr-p block mb-1">Repetir nueva</label>
              <input name="confirm_password" type="password" className="w-full border rounded-md px-3 py-2" required />
            </div>
            <div className="col-span-full">
              <button className="sr-btn-primary" type="submit" disabled={busy}>
                Guardar contraseña
              </button>
            </div>
          </form>
        </div>
      ) : null}

      <div className="sr-card mb-6">
        <h2 className="sr-h2">Mi estado</h2>
        <p className="sr-p"><strong>Email:</strong> {me?.email}</p>
        <p className="sr-p"><strong>Rol:</strong> {me?.role}</p>
        <p className="sr-p"><strong>Estado:</strong> {profile?.user?.status || me?.status}</p>
        <p className="sr-p"><strong>Suscripción:</strong> {profile?.mediador?.subscription_status || "—"}</p>
      </div>

      <div className="sr-card">
        <h2 className="sr-h2">Mi perfil profesional</h2>
        {!profile ? (
          <p className="sr-p">Cargando perfil…</p>
        ) : (
          <form onSubmit={handleProfileSave} className="grid grid-cols-1 gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="sr-p block mb-1">Nombre completo</label>
                <input
                  className="w-full border rounded-md px-3 py-2"
                  value={profile?.mediador?.name || ""}
                  onChange={(e) =>
                    setProfile((p) => ({ ...p, mediador: { ...p.mediador, name: e.target.value } }))
                  }
                />
              </div>
              <div>
                <label className="sr-p block mb-1">Teléfono (privado)</label>
                <input
                  className="w-full border rounded-md px-3 py-2"
                  value={profile?.mediador?.telefono || ""}
                  onChange={(e) =>
                    setProfile((p) => ({ ...p, mediador: { ...p.mediador, telefono: e.target.value } }))
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="sr-p block mb-1">Especialidad</label>
                <div className="flex flex-wrap gap-2">
                  {["civil", "mercantil", "familiar", "comunitaria", "laboral"].map((tag) => {
                    const has = (profile?.mediador?.especialidad || []).includes(tag);
                    return (
                      <label key={tag} className="inline-flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={!!has}
                          onChange={(e) => {
                            setProfile((p) => {
                              const cur = new Set(p.mediador?.especialidad || []);
                              if (e.target.checked) cur.add(tag);
                              else cur.delete(tag);
                              return { ...p, mediador: { ...p.mediador, especialidad: Array.from(cur) } };
                            });
                          }}
                        />
                        <span className="sr-p capitalize">{tag}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
              <div>
                <label className="sr-p block mb-1">Web (opcional)</label>
                <input
                  className="w-full border rounded-md px-3 py-2"
                  value={profile?.mediador?.web || ""}
                  onChange={(e) =>
                    setProfile((p) => ({ ...p, mediador: { ...p.mediador, web: e.target.value } }))
                  }
                />
              </div>
            </div>

            <div>
              <label className="sr-p block mb-1">LinkedIn (opcional)</label>
              <input
                className="w-full border rounded-md px-3 py-2"
                value={profile?.mediador?.linkedin || ""}
                onChange={(e) =>
                  setProfile((p) => ({ ...p, mediador: { ...p.mediador, linkedin: e.target.value } }))
                }
              />
            </div>

            <div>
              <label className="sr-p block mb-1">Bio (pública)</label>
              <textarea
                className="w-full border rounded-md px-3 py-2"
                rows={5}
                value={profile?.mediador?.bio || ""}
                onChange={(e) =>
                  setProfile((p) => ({ ...p, mediador: { ...p.mediador, bio: e.target.value } }))
                }
              />
            </div>

            {/* Uploads */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="sr-p block mb-1">Foto (JPG/PNG)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files?.[0] && uploadFile(e.target.files[0], "photo")}
                />
                {profile?.mediador?.photo_url && (
                  <div className="mt-2">
                    <img
                      src={profile.mediador.photo_url}
                      alt="Foto de perfil"
                      style={{ width: 120, height: 120, objectFit: "cover", borderRadius: 8 }}
                    />
                  </div>
                )}
              </div>
              <div>
                <label className="sr-p block mb-1">CV (PDF)</label>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => e.target.files?.[0] && uploadFile(e.target.files[0], "cv")}
                />
                {profile?.mediador?.cv_url && (
                  <div className="mt-2">
                    <a className="sr-btn-secondary" href={profile.mediador.cv_url} target="_blank" rel="noopener noreferrer">
                      Ver CV
                    </a>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4">
              <button className="sr-btn-primary" type="submit">Guardar cambios</button>
            </div>

            {msg && <div className="sr-p" style={{ color: "#16a34a" }}>{msg}</div>}
          </form>
        </div>
      </div>
    </main>
  );
}
