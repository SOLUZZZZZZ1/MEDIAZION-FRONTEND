// src/pages/LoginMediador.jsx — COMPLETO Y FINAL

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Seo from "../components/Seo.jsx";

export default function LoginMediador() {
  const nav = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const onChange = (e) =>
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  async function onSubmit(e) {
    e.preventDefault();
    setBusy(true);
    setError("");

    try {
      const r = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      const data = await r.json().catch(() => ({}));

      if (!r.ok || !data?.ok) {
        throw new Error(data?.detail || "Credenciales incorrectas");
      }

      // Guardar sesión
      localStorage.setItem("mediador_email", form.email.toLowerCase());

      // Comprobar estado
      const st = await fetch(
        `/api/mediadores/status?email=${encodeURIComponent(form.email)}`
      );
      const stData = await st.json();

      // Si no tiene PRO → activar trial automáticamente
      if (stData.subscription_status === "none") {
        await fetch(
          `/api/mediadores/set_trial?email=${encodeURIComponent(form.email)}`,
          { method: "POST" }
        );
      }

      nav("/panel-mediador");
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <Seo title="Acceso de mediadores · Mediazion" />
      <main
        className="sr-container py-12"
        style={{ backgroundImage: "url('/marmol.jpg')" }}
      >
        <h1 className="sr-h1 mb-2">Acceso mediadores</h1>
        <p className="sr-p">Introduce tu correo y contraseña.</p>

        <form
          onSubmit={onSubmit}
          className="sr-card"
          style={{ maxWidth: 520, margin: "0 auto" }}
        >
          <label className="sr-p block mb-1">Correo</label>
          <input
            className="sr-input"
            name="email"
            type="email"
            value={form.email}
            onChange={onChange}
            required
          />

          <label className="sr-p block mb-1 mt-4">Contraseña</label>
          <input
            className="sr-input"
            name="password"
            type="password"
            value={form.password}
            onChange={onChange}
            required
          />

          {error && (
            <p className="sr-p mt-2" style={{ color: "#991b1b" }}>
              {error}
            </p>
          )}

          <button
            className="sr-btn-primary mt-4"
            type="submit"
            disabled={busy}
          >
            {busy ? "Accediendo…" : "Entrar"}
          </button>
        </form>
      </main>
    </>
  );
}
