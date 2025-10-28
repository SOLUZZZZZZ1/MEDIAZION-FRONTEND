// src/pages/admin/Dashboard.jsx
import React, { useEffect, useState } from "react";

const API_BASE =
  import.meta.env.VITE_API_BASE || "https://backend-api-mediazion-1.onrender.com";

export default function AdminDashboard() {
  const [token] = useState(localStorage.getItem("ADMIN_TOKEN") || "");
  const [status, setStatus] = useState("pending"); // pending | approved | rejected | (vacío = todos)
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (!token) {
      window.location.href = "/admin";
      return;
    }
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const authHeaders = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  async function load() {
    try {
      setLoading(true);
      setMsg("");
      const qs = status ? `?status=${encodeURIComponent(status)}` : "";
      const r = await fetch(
        `${API_BASE.replace(/\/$/, "")}/admin/mediadores${qs}`,
        { headers: authHeaders }
      );
      if (!r.ok) throw new Error(await r.text());
      const data = await r.json();
      setItems(data);
    } catch (e) {
      setMsg(e.message || "Error cargando mediadores");
      setItems([]);
    } finally {
      setLoading(false);
    }
  }

  async function approve(id) {
    try {
      setMsg("");
      const r = await fetch(
        `${API_BASE.replace(/\/$/, "")}/admin/mediadores/${id}/approve`,
        { method: "POST", headers: authHeaders }
      );
      if (!r.ok) throw new Error(await r.text());
      await load();
      setMsg("Mediador aprobado.");
    } catch (e) {
      setMsg(e.message || "Error aprobando mediador");
    }
  }

  async function reject(id) {
    try {
      setMsg("");
      const r = await fetch(
        `${API_BASE.replace(/\/$/, "")}/admin/mediadores/${id}/reject`,
        { method: "POST", headers: authHeaders }
      );
      if (!r.ok) throw new Error(await r.text());
      await load();
      setMsg("Mediador rechazado.");
    } catch (e) {
      setMsg(e.message || "Error rechazando mediador");
    }
  }

  async function setSubscriber(id, value) {
    try {
      setMsg("");
      const r = await fetch(
        `${API_BASE.replace(/\/$/, "")}/admin/mediadores/${id}/subscriber`,
        {
          method: "POST",
          headers: authHeaders,
          body: JSON.stringify({ value: !!value }),
        }
      );
      if (!r.ok) throw new Error(await r.text());
      await load();
      setMsg(value ? "Marcado como suscriptor." : "Marcado como no suscriptor.");
    } catch (e) {
      setMsg(e.message || "Error actualizando suscriptor");
    }
  }

  function logout() {
    localStorage.removeItem("ADMIN_TOKEN");
    window.location.href = "/admin";
  }

  return (
    <main
      className="sr-container py-12"
      style={{
        backgroundImage: "url('/marmol.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="sr-row" style={{ justifyContent: "space-between" }}>
        <h1 className="sr-h1">Administración</h1>
        <div style={{ display: "flex", gap: 8 }}>
          <select
            className="border rounded-md px-3 py-2"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            title="Filtrar por estado"
          >
            <option value="pending">Pendientes</option>
            <option value="approved">Aprobados</option>
            <option value="rejected">Rechazados</option>
            <option value="">Todos</option>
          </select>
          <button className="sr-btn-secondary" onClick={load}>Refrescar</button>
          <button className="sr-btn-primary" onClick={logout}>Salir</button>
        </div>
      </div>

      {msg && <p className="sr-p mt-3" style={{ color: "#166534" }}>{msg}</p>}
      {loading && <p className="sr-p mt-3">Cargando…</p>}

      <section className="sr-card mt-6" style={{ overflowX: "auto" }}>
        <table className="w-full" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ textAlign: "left", borderBottom: "1px solid #e5e7eb" }}>
              <th className="sr-p">ID</th>
              <th className="sr-p">Nombre</th>
              <th className="sr-p">Email</th>
              <th className="sr-p">Estado</th>
              <th className="sr-p">Suscriptor</th>
              <th className="sr-p">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 && !loading && (
              <tr>
                <td colSpan={6} className="sr-p" style={{ padding: "10px 0" }}>
                  No hay resultados.
                </td>
              </tr>
            )}
            {items.map((it) => (
              <tr key={it.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                <td className="sr-p">{it.id}</td>
                <td className="sr-p">{it.name || "—"}</td>
                <td className="sr-p">{it.email}</td>
                <td className="sr-p">{it.status}</td>
                <td className="sr-p">{it.is_franquiciado ? "Sí" : "No"}</td>
                <td className="sr-p" style={{ display: "flex", gap: 8, flexWrap: "wrap", padding: "8px 0" }}>
                  <button className="sr-btn-primary" onClick={() => approve(it.id)}>Aprobar</button>
                  <button className="sr-btn-secondary" onClick={() => reject(it.id)}>Rechazar</button>
                  {it.is_franquiciado
                    ? <button className="sr-btn-secondary" onClick={() => setSubscriber(it.id, false)}>Quitar suscriptor</button>
                    : <button className="sr-btn-secondary" onClick={() => setSubscriber(it.id, true)}>Marcar suscriptor</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
