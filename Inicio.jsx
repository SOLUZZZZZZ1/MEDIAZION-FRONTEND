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
      {/* Franja horizontal clara y translúcida */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",       // fuerza horizontal
          alignItems: "center",
          justifyContent: "space-between",
          gap: "48px",
          width: "90%",
          maxWidth: "1100px",
          padding: "28px 56px",
          borderRadius: "22px",
          backgroundColor: "rgba(255,255,255,0.18)", // más claro y translúcido
          boxShadow: "0 10px 28px rgba(0,0,0,0.18)",
          border: "1px solid rgba(255,255,255,0.35)",
        }}
      >
        {/* LOGO a la izquierda */}
        <div style={{ flex: "0 0 auto", display: "flex", alignItems: "center" }}>
          <img
            src="/logo.png"
            alt="MEDIAZION"
            style={{ width: 220, height: "auto", display: "block" }}
          />
        </div>

        {/* Textos a la derecha - SIEMPRE HORIZONTAL */}
        <div style={{ flex: 1, minWidth: 0, color: "#fff", textAlign: "left" }}>
          <h1
            style={{
              margin: 0,
              fontSize: "34px",
              fontWeight: 800,
              letterSpacing: ".5px",
              color: "#FFFFFF",
              lineHeight: 1.15,
            }}
          >
            MEDIAZION
          </h1>
          <p
            style={{
              margin: "10px 0 4px 0",
              fontSize: "20px",
              fontWeight: 700,
              color: "#FFFFFF", // texto blanco
            }}
          >
            Soluciones profesionales, sin conflicto.
          </p>
          <p
            style={{
              margin: 0,
              fontSize: "16px",
              color: "#FFFFFF", // texto blanco
              opacity: 1,
            }}
          >
            <strong>Centro de Mediación y Resolución de Conflictos</strong>
          </p>

          {/* Botones a la derecha del logo */}
          <div style={{ marginTop: 18, display: "flex", gap: 12 }}>
            <a
              href="/servicios"
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
              style={{
                background: "rgba(255,255,255,0.9)",
                color: "#0f172a",
                border: "1px solid rgba(15,23,42,.15)",
                borderRadius: 9999,
                padding: "10px 16px",
                textDecoration: "none",
                fontWeight: 700,
              }}
            >
              Contacto
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
