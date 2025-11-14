// src/pages/PerfilMediador.jsx — Perfil PRO + subida de foto/CV + cambio de contraseña

import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Seo from "../components/Seo.jsx";

const LS_EMAIL = "mediador_email";

export default function PerfilMediador() {
  const location = useLocation();
  const navigate = useNavigate();
  const segRef = useRef(null);

  // Email de sesión
  const [email] = useState(localStorage.getItem(LS_EMAIL) || "");

  // Datos de perfil
  const [alias, setAlias] = useState("");
  const [bio, setBio] = useState("");
  const [website, setWebsite] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [cvUrl, setCvUrl] = useState("");
  const [msg, setMsg] = useState("");

  // Seguridad (cambio de contraseña)
  const [pwd, setPwd] = useState({ old_password: "", new_password: "" });

  // Si no hay sesión → ir a /acceso
  useEffect(() => {
    if (!email) {
      navigate("/acceso");
    }
  }, [email, navigate]);

  // Scroll a Seguridad si ?tab=seguridad
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("tab") === "seguridad" && segRef.current) {
      segRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [location]);

  // Cargar perfil existente
  useEffect(() => {
    if (!email) return;

    (async () => {
      try {
        const r = await fetch(`/api/perfil?email=${encodeURIComponent(email)}`);
        const data = await r.json();
        if (r.ok && data?.perfil) {
          setAlias(data.perfil.public_slug || "");
          setBio(data.perfil.bio || "");
          setWebsite(data.perfil.website || "");
          setPhotoUrl(data.perfil.photo_url || "");
          setCvUrl(data.perfil.cv_url || "");
        }
      } catch (e) {
        // suavizar: no mostramos error duro, solo dejamos el perfil vacío
        console.error("Error cargando perfil:", e);
      }
    })();
  }, [email]);

  async function saveProfile(e) {
    e?.preventDefault?.();
    if (!email) {
      setMsg("❌ No hay sesión activa.");
      return;
    }
    setMsg("");
    try {
      const r = await fetch("/api/perfil", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          public_slug: alias || null,
          bio,
          website,
          photo_url: photoUrl || null,
          cv_url: cvUrl || null,
        }),
      });
      const data = await r.json().catch(() => ({}));
      if (!r.ok || !data?.ok) {
        throw new Error(data?.detail || "No se pudo guardar el perfil");
      }
      setMsg("✅ Perfil guardado.");
    } catch (e) {
      setMsg("❌ " + (e.message || "Error guardando perfil"));
    }
  }

  async function uploadFile(kind, file) {
    if (!file) return;
    setMsg("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      const r = await fetch("/api/upload/file", {
        method: "POST",
        body: fd,
      });
      const data = await r.json().catch(() => ({}));
      if (!r.ok || !data?.ok || !data?.url) {
        throw new Error(data?.detail || data?.message || "No se pudo subir el archivo");
      }
      if (kind === "photo") setPhotoUrl(data.url);
      if (kind === "cv") setCvUrl(data.url);
      setMsg("✅ Archivo subido.");
    } catch (e) {
      setMsg("❌ " + (e.message || "Error subiendo archivo"));
    }
  }

  async function changePassword(e) {
    e?.preventDefault?.();
    if (!email) {
      setMsg("❌ No hay sesión activa.");
      return;
    }
    setMsg("");
    try {
      if (!pwd.old_password || !pwd.new_password) {
        throw new Error("Rellena ambas contraseñas");
      }
      const r = await fetch("/api/auth/change_password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          old_password: pwd.old_password,
          new_password: pwd.new_password,
        }),
      });
      const data = await r.json().catch(() => ({}));
      if (!r.ok || !data?.ok) {
        throw new Error(data?.message || data?.detail || "No se pudo cambiar la contraseña");
      }
      setPwd({ old_password: "", new_password: "" });
      setMsg("✅ Contraseña cambiada.");
    } catch (e) {
      setMsg("❌ " + (e.message || "Error cambiando contraseña"));
    }
  }

  if (!email) return null;

  return (
    <>
      <Seo
        title="Mi perfil · MEDIAZION"
        description="Gestiona tu perfil de mediador PRO: alias, bio, documentos y contraseña."
      />
      <main
        className="sr-container py-8"
        style={{
          minHeight: "calc(100vh - 160px)",
          background: "rgba(255,255,255,0.95)",
          borderRadius: 16,
          margin: "24px 0",
        }}
      >
        <h1 className="sr-h1">Mi perfil</h1>
        <p className="sr-p">
          Completa tu perfil. <b>No se mostrarán datos de contacto</b>; usa un{" "}
          <b>alias</b> público.
        </p>

        {/* PERFIL */}
        <form
          onSubmit={saveProfile}
          className="sr-card"
          style={{ maxWidth: 900, margin: "16px auto", display: "grid", gap: 12 }}
        >
          <label className="sr-label">Alias público (aparece en Directorio)</label>
          <input
            className="sr-input"
            value={alias}
            onChange={(e) => setAlias(e.target.value)}
            placeholder="p. ej. ramon-berengueras"
          />

          <label className="sr-label">Biografía / presentación (sin e-mail/teléfono)</label>
          <textarea
            className="sr-input"
            rows={5}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Experiencia, áreas de especialidad, enfoque de trabajo…"
          />

          <label className="sr-label">Web o portafolio (opcional)</label>
          <input
            className="sr-input"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            placeholder="https://…"
          />

          <div className="sr-card">
            <h3 className="sr-h3">Documentos</h3>
            <div style={{ display: "grid", gap: 12, gridTemplateColumns: "1fr 1fr" }}>
              <div>
                <label className="sr-label">Foto / Avatar</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => uploadFile("photo", e.target.files?.[0])}
                />
                {photoUrl && (
                  <div className="mt-2">
                    <img
                      src={photoUrl}
                      alt="Avatar"
                      style={{ height: 80, borderRadius: 8, objectFit: "cover" }}
                    />
                  </div>
                )}
              </div>
              <div>
                <label className="sr-label">Currículum (PDF / DOCX)</label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => uploadFile("cv", e.target.files?.[0])}
                />
                {cvUrl && (
                  <div className="mt-2">
                    <a
                      className="sr-btn-secondary"
                      href={cvUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Ver CV
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          <button className="sr-btn-primary" type="submit">
            Guardar perfil
          </button>
          {msg && (
            <p
              className="sr-p"
              style={{ color: msg.startsWith("✅") ? "#166534" : "#991b1b" }}
            >
              {msg}
            </p>
          )}
        </form>

        {/* SEGURIDAD */}
        <section
          ref={segRef}
          className="sr-card"
          style={{ maxWidth: 900, margin: "16px auto" }}
        >
          <h3 className="sr-h3">Seguridad · Cambiar contraseña</h3>
          <form
            onSubmit={changePassword}
            style={{ display: "grid", gap: 12, maxWidth: 520 }}
          >
            <input
              className="sr-input"
              type="password"
              placeholder="Contraseña actual"
              value={pwd.old_password}
              onChange={(e) =>
                setPwd((p) => ({ ...p, old_password: e.target.value }))
              }
            />
            <input
              className="sr-input"
              type="password"
              placeholder="Nueva contraseña"
              value={pwd.new_password}
              onChange={(e) =>
                setPwd((p) => ({ ...p, new_password: e.target.value }))
              }
            />
            <button className="sr-btn-secondary" type="submit">
              Actualizar contraseña
            </button>
          </form>
        </section>
      </main>
    </>
  );
}
