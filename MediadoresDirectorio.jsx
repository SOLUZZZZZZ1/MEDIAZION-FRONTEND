// src/pages/MediadoresDirectorio.jsx — Directorio funcional y profesional

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";

export default function MediadoresDirectorio() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [msg, setMsg] = useState("");

  async function cargarListado(busqueda = "") {
    setLoading(true);
    setMsg("");

    try {
      const url = busqueda.trim()
        ? `/api/mediadores/public?q=${encodeURIComponent(busqueda)}`
        : `/api/mediadores/public`;

      const r = await fetch(url);
      const data = await r.json();

      if (!r.ok || !data?.ok) {
        throw new Error(data?.detail || "No se pudo cargar el directorio");
      }

      setItems(data.items || []);
    } catch (e) {
      setMsg("❌ " + (e.message || "Error cargando el directorio"));
      setItems([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    cargarListado();
  }, []);

  function buscar(e) {
    e.preventDefault();
    cargarListado(q);
  }

  return (
    <>
      <Seo
        title="Directorio de Mediadores · Mediazion"
        description="Encuentra mediadores activos según su alias, especialidad y provincia."
      />

      <main className="sr-container py-10">
        <h1 className="sr-h1">Directorio de Mediadores</h1>
        <p className="sr-p">
          Consulta mediadores activos en Mediazion. Solo se muestran perfiles completados.
        </p>

        {/* BUSCADOR */}
        <form onSubmit={buscar} className="sr-card mt-4" style={{ maxWidth: 600 }}>
          <input
            type="text"
            className="sr-input w-full"
            placeholder="Buscar por nombre, alias o bio…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <button className="sr-btn-primary mt-3">Buscar</button>
        </form>

        {msg && (
          <p className="sr-small mt-4" style={{ color: "#991B1B" }}>
            {msg}
          </p>
        )}

        {/* LISTADO */}
        {loading ? (
          <p className="sr-p mt-6">Cargando mediadores…</p>
        ) : items.length === 0 ? (
          <p className="sr-p mt-6">No hay mediadores disponibles.</p>
        ) : (
          <section className="grid gap-4 mt-6 md:grid-cols-2 lg:grid-cols-3">
            {items.map((m) => (
              <article key={m.id} className="sr-card">
                <h3 className="sr-h3 mb-0">{m.name}</h3>
                <p className="sr-small text-zinc-600 mb-2">
                  {m.provincia} · {m.especialidad}
                </p>

                {m.photo_url && (
                  <img
                    src={m.photo_url}
                    alt="Avatar"
                    style={{
                      width: 90,
                      height: 90,
                      objectFit: "cover",
                      borderRadius: "50%",
                      marginBottom: 10,
                    }}
                  />
                )}

                <p className="sr-p whitespace-pre-wrap">{m.bio}</p>

                {/* Enlace a perfil público (cuando se active) */}
                {m.public_slug && (
                  <Link className="sr-btn-secondary mt-3 inline-block" to="#">
                    Ver perfil público (pronto)
                  </Link>
                )}
              </article>
            ))}
          </section>
        )}
      </main>
    </>
  );
}
