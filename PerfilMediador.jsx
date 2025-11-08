// src/pages/PerfilMediador.jsx
import React, { useEffect, useState } from "react";
import Seo from "../components/Seo.jsx";
import NavbarPanel from "../components/NavbarPanel.jsx";

const LS_EMAIL = "mediador_email";
const LS_TOKEN = "mediador_token";

export default function PerfilMediador() {
  const [email, setEmail] = useState(localStorage.getItem(LS_EMAIL) || "");
  const [aliasSlug, setAliasSlug] = useState("");
  const [bio, setBio] = useState("");
  const [website, setWebsite] = useState("");

  const [avatarUrl, setAvatarUrl] = useState("");
  const [cvUrl, setCvUrl] = useState("");
  const [msg, setMsg] = useState("");

  // cambio de contraseña
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [changing, setChanging] = useState(false);

  useEffect(() => {
    async function load() {
      if (!email) return;
      try {
        const r = await fetch(`/api/perfil?email=${encodeURIComponent(email)}`);
        const data = await r.json();
        if (r.ok && data?.ok && data?.perfil) {
          const p = data.perfil;
          setAliasSlug(p.public_slug || "");
          setBio(p.bio || "");
          setWebsite(p.website || "");
        }
      } catch {}
    }
    load();
  }, [email]);

  function onLogout() {
    localStorage.removeItem(LS_TOKEN);
    localStorage.removeItem(LS_EMAIL);
    location.href = "/panel-mediador?logout=1";
  }

  async function savePerfil() {
    setMsg("");
    try {
      if (!email) throw new Error("Sin email de sesión");
      const r = await fetch("/api/perfil", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          public_slug: aliasSlug || null,
          bio: buildBioWithLinks(bio, avatarUrl, cvUrl),
          website: website || null
        })
      });
      const data = await r.json();
      if (!r.ok || !data?.ok) throw new Error(data?.detail || "No se pudo guardar el perfil");
      setMsg("Perfil actualizado correctamente.");
    } catch (e) {
      setMsg("Error: " + (e.message || "desconocido"));
    }
  }

  function buildBioWithLinks(originalBio, avatar, cv) {
    // No guardamos contacto; si hay ficheros, añadimos enlaces al final de la bio.
    let out = (originalBio || "").trim();
    const extra = [];
    if (avatar) extra.push(`Avatar: ${location.origin}${avatar}`);
    if (cv)     extra.push(`Currículum: ${location.origin}${cv}`);
    if (extra.length) {
      out += (out ? "\n\n" : "") + extra.join("\n");
    }
    return out;
  }

  async function uploadFile(kind, file) {
    setMsg("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      const r = await fetch("/api/upload/file", { method: "POST", body: fd });
      const data = await r.json();
      if (!r.ok || !data?.ok) throw new Error(data?.detail || "No se pudo subir el archivo");
      if (kind === "avatar") setAvatarUrl(data.url);
      if (kind === "cv") setCvUrl(data.url);
      setMsg("Archivo subido correctamente.");
    } catch (e) {
      setMsg("Error subiendo archivo: " + (e.message || "desconocido"));
    }
  }

  async function changePassword() {
    setChanging(true);
    setMsg("");
    try {
      const r = await fetch("/api/auth/change_password", {
        method: "POST",
        headers: { "Content-Type":"application/json" },
        body: JSON.stringify({ email, old_password: oldPass, new_password: newPass })
      });
      const data = await r.json().catch(()=> ({}));
      if (!r.ok || !data?.ok) {
        // Si aún no existe el endpoint, informamos.
        const d = data?.detail || "Endpoint /api/auth/change_password pendiente en backend";
        throw new Error(d);
      }
      setOldPass(""); setNewPass("");
      setMsg("Contraseña cambiada correctamente.");
    } catch (e) {
      setMsg("Error: " + (e.message || "desconocido"));
    } finally {
      setChanging(false);
    }
  }

  return (
    <>
      <Seo
        title="Perfil del Mediador · MEDIAZION"
        description="Edita tu alias público, bio y sube tu currículum. Cambia tu contraseña."
        canonical="https://mediazion.eu/panel-mediador/perfil"
      />
      <NavbarPanel onLogout={onLogout} />

      <main className="sr-container py-8"
        style={{ minHeight:"calc(100vh - 160px)", background:"rgba(255,255,255,0.95)", borderRadius:16, margin:"24px 0" }}>

        <section className="sr-card" style={{ maxWidth: 980, margin:"0 auto" }}>
          <h1 className="sr-h1">Perfil del Mediador</h1>
          <p className="sr-p">Tu perfil público mostrará <b>alias</b>, <b>especialidad/bio</b> y <b>provincia</b>. <u>Sin datos de contacto</u>. Para contactar, la gente escribirá a MEDIAZION.</p>

          <div className="grid gap-4 md:grid-cols-2 mt-4">
            <div className="rounded-2xl border p-4 bg-white">
              <h3 className="sr-h3">Datos públicos</h3>
              <label className="sr-label mt-2">Alias público (slug)</label>
              <input className="sr-input" value={aliasSlug} onChange={e=>setAliasSlug(e.target.value)} placeholder="ej.: ramon-berengueras" />
              <label className="sr-label mt-2">Bio (sin contacto)</label>
              <textarea className="sr-input" rows={6} value={bio} onChange={e=>setBio(e.target.value)} placeholder="Tu especialidad, método de trabajo, experiencia (sin email/teléfono)…" />
              <label className="sr-label mt-2">Web (opcional)</label>
              <input className="sr-input" value={website} onChange={e=>setWebsite(e.target.value)} placeholder="https://…" />
              <button className="sr-btn-primary mt-3" onClick={savePerfil}>Guardar perfil</button>
            </div>

            <div className="rounded-2xl border p-4 bg-white">
              <h3 className="sr-h3">Subir documentos</h3>
              <p className="sr-small">Se subirán a <code>/uploads</code> (servidos por el backend).</p>
              <div className="mt-2">
                <label className="sr-label">Avatar (JPG/PNG)</label>
                <input type="file" accept="image/*" onChange={e=>e.target.files[0] && uploadFile("avatar", e.target.files[0])} />
                {avatarUrl && <p className="sr-small mt-1">Subido: <code>{avatarUrl}</code></p>}
              </div>
              <div className="mt-3">
                <label className="sr-label">Currículum (PDF/DOCX)</label>
                <input type="file" accept=".pdf,.doc,.docx" onChange={e=>e.target.files[0] && uploadFile("cv", e.target.files[0])} />
                {cvUrl && <p className="sr-small mt-1">Subido: <code>{cvUrl}</code></p>}
              </div>
              <p className="sr-small mt-2">
                Nota: por ahora guardamos los enlaces dentro de tu <b>bio</b>.  
                Si quieres, en una migración posterior añadimos columnas <code>avatar_url</code> y <code>cv_url</code> para guardarlos separados.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border p-4 bg-white mt-4">
            <h3 className="sr-h3">Cambiar contraseña</h3>
            <div className="grid gap-3 md:grid-cols-2">
              <div>
                <label className="sr-label">Contraseña actual</label>
                <input className="sr-input" type="password" value={oldPass} onChange={e=>setOldPass(e.target.value)} />
              </div>
              <div>
                <label className="sr-label">Contraseña nueva</label>
                <input className="sr-input" type="password" value={newPass} onChange={e=>setNewPass(e.target.value)} />
              </div>
            </div>
            <button className="sr-btn-secondary mt-3" onClick={changePassword} disabled={changing || !oldPass || !newPass}>
              {changing ? "Cambiando…" : "Actualizar contraseña"}
            </button>
          </div>

          {msg && <p className="sr-p mt-4" style={{ color: msg.startsWith("Error") ? "#991b1b" : "#166534" }}>{msg}</p>}
        </section>
      </main>
    </>
  );
}
