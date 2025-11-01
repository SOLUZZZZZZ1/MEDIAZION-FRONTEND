// src/pages/admin/Dashboard.jsx — Dashboard de administración (SPA)
import React from "react";
import Seo from "../../components/Seo.jsx";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <>
      <Seo title="Admin · Dashboard" description="Administración MEDIAZION" canonical="https://mediazion.eu/admin/dashboard" />
      <main className="sr-container py-12">
        <div className="flex items-center justify-between mb-6">
          <h1 className="sr-h1">Dashboard Admin</h1>
          <Link to="/admin" className="sr-btn-secondary">Salir</Link>
        </div>

        <section className="sr-grid-3">
          <article className="sr-card">
            <h3 className="sr-h3">Salud del backend</h3>
            <p className="sr-p">Comprueba el estado de <code>/admin/health</code> con tu token.</p>
            <a className="sr-btn-secondary" href="https://backend-api-mediazion-1.onrender.com/admin/health" target="_blank" rel="noopener noreferrer">
              Abrir /admin/health
            </a>
          </article>

          <article className="sr-card">
            <h3 className="sr-h3">Mediadores</h3>
            <p className="sr-p">Revisar y aprobar altas.</p>
            <Link className="sr-btn-secondary" to="/mediadores/directorio">Ir al directorio</Link>
          </article>

          <article className="sr-card">
            <h3 className="sr-h3">Actualidad</h3>
            <p className="sr-p">Ver noticias cargadas por el backend.</p>
            <Link className="sr-btn-secondary" to="/actualidad">Ir a Actualidad</Link>
          </article>
        </section>
      </main>
    </>
  );
}
