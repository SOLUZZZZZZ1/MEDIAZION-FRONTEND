export default function Mediadores(){
  return (
    <main className="sr-container py-12">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h1 className="sr-h1">Mediadores</h1>
        <a href="/mediadores/alta" className="sr-btn-primary whitespace-nowrap">Alta de mediadores</a>
      </div>

      <section className="sr-card mt-6">
        <p className="sr-p">
          En <strong>MEDIAZION</strong> colaboramos con mediadores profesionales acreditados en distintas áreas:
          civil, mercantil, familiar, comunitaria y empresarial.
        </p>
        <p className="sr-p">
          Nuestra red de mediadores cumple con los estándares del Centro de Mediación y cuenta con formación continua,
          seguimiento de casos y acreditación oficial. Si eres mediador o mediadora y deseas formar parte de nuestro equipo,
          puedes darte de alta utilizando el botón anterior.
        </p>
      </section>
    </main>
  );
}
