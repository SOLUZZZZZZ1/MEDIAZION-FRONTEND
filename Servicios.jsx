// src/pages/Servicios.jsx — con Prólogo + enlaces SPA
import React from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";

export default function Servicios() {
  return (
    <>
      <Seo
        title="Servicios de mediación civil, mercantil y familiar · MEDIAZION"
        description="Mediación, conciliación y formación en gestión de conflictos. Civil, mercantil y familiar. Webinars y cursos con descuento para mediadores."
        canonical="https://mediazion.eu/servicios"
      />
      <main
        className="min-h-[calc(100vh-80px)]"
        style={{
          backgroundImage: "url('/marmol.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          padding: "40px 20px",
        }}
      >
        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            background: "rgba(255,255,255,0.9)",
            borderRadius: "16px",
            padding: "30px 30px 24px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
            border: "1px solid rgba(0,0,0,0.08)",
            color: "#0f172a",
          }}
        >
          {/* PRÓLOGO */}
          <section className="sr-card" style={{ background: "rgba(255,255,255,0.95)", marginBottom: 16 }}>
            <h2 className="sr-h2">Prólogo · Manual de Mediación y MASC</h2>
            <p className="sr-p">
              <strong>MEDIAZION</strong> es un Centro de Mediación y Resolución de Conflictos.
              Unimos rigor jurídico y empatía profesional para alcanzar acuerdos sostenibles, documentados y verificables.
            </p>
            <p className="sr-p">
              “<em>
                Mediazion nace de la convicción de que los conflictos no son un problema, sino un
                activo estratégico cuando se gestionan con inteligencia. Transformamos tensiones en
                acuerdos, desacuerdos en decisiones y complejidad en oportunidad.
              </em>”
            </p>
            <p className="sr-p" style={{ marginTop: 8 }}>
              — <strong>Mario Rondán Braida</strong><br/>Director de <strong>MEDIAZION</strong>
            </p>
          </section>

          <h1 style={{ margin: 0, fontSize: "28px", fontWeight: 800 }}>Servicios</h1>
          <p style={{ marginTop: "10px", fontSize: "18px" }}>
            Intervenimos en ámbitos civiles y mercantiles, tanto preventivos como de resolución.
          </p>

          <div style={{ marginTop: "24px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "6px" }}>Mediación civil</h2>
            <p style={{ marginTop: 0 }}>
              <strong>Conflictos vecinales, arrendamientos, responsabilidad civil, herencias y familia.</strong>
            </p>
          </div>

          <div style={{ marginTop: "18px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "6px" }}>Mediación mercantil</h2>
            <p style={{ marginTop: 0 }}>
              <strong>Disputas societarias, incumplimientos contractuales, proveedores y clientes.</strong>
            </p>
          </div>

          {/* CURSOS */}
          <div style={{ marginTop: "24px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "6px" }}>Cursos de formación</h2>

            <h3 style={{ margin: "12px 0 6px 0", fontSize: "18px", fontWeight: 700 }}>
              Mediación aplicada (20h)
            </h3>
            <p style={{ marginTop: 0 }}>
              <strong>Técnicas de escucha, gestión emocional y redacción de acuerdos. Modalidad online.</strong>
            </p>
            <Link to="/servicios/curso/mediacion-aplicada-20h" style={{ color: "#1e88e5", textDecoration: "none", fontWeight: 700 }}>
              Ver detalle
            </Link>

            <h3 style={{ margin: "18px 0 6px 0", fontSize: "18px", font
