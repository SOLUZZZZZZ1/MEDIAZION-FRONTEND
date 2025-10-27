export default function Inicio() {
  return (
    <main
      className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] text-center text-white"
      style={{
        backgroundImage: "url('/marmol.jpg')", // EN public/
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-black/50 p-8 rounded-2xl max-w-2xl mx-auto">
        <img src="/logo.png" alt="MEDIAZION" className="mx-auto mb-6" style={{ width: "260px", height: "auto" }} />
        <h1 className="sr-h1 text-white">MEDIAZION</h1>
        <p className="sr-p text-white text-lg mt-2">Soluciones profesionales, sin conflicto.</p>
        <p className="sr-p text-white mt-1">
          <strong>Centro de Mediación y Resolución de Conflictos</strong>
        </p>

        <div className="mt-6 flex items-center justify-center gap-4">
          <a href="/servicios" className="sr-btn-primary">Ver servicios</a>
          <a href="/contacto" className="sr-btn-secondary">Contacto</a>
        </div>
      </div>
    </main>
  );
}
