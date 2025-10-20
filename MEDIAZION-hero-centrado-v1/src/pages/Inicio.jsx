export default function Inicio(){
  return (
    <main>
      {/* HERO centrado con logo y textos */}
      <section className="sr-hero-marmol">
        <div className="sr-hero-panel sr-hero-center">
          <img src="/logo.png" alt="MEDIAZION" className="sr-hero-logo" />
          <h1 className="sr-hero-title">Soluciones profesionales, sin conflicto.</h1>
          <p className="sr-hero-sub">Centro Institucional de Mediación y Resolución de Conflictos</p>
          <div className="sr-cta-row">
            <a href="/servicios" className="sr-btn-primary">Ver servicios</a>
            <a href="/contacto" className="sr-btn-secondary">Contacto</a>
          </div>
        </div>
      </section>

      {/* BLOQUE POR QUÉ MEDIAZION */}
      <section className="sr-container py-16">
        <h2 className="sr-h2 text-center">Por qué MEDIAZION</h2>
        <div className="sr-grid-3 mt-6">
          <div className="sr-card">
            <h3 className="sr-h3">Rigurosidad institucional</h3>
            <p className="sr-p">Procesos claros, actas y certificaciones preparados para firma.</p>
          </div>
          <div className="sr-card">
            <h3 className="sr-h3">Confidencialidad</h3>
            <p className="sr-p">Custodia de grabaciones y control de accesos a expedientes.</p>
          </div>
          <div className="sr-card">
            <h3 className="sr-h3">Integraciones críticas</h3>
            <p className="sr-p">Stripe, Veriff y Twilio listos para el MVP de expedientes.</p>
          </div>
        </div>
      </section>
    </main>
  )
}
