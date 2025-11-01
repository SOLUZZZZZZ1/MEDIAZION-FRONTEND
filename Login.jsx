// src/pages/admin/Login.jsx — Login de administración (SPA)
import React, { useState } from "react";
import Seo from "../../components/Seo.jsx";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const nav = useNavigate();
  const [form, setForm] = useState({ user: "", pass: "" });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function onSubmit(e) {
    e.preventDefault();
    setBusy(true); setError("");
    try {
      // Aquí integrarías el login real (token, llamada al backend, etc.)
      // Por ahora, validamos que haya campos y navegamos al dashboard.
      if (!form.user || !form.pass) throw new Error("Completa usuario y contraseña");
      nav("/admin/dashboard");
    } catch (err) {
      setError(err.message || "No se pudo iniciar sesión");
    } finally { setBusy(false); }
  }

  return (
    <>
      <Seo title="Admin · Acceso" description="Acceso de administración MEDIAZION" canonical="https://mediazion.eu/admin" />
      <main className="sr-container py-12">
        <div className="sr-card" style={{ maxWidth: 520, margin: "0 auto" }}>
          <h1 className="sr-h1 mb-2">Panel de administración</h1>
          <p className="sr-p">Acceso restringido.</p>
          {error && <p className="sr-p" style={{ color:"#991b1b" }}>Error: {error}</p>}

          <form onSubmit={onSubmit}>
            <label className="sr-p block mb-1">Usuario</label>
            <input
              name="user"
              className="w-full border rounded-md px-3 py-2"
              value={form.user}
              onChange={onChange}
              autoComplete="username"
            />

            <label className="sr-p block mb-1 mt-4">Contraseña</label>
            <input
              name="pass"
              type="password"
              className="w-full border rounded-md px-3 py-2"
              value={form.pass}
              onChange={onChange}
              autoComplete="current-password"
            />

            <button className="sr-btn-primary mt-4" type="submit" disabled={busy}>
              {busy ? "Entrando..." : "Entrar"}
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
