// src/pages/admin/Login.jsx
import React, { useState } from "react";

export default function AdminLogin(){
  const [token, setToken] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("admin_token", token.trim());
    window.location.href = "/admin/panel";
  };
  return (
    <main className="sr-container py-12">
      <h1 className="sr-h1">Acceso administración</h1>
      <form onSubmit={onSubmit} className="sr-card" style={{maxWidth:560}}>
        <label className="sr-p">Token</label>
        <input className="w-full border rounded-md px-3 py-2" value={token} onChange={e=>setToken(e.target.value)} placeholder="ADMIN_TOKEN" />
        <button className="sr-btn-primary mt-4" type="submit">Entrar</button>
      </form>
    </main>
  );
}
