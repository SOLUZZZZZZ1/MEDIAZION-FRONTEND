// src/pages/Servicios.jsx
export default function Servicios() {
  return (
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

        <div style={{ marginTop: "18px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "6px" }}>Formación y prevención</h2>
          <p style={{ marginTop: 0 }}>
            <strong>Cultura del acuerdo, negociación y resolución temprana de conflictos.</strong>
          </p>
        </div>

        <div style={{ marginTop: "24px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "6px" }}>Cursos de formación</h2>

          <h3 style={{ margin: "12px 0 6px 0", fontSize: "18px", fontWeight: 700 }}>Mediación aplicada (20h)</h3>
          <p style={{ marginTop: 0 }}>
            <strong>Técnicas de escucha, gestión emocional y redacción de acuerdos. Modalidad online.</strong>
          </p>
          <a href="/course/mediacion-aplicada" style={{ color: "#1e88e5", textDecoration: "none", fontWeight: 700 }}>
            Ver detalle
          </a>

          <h3 style={{ margin: "18px 0 6px 0", fontSize: "18px", fontWeight: 700 }}>Negociación estratégica (12h)</h3>
          <p style={{ marginTop: 0 }}>
            <strong>Herramientas prácticas para contextos reales: preparación, comunicación, objeciones y cierre.</strong>
          </p>
          <a href="/course/negociacion-estrategica" style={{ color: "#1e88e5", textDecoration: "none", fontWeight: 700 }}>
            Ver detalle
          </a>

          <h3 style={{ margin: "18px 0 6px 0", fontSize: "18px", fontWeight: 700 }}>
            Compliance y resolución temprana (8h)
          </h3>
          <p style={{ marginTop: 0 }}>
            <strong>Integrar la gestión de conflictos en los programas de cumplimiento. Enfoque práctico.</strong>
          </p>
          <a href="/course/compliance-resolucion-temprana" style={{ color: "#1e88e5", textDecoration: "none", fontWeight: 700 }}>
            Ver detalle
          </a>
        </div>

        <div style={{ marginTop: "24px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "6px" }}>Webinars</h2>

          <h3 style={{ margin: "12px 0 6px 0", fontSize: "18px", fontWeight: 700 }}>Clínica de casos civiles</h3>
          <p style={{ marginTop: 0 }}>
            <strong>Buenas prácticas en mediación vecinal y familiar. Duración: 60 minutos.</strong>
          </p>
          <a href="/webinar/clinica-casos-civiles" style={{ color: "#1e88e5", textDecoration: "none", fontWeight: 700 }}>
            Ver detalle
          </a>

          <h3 style={{ margin: "18px 0 6px 0", fontSize: "18px", fontWeight: 700 }}>Mediación mercantil hoy</h3>
          <p style={{ marginTop: 0 }}>
            <strong>Tendencias en la gestión de conflictos entre empresas y en la contratación. 45 minutos.</strong>
          </p>
          <a href="/webinar/mediacion-mercantil-hoy" style={{ color: "#1e88e5", textDecoration: "none", fontWeight: 700 }}>
            Ver detalle
          </a>

          <h3 style={{ margin: "18px 0 6px 0", fontSize: "18px", fontWeight: 700 }}>ADR &amp; Compliance</h3>
          <p style={{ marginTop: 0 }}>
            <strong>Mediación en el mapa de riesgos y en los protocolos de cumplimiento normativo. 45 minutos.</strong>
          </p>
          <a href="/webinar/adr-compliance" style={{ color: "#1e88e5", textDecoration: "none", fontWeight: 700 }}>
            Ver detalle
          </a>
        </div>

        {/* Pie de página local (si lo quieres visible en esta vista) */}
        <div style={{ marginTop: 24, color: "#ffffff" }}>
          <div
            style={{
              backgroundColor: "rgba(0,0,0,0.35)",
              borderRadius: "12px",
              padding: "10px 16px",
              display: "inline-block",
            }}
          >
            <div>© 2025 <strong>MEDIAZION</strong> · Centro de Mediación y Resolución de Conflictos</div>
            <a href="/legal" style={{ color: "#fff", marginLeft: 8, textDecoration: "underline" }}>
              Aviso legal
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
