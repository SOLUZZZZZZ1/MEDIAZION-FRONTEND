// src/pages/Inicio.jsx
export default function Inicio() {
  return (
    <main>
      {/* HERO centrado con fondo claro, logo grande y textos debajo */}
      <section className="bg-white">
        <div className="sr-container py-20 flex flex-col items-center text-center">
          {/* Logo principal centrado */}
          <img
            src="/logo.png"
            alt="MEDIAZION"
            className="mb-6"
            style={{ width: "260px", height: "auto" }}
          />

          {/* Título y subtítulos */}
          <h1 className="sr-h1">MEDIAZION</h1>
          <p className="sr-p text-xl mt-2">Soluciones profesionales, sin conflicto</p>
          <p className="sr-p" style={{ marginTop: "6px" }}>
            <strong>Centro Institucional de Mediación y Resolución de Conflictos</strong>
          </p>

          {/* Botones principales */}
          <div className="mt-8 flex items-center gap-4">
            <a href="/servicios" className="sr-btn-primary">Ver servicios</a>
            <a href="/quienes-somos" className="sr-btn-secondary">Por qué MEDIAZION</a>
          </div>
        </div>
      </section>

      {/* Pie de portada (siempre visible) */}
      <section className="sr-container py-10 text-center">
        <p className="sr-p text-sm text-zinc-600">
          © MEDIAZION · Centro Institucional de Mediación y Resolución de Conflictos
        </p>
      </section>
    </main>
  );
}
