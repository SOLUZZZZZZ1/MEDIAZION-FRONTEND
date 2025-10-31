// src/pages/admin/Dashboard.jsx
import React, { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE || "https://backend-api-mediazion-1.onrender.com";

export default function AdminDashboard() {
  const [tab, setTab] = useState("pending"); // pending | approved | rejected | all
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("ADMIN_TOKEN") || ""; // guarda tu token en /admin/login

  async function load() {
    setLoading(true);
    try {
      const u = new URL(API_BASE.replace(/\/$/,"") + "/admin/mediadores");
      if (tab && tab !== "all") u.searchParams.set("status", tab);

      const res = await fetch(u.toString(), {
        headers: { "Authorization": "Bearer " + token }
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
      setItems([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); /* eslint-disable-line */ }, [tab]);

  async function act(id, action) {
    try {
      const res = await fetch(API_BASE.replace(/\/$/,"") + `/admin/mediadores/${id}/${action}`, {
        method: "POST",
        headers: { "Authorization": "Bearer " + token }
      });
      if (!res.ok) throw new Error(await res.text());
      await load();
    } catch (e) {
      alert(e.message || "Error");
    }
  }

  return (
    <main className="sr-container py-12">
      <h1 className="sr-h1 mb-2">Panel de administración</h1>

      <div className="sr-card" style={{marginBottom: 12}}>
        <div style={{display:"flex", gap:8, flexWrap:"wrap"}}>
          {["pending","approved","rejected","all"].map(t => (
            <button
              key={t}
              className={t===tab ? "sr-btn-primary" : "sr-btn-secondary"}
              onClick={() => setTab(t)}
            >
              {t === "pending" ? "Pendientes" :
               t === "approved" ? "Aprobados" :
               t === "rejected" ? "Rechazados" : "Todos"}
            </button>
          ))}
          <button className="sr-btn-secondary" onClick={load} disabled={loading}>
            {loading ? "Cargando..." : "Refrescar"}
          </button>
        </div>
      </div>

      <section className="sr-grid-3">
        {items.length === 0 && (
          <div className="sr-card">Sin resultados</div>
        )}
        {items.map(m => (
          <article key={m.id} className="sr-card">
            <h3 className="sr-h3" style={{margin:0}}>{m.name || m.nombre || "—"}</h3>
            <p className="sr-p" style={{margin:"4px 0"}}>{m.email}</p>
            <p className="sr-p" style={{margin:"4px 0"}}>
              {m.provincia || "—"} · {m.especialidad || "—"}
            </p>
            <p className="sr-p" style={{margin:"4px 0"}}>Estado: <strong>{m.status || "—"}</strong></p>

            <div style={{display:"flex", gap:8, marginTop:8}}>
              <button className="sr-btn-primary" onClick={() => act(m.id, "approve")}>Aprobar</button>
              <button className="sr-btn-secondary" onClick={() => act(m.id, "reject")}>Rechazar</button>
              <button className="sr-btn-secondary" onClick={() => act(m.id, "toggle-subscriber")}>
                {m.is_subscriber ? "Quitar PRO" : "Marcar PRO"}
              </button>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
