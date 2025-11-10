// src/pages/PerfilMediador.jsx — Parche: ?tab=seguridad con scroll
import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Seo from "../components/Seo.jsx";

export default function PerfilMediador() {
  const location = useLocation();
  const segRef = useRef(null);

  const [oldPwd, setOldPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("tab") === "seguridad" && segRef.current) {
      segRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [location]);

  async function cambiar() {
    setMsg("");
    try {
      const email = localStorage.getItem("mediador_email");
      if (!email) throw new Error("No hay sesión activa.");
      const r = await fetch("/api/auth/change_password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, old_password: oldPwd, new_password: newPwd }),
      });
      const data = await r.json();
      if (!r.ok || !data?.ok) throw new Error(data?.detail || data?.message || "Error cambiando contraseña");
      setMsg("✅ Contraseña actualizada correctamente.");
      setOldPwd(""); setNewPwd("");
    } catch (e) {
      setMsg("❌ " + (e.message || "Error cambiando contraseña."));
    }
  }

  return (
    <>
      <Seo title="Perfil · Mediador" description="Gestión del perfil del mediador/a" />
      <main className="sr-container py-8" style={{minHeight:"calc(100vh - 160px)"}}>
        <h1 className="sr-h1">Mi Perfil</h1>

        {/* Bloque de seguridad con ref para foco */}
        <section ref={segRef} className="sr-card" style={{ maxWidth:900, margin:"16px auto" }}>
          <h3 className="sr-h3">Seguridad · Cambiar contraseña</h3>
          <div className="grid gap-3 mt-3" style={{maxWidth:520}}>
            <input
              className="sr-input"
              type="password"
              placeholder="Contraseña actual"
              value={oldPwd}
              onChange={(e)=>setOldPwd(e.target.value)}
            />
            <input
              className="sr-input"
              type="password"
              placeholder="Nueva contraseña"
              value={newPwd}
              onChange={(e)=>setNewPwd(e.target.value)}
            />
            <button className="sr-btn-primary" onClick={cambiar}>Cambiar contraseña</button>
            {msg && <p className="sr-small mt-1">{msg}</p>}
          </div>
        </section>
      </main>
    </>
  );
}
