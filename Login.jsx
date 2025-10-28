// src/pages/admin/Login.jsx
import React, { useState, useEffect } from "react";

const API_BASE =
  import.meta.env.VITE_API_BASE || "https://backend-api-mediazion-1.onrender.com";

export default function AdminLogin() {
  const [token, setToken] = useState(localStorage.getItem("ADMIN_TOKEN") || "");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Si ya hay token, ir al panel
    if (localStorage.getItem("ADMIN_TOKEN")) {
      window.location.href = "/admin/panel";
    }
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!token.trim()) {
      alert("Introduce un token de administración.");
      return;
    }
    localStorage.setItem("ADMIN_TOKEN", token.trim());
    setSaved(true);
    setTimeout(() => (window.location.href = "/admin/panel"), 400);
  };

  const onReset = () => {
    localStorage.removeItem("ADMIN_TOKEN");
    setToken("");
    alert("Token borrado de este navegador.");
  };

  return (
    <main
      className="sr-container py-12"
      style={{
        backgroundImage: "url('/marmol.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 className="sr-h1 mb-4">Acceso Administración</h1>

      <form onSubmit={onSubmit} className="sr-card" style={{ maxWidth: 680 }}>
        <p className="sr-p">
          Introduce el <strong>token de administración</strong> para acceder al panel. Este token
          se define en el backend (Render) como <code>ADMIN_TOKEN</code>.
        </p>

        <label className="sr-p mt-4">Token (Bearer)</label>
        <input
          className="w-full border rounded-md px-3 py-2"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="ej: sk_admin_XXXXXXXX"
        />

        <div className="mt-4" style={{ display: "flex", gap: 12 }}>
          <button className="sr-btn-primary" type="submit">
            Entrar
          </button>
          <button className="sr-btn-secondary" type="button" onClick={onReset}>
            Borrar token
          </button>
          {saved && <span style={{ color: "#166534" }}>Guardado, entrando…</span>}
        </div>

        <p className="sr-p mt-4">
          <strong>Backend:</strong> {API_BASE}
        </p>
      </form>
    </main>
  );
}
