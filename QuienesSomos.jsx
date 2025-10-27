export default function QuienesSomos(){
  return (
    <main className="sr-container py-12">
      <h1 className="sr-h1">Quiénes somos</h1>

      <section className="sr-card mt-6">
        <h2 className="sr-h2">Misión</h2>
        <p className="sr-p">
          Ayudar a las partes en conflicto a resolverlo acompañándoles y ayudándoles en la consecución de acuerdos
          eficaces y prevenir ulteriores litigios, aportando seguridad, trazabilidad y custodia documental.
        </p>
      </section>

      <section className="sr-card mt-6">
        <h2 className="sr-h2">Valores</h2>
        <p className="sr-p"><strong>Nuestros valores:</strong> MEDIAZION es una herramienta apropiada para abordar el
          cambio de paradigma en el tratamiento de los conflictos civiles y mercantiles.</p>
        <ul className="sr-p" style={{ marginLeft: 18, listStyle: "disc" }}>
          <li><strong>Confidencialidad</strong></li>
          <li><strong>Neutralidad</strong> — principio esencial que rige toda la intervención del Mediador profesional</li>
          <li><strong>Diligencia</strong></li>
          <li><strong>Respeto</strong></li>
        </ul>
      </section>

      <section className="sr-card mt-6">
        <h2 className="sr-h2">Acróstico MEDIAZION</h2>
        <ul className="sr-p" style={{ marginLeft: 18, listStyle: "none", padding: 0 }}>
          <li><strong>M</strong> — Modernidad</li>
          <li><strong>E</strong> — Equilibrio</li>
          <li><strong>D</strong> — Diálogo</li>
          <li><strong>I</strong> — Imparcialidad</li>
          <li><strong>A</strong> — Acuerdo</li>
          <li><strong>Z</strong> — Zona neutra</li>
          <li><strong>I</strong> — Integridad</li>
          <li><strong>O</strong> — Orientación</li>
          <li><strong>N</strong> — Neutralidad — principio esencial que rige toda la intervención del Mediador profesional</li>
        </ul>
      </section>

      <section className="sr-card mt-6">
        <h2 className="sr-h2">Metodología</h2>
        <p className="sr-p">
          Sesiones estructuradas, actas numeradas, certificación y custodia tanto de las actas como las grabaciones,
          facilitando a las partes el control de acceso a las mismas.
        </p>
      </section>
    </main>
  );
}
