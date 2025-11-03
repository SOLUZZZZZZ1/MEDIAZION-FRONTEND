// src/pages/Servicios.jsx — con Prólogo + enlaces SPA
import React from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";

export default function Servicios() {
  return (
    <>
      <Seo
        title="Servicios de mediación civil, mercantil y familiar · MEDIAZION"
        description="Mediación, conciliación y formación en gestión de conflictos. Civil, mercantil y familiar. Webinars y cursos."
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
          {/* PRÓLOGO (resumen editorial) */}
          <section className="sr-card" style={{ background: "rgba(255,255,255,0.95)", marginBottom: 16 }}>
            <h2 className="sr-h2">Prólogo · Manual de Mediación y MASC</h2>
            <p className="sr-p">
              <strong>MEDIAZION</strong> es un Centro de Mediación y Resolución de Conflictos.
              Unimos rigor jurídico y empatía profesional para alcanzar acuerdos sostenibles, documentados y verificables.
            </p>
            <p className="sr-p">
              <em>
                “Mediazion nace de la convicción de que los conflictos no son un problema, sino un
                activo estratégico cuando se gestionan con inteligencia. Transformamos tensiones en
                acuerdos, desacuerdos en decisiones y complejidad en oportunidad.”
              </em>
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
          <section className="sr-card" style={{ marginTop: 24, background:"rgba(255,255,255,0.98)" }}>
            <h2 className="sr-h2">Cursos de formación</h2>

            <div className="sr-card" style={{ marginTop: 12 }}>
              <h3 className="sr-h3">Mediación aplicada (20h)</h3>
              <p className="sr-p"><strong>Técnicas de escucha, gestión emocional y redacción de acuerdos. Online.</strong></p>
              <Link to="/servicios/curso/mediacion-aplicada-20h" className="text-blue-600 underline">
                Ver detalle
              </Link>
            </div>

            <div className="sr-card" style={{ marginTop: 18 }}>
              <h3 className="sr-h3">Negociación estratégica (12h)</h3>
              <p className="sr-p"><strong>Herramientas prácticas: preparación, comunicación, objeciones y cierre.</strong></p>
              <Link to="/servicios/curso/negociacion-estrategica-12h" className="text-blue-600 underline">
                Ver detalle
              </Link>
            </div>

            <div className="sr-card" style={{ marginTop: 18 }}>
              <h3 className="sr-h3">Compliance y resolución temprana (8h)</h3>
              <p className="sr-p"><strong>Integra la gestión de conflictos en programas de cumplimiento.</strong></p>
              <Link to="/servicios/curso/compliance-resolucion-8h" className="text-blue-600 underline">
                Ver detalle
              </Link>
            </div>
          </section>

          {/* WEBINARS */}
          <section className="sr-card" style={{ marginTop: 24, background:"rgba(255,255,255,0.98)" }}>
            <h2 className="sr-h2">Webinars</h2>

            <div className="sr-card" style={{ marginTop: 12 }}>
              <h3 className="sr-h3">Clínica de casos civiles</h3>
              <p className="sr-p"><strong>Buenas prácticas en mediación vecinal y familiar. 60 minutos.</strong></p>
              <Link to="/servicios/webinar/clinica-casos-civiles" className="text-blue-600 underline">
                Ver detalle
              </Link>
            </div>

            <div className="sr-card" style={{ marginTop: 18 }}>
              <h3 className="sr-h3">Mediación mercantil hoy</h3>
              <p className="sr-p"><strong>Tendencias en la gestión de conflictos entre empresas. 45 minutos.</strong></p>
              <Link to="/servicios/webinar/mediacion-mercantil-hoy" className="text-blue-600 underline">
                Ver detalle
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
