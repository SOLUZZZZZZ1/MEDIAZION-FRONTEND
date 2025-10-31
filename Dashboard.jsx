// src/pages/admin/Dashboard.jsx
import React, { useEffect, useState } from "react";
const API_BASE = import.meta.env.VITE_API_BASE || "https://backend-api-mediazion-1.onrender.com";

export default function AdminDashboard(){
  const [tab, setTab] = useState("pending");
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("admin_token") || "";

  async function load(){
    setLoading(true);
    try {
      const url = `${API_BASE.replace(/\/$/,"")}/admin/mediadores?status=${encodeURIComponent(tab)}`;
      const res = await fetch(url, { headers: { "Authorization": `Bearer ${token}` }});
      const data = await res.json();
      setRows(Array.isArray(data) ? data : []);
    } catch {
      setRows([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(()=>{ load(); /* on mount */ }, [tab]);

  async function act(mid, path){
    const url = `${API_BASE.replace(/\/$/,"")}/admin/mediadores/${mid}/${path}`;
    await fetch(url, { method:"POST", headers:{ "Authorization": `Bearer ${token}` }});
    load();
  }

  return (
    <main className="sr-container py-12">
      <h1 className="sr-h1">Panel administración</h1>
      <div className="sr-card" style={{marginBottom:16}}>
        <button className={`sr-btn-secondary ${tab==="pending"?"!bg-blue-100":""}`} onClick={()=>setTab("pending")}>Pendientes</button>
        <button className={`sr-btn-secondary ${tab==="approved"?"!bg-blue-100":""}`} onClick={()=>setTab("approved")} style={{marginLeft:8}}>Aprobados</button>
        <button className={`sr-btn-secondary ${tab==="rejected"?"!bg-blue-100":""}`} onClick={()=>setTab("rejected")} style={{marginLeft:8}}>Rechazados</button>
      </div>

      {loading && <p className="sr-p">Cargando…</p>}

      <section className="sr-grid-3">
        {rows.map(r=>(
          <article key={r.id} className="sr-card">
            <h3 className="sr-h3" style={{margin:0}}>{r.name}</h3>
            <p className="sr-p" style={{margin:0}}>{r.email}</p>
            <p className="sr-p" style={{margin:0}}>Estado: <strong>{r.status}</strong></p>
            <div style={{display:"flex", gap:8, marginTop:8}}>
              <button className="sr-btn-primary" onClick={()=>act(r.id, "approve")}>Aprobar</button>
              <button className="sr-btn-secondary" onClick={()=>act(r.id, "reject")}>Rechazar</button>
              <button className="sr-btn-secondary" onClick={()=>act(r.id, "toggle-subscriber")}>Toggle Suscriptor</button>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
