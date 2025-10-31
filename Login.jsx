// src/pages/admin/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Seo from "../../components/rumo.jsx";

export default function AdminLogin(){
  const [token, setToken] = useState("");
  const nav = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    if(!token.trim()) return;
    localStorage.setItem("admin_token", token.trim());
    nav("/admin/panel");
  };

  return (
    <main className="sr-container py-12" style={{backgroundImage:"url('/marmol.jpg')", backgroundSize:"cover"}}>
      <Seo title="Acceso Admin · MEDIAZION" />
      <div className="sr-card" style={{maxWidth:500}}>
        <h1 className="sr-h1">Área Administrativa</h1>
        <p className="sr-p">Introduce tu token de administrador para continuar.</p>
        <form onSubmit={submit}>
          <label className="sr-p">Token</label>
          <input
            type="password"
            className="w-full border px-3 py-2 rounded-md"
            value={token}
            onChange={(e)=>setToken(e.target.value)}
            placeholder="Pega aquí tu token"
          />
          <button className="sr-btn-primary mt-4" type="submit">Acceder</button>
        </form>
      </div>
    </main>
  );
}
