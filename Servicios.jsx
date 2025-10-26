export default function Servicios(){
  return (
    <main className="sr-container py-12">
      <h1 className="sr-h1 mb-4">Servicios</h1>
      <p className="sr-p">Intervenimos en ámbitos civiles y mercantiles, tanto preventivos como de resolución.</p>

      <div className="sr-grid-3 mt-8">
        <div className="sr-card">
          <h3 className="sr-h3">Mediación civil</h3>
          <p className="sr-p">Conflictos vecinales, arrendamientos, responsabilidad civil, herencias y familia.</p>
        </div>
        <div className="sr-card">
          <h3 className="sr-h3">Mediación mercantil</h3>
          <p className="sr-p">Disputas societarias, incumplimientos contractuales, proveedores y clientes.</p>
        </div>
        <div className="sr-card">
          <h3 className="sr-h3">Formación y prevención</h3>
          <p className="sr-p">Cultura del acuerdo, negociación y resolución temprana de conflictos.</p>
        </div>
      </div>

      {/* Cursos de formación */}
      <section className="mt-12">
        <h2 className="sr-h2">Cursos de formación</h2>
        <p className="sr-p">Formación práctica y acreditable para mediadores y equipos directivos.</p>

        <div className="sr-grid-3 mt-6">
          <div className="sr-card">
            <h3 className="sr-h3">Mediación aplicada (20h)</h3>
            <p className="sr-p">Técnicas de escucha, gestión emocional y redacción de acuerdos. Modalidad online.</p>
            <a className="sr-btn-secondary mt-2 inline-block" href="/servicios/curso/mediacion-aplicada-20h">Ver detalle</a>
          </div>
          <div className="sr-card">
            <h3 className="sr-h3">Negociación estratégica (12h)</h3>
            <p className="sr-p">Herramientas prácticas para entornos civiles y mercantiles. Casos reales.</p>
            <a className="sr-btn-secondary mt-2 inline-block" href="/servicios/curso/negociacion-estrategica-12h">Ver detalle</a>
          </div>
          <div className="sr-card">
            <h3 className="sr-h3">Compliance y resolución temprana (8h)</h3>
            <p className="sr-p">Integrar ADR en compliance y prevención de conflictos. Enfoque práctico.</p>
            <a className="sr-btn-secondary mt-2 inline-block" href="/servicios/curso/compliance-resolucion-temprana-8h">Ver detalle</a>
          </div>
        </div>
      </section>

      {/* Webinars */}
      <section className="mt-12">
        <h2 className="sr-h2">Webinars</h2>
        <p className="sr-p">Sesiones breves en directo con casos y preguntas abiertas.</p>

        <div className="sr-grid-3 mt-6">
          <div className="sr-card">
            <h3 className="sr-h3">Clínica de casos civiles</h3>
            <p className="sr-p">Buenas prácticas en mediación vecinal y familiar. 60 minutos.</p>
            <a className="sr-btn-primary mt-2 inline-block" href="/servicios/webinar/clinica-casos-civiles">Ver detalle</a>
          </div>
          <div className="sr-card">
            <h3 className="sr-h3">Mediación mercantil hoy</h3>
            <p className="sr-p">Tendencias en acuerdos empresa–proveedor y pactos post-contrato. 45 minutos.</p>
            <a className="sr-btn-primary mt-2 inline-block" href="/servicios/webinar/mediacion-mercantil-hoy">Ver detalle</a>
          </div>
          <div className="sr-card">
            <h3 className="sr-h3">ADR & Compliance</h3>
            <p className="sr-p">Mediación en el mapa de riesgos y protocolos internos. 45 minutos.</p>
            <a className="sr-btn-primary mt-2 inline-block" href="/servicios/webinar/adr-compliance">Ver detalle</a>
          </div>
        </div>
      </section>
    </main>
  );
}
