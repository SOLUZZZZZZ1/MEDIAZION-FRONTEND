// src/pages/Inicio.jsx (fix: navegación SPA con <Link>)
import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";

export default function Inicio() {
  return (
    <>
      <Seo
        title="MEDIAZION · Centro de Mediación y Resolución de Conflictos"
        description="Soluciones profesionales, sin conflicto. Mediación civil, mercantil y familiar en toda España."
        canonical="https://mediazion.eu/"
      />

      <main
        className="min-h-[calc(100vh-80px)] flex items-center justify-center"
        style={{
          backgroundImage: "url('/marmol.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Bloque horizontal, centrado, claro y legible */}
        <div
          style={{
            backgroundColor: "rgba(255,255,255,0.82)",
            border: "1px solid rgba(0,0,0,0.06)",
            borderRadius: "24px",
            boxShadow: "0 10px 28px rgba(0,0,0,0.18)",
            padding: "36px 56px",
            width: "92%",
            maxWidth: "900px",
            textAlign: "center",
          }}
        >
          {/* Logo centrado y un poco más grande */}
          <img
            src="/logo.png"
            alt="MEDIAZION"
            style={{ width: 300, height: "auto", display: "block", margin: "0 auto 14px auto" }}
          />

          {/* Textos */}
          <h1 style={{ margin: 0, color: "#0f172a", fontWeight: 800, fontSize: "32px", letterSpacing: ".4px", lineHeight: 1.15 }}>
            MEDIAZION
          </h1>
          <p style={{ margin: "10px 0 6px 0", color: "#111111", fontSize: "20px", fontWeight: 700 }}>
            Soluciones profesionales, sin conflicto.
          </p>
          <p style={{ margin: 0, color: "#111111", fontSize: "16px" }}>
            <strong>Centro de Mediación y Resolución de Conflictos</strong>
          </p>

          {/* Botones (SPA) */}
          <div style={{ marginTop: 18, display: "flex", gap: 12, justifyContent: "center" }}>
            <Link
              to="/servicios"
              className="sr-btn-primary"
              style={{ background: "#1e88e5", color: "#fff", borderRadius: 9999, padding: "10px 16px", textDecoration: "none", fontWeight: 700 }}
            >
              Ver servicios
            </Link>
            <Link
              to="/contacto"
              className="sr-btn-secondary"
              style={{ background: "#eef2ff", color: "#0f172a", border: "1px solid rgba(15,23,42,.15)", borderRadius: 9999, padding: "10px 16px", textDecoration: "none", fontWeight: 700 }}
            >
              Contacto
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
