// src/pages/Inicio.jsx
export default function Inicio() {
  return (
    <main
      className="min-h-[calc(100vh-80px)] flex items-center justify-center"
      style={{
        backgroundImage: "url('/marmol.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Bloque HORIZONTAL, más claro y translúcido */}
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.18)", // más claro que el negro, mayor transparencia
          backdropFilter: "blur(2px)",
          WebkitBackdropFilter: "blur(2px)",
          border: "1px solid rgba(255,255,255,0.35)",
          borderRadius: "20px",
          padding: "28px 64px",          // proporción horizontal
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          maxWidth: "980px",
          width: "90%",
          boxShadow: "0 10px 30px rgba(0,0,0,.18)",
        }}
      >
        {/* Logo centrado */}
        <img
          src="/logo.png"
          alt="MEDIAZION"
          style={{ width: 260, height: "auto", marginBottom: 16 }}
        />

        {/* Título y subtítulos en BLANCO */}
        <h1
          style={{
            margin: 0,
            color: "#ffffff",
            fontWeight: 800,
            fontSize: "34px",
            letterSpacing: ".5px",
            lineHeight: 1.15,
          }}
        >
          MEDIAZION
        </h1>

        <p
          style={{
            margin: "10px 0 4px 0",
            color: "#ffffff", // BLANCO
            fontSize: "20px",
            fontWeight: 600,
          }}
        >
          Soluciones profesionales, sin conflicto.
        </p>

        <p
          style={{
            margin: 0,
            color: "#ffffff", // BLANCO
            fontSize: "16px",
            opacity: 0.95,
          }}
        >
          <strong>Centro de Mediación y Resolución de Conflictos</strong>
        </p>

        {/* Botones */}
        <div style={{ marginTop: 18, display: "flex", gap: 12 }}>
          <a
            href="/servicios"
            className="sr-btn-primary"
            style={{
              background: "#1e88e5",
              color: "#fff",
              borderRadius: 9999,
              padding: "10px 16px",
              textDecoration: "none",
              fontWeight: 700,
            }}
          >
            Ver servicios
          </a>
          <a
            href="/contacto"
            className="sr-btn-secondary"
            style={{
              background: "rgba(255,255,255,0.85)",
              color: "#0f172a",
              borderRadius: 9999,
              padding: "10px 16px",
              textDecoration: "none",
              fontWeight: 700,
              border: "1px solid rgba(15,23,42,.15)",
            }}
          >
          Contacto
          </a>
        </div>
      </div>
    </main>
  );
}
