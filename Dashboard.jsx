// src/pages/admin/Dashboard.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Seo from "../../components/Seo.jsx";

const API_BASE = import.meta.env.VITE_API_BASE || "https://backend-api-mediazion-1.onrender.com";

export default function AdminDashboard(){
  const nav = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("admin_token") || "");
  const [tab, setTab] = useState("pending"); // pending | approved | rejected
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(()=>{ if(!token) nav("/admin"); else load(); }, [tab, token]);

  async function load(){
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE.replace(/\\/$/,"")}/admin/mediadores?status=${tab}`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if(res.status === 401){ nav("/admin"); return; }
      const data = await res.json();
      setRows(data);
    } catch(e){ console.error(e); }
    finally { setLoading(false); }
  }

  async function doAction(id, action){
    try {
      const res = await fetch(`${API_BASE.replace(/\\/$/,"")}/admin/mediadores/${id}/${action}`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` }
      });
      if(res.ok){
        await load();
      } else {
        alert("No se pudo completar la operación");
      }
    } catch(e){ console.error(e); }
  }

  return (
    <main className="sr-container py-12" style={{backgroundImage:"url('/marmol.jpg')",backgroundSize:"cover"}}>
      <Seo title="Panel Admin · MEDIAZION" />
      <h1 className="sr-h1">Panel de Administración</h1>

      <div className="sr-card" style={{marginBottom:16}}>
        <div style={{display:"flex", gap:8}}>
          {["pending","approved","rejected"].map(s => (
            <button key={s} className={`sr-btn-${tab===s?"primary":"secondary"}`} onClick={()=>setTab(s)}>
              {s === "pending" ? "Pendientes" : s==="approved" ? "Aprobados" : "Rechazados"}
            </button>
          ))}
          <div style={{marginLeft:"auto"}}>
            <button className="sr-btn-secondary" onClick={() => {localStorage.removeItem("admin_token"); nav("/admin");}}>
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>

      {loading && <div className="sr-p">Cargando…</div>}

      <div className="sr-grid-3">
        {rows.map(r => (
          <div key={r.id} className="sr-card">
            <h3 className="sr-h3">{r.name}</h3>
            <p className="sr-p" style={{margin:0}}>{r.email}</p>
            <p className="sr-p" style={{margin:0}}><strong>Provincia:</strong> {r.provincia || "—"}</p>
            <p className="sr-p" style={{margin:0}}><strong>Especialidad:</strong> {r.especialidad || "—"}</p>
            <p className="sr-p" style={{marginTop:8}}><strong>Estado:</strong> {r.status}</p>

            {tab === "pending" && (
              <div style={{display:"flex", gap:8, marginTop:8}}>
                <button className="sr-btn-primary" onClick={()=>doAction(r.id, "aprobar")}>Aprobar</button>
                <button className="sr-btn-secondary" onClick={()=>doAction(r.id, "rechazar")}>Rechazar</button>
              </div>
            )}
          </div>
        ))}
        {(!loading && rows.length === 0) && <div className="sr-card">No hay registros.</div>}
      </div>
    </main>
  );
}
