// src/pages/Inicio.jsx
export default function Inicio() {
  return (
    <main
      className="flex items-center justify-center min-h-[calc(100vh-80px)]"
      style={{
        backgroundImage: "url('/marmol.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Bloque horizontal translúcido */}
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.18)",
          backdropFilter: "blur(3px)",
          WebkitBackdropFilter: "blur(3px)",
          border: "1px solid rgba(255,255,255,0.3)",
          borderRadius: "20px",
          padding: "30px 60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "40px",
          textAlign: "left",
          flexWrap: "wrap",
          boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
          maxWidth: "1100px",
          width: "90%",
        }}
      >
        {/* Logo */}
        <div className="flex justify-center">
          <img
            src="/logo.png"
            alt="MEDIAZION"
            style={{
              width: 220,
              height: "auto",
              margin: "auto",
              display:
