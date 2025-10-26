import { useParams } from "react-router-dom";

const WEBINARS = {
  "clinica-casos-civiles": {
    title: "Clínica de casos civiles",
    duration: "60 minutos · en directo",
    agenda: [
      "Selección de casos reales",
      "Buenas prácticas y preguntas",
      "Materiales descargables"
    ]
  },
  "mediacion-mercantil-hoy": {
    title: "Mediación mercantil hoy",
    duration: "45 minutos · en directo",
    agenda: [
      "Tendencias y escenarios",
      "Acuerdos empresa–proveedor",
      "Cláusulas post-contrato"
    ]
  },
  "adr-compliance": {
    title: "ADR & Compliance",
    duration: "45 minutos · en directo",
    agenda: [
      "Mediación en el mapa de riesgos",
      "Protocolos internos y evidencias",
      "KPIs de eficacia"
    ]
  }
};

export default function WebinarDetail(){
  const { slug } = useParams();
  const wb = WEBINARS[slug];

  if (!wb){
    return (
      <main className="sr-container py-12">
        <h1 className="sr-h1">Webinar no encontrado</h1>
        <p className="sr-p">Vuelve a <a className="sr-btn-secondary inline-block" href="/servicios">Servicios</a>.</p>
      </main>
    );
  }

  return (
    <main className="sr-container py-12">
      <h1 className="sr-h1">{wb.title}</h1>
      <p className="sr-p">{wb.duration}</p>

      <div className="sr-card mt-6">
        <h3 className="sr-h3">Agenda</h3>
        <ul className="sr-p" style={{marginLeft:"16px", listStyle:"disc"}}>
          {wb.agenda.map((s,i)=>(<li key={i}>{s}</li>))}
        </ul>
      </div>

      <a className="sr-btn-primary mt-6 inline-block" href="/contacto">Quiero asistir</a>
    </main>
  );
}
