import { useParams } from "react-router-dom";

const COURSES = {
  "mediacion-aplicada-20h": {
    title: "Mediación aplicada (20h)",
    duration: "20 horas · online",
    nextDates: ["12–13 nov", "26–27 nov"],
    syllabus: [
      "Fundamentos de mediación y ética profesional",
      "Escucha activa y gestión emocional",
      "Mapa de conflicto y alternativas",
      "Redacción de acuerdos y seguimiento"
    ]
  },
  "negociacion-estrategica-12h": {
    title: "Negociación estratégica (12h)",
    duration: "12 horas · online",
    nextDates: ["20 nov", "4 dic"],
    syllabus: [
      "Intereses vs posiciones",
      "Estrategias integradoras",
      "Casos mercantiles",
      "Cierre y compromisos"
    ]
  },
  "compliance-resolucion-temprana-8h": {
    title: "Compliance y resolución temprana (8h)",
    duration: "8 horas · online",
    nextDates: ["28 nov"],
    syllabus: [
      "Mapa de riesgos y canales internos",
      "ADR como control preventivo",
      "Protocolos y evidencias",
      "KPIs de resolución temprana"
    ]
  }
};

export default function CourseDetail(){
  const { slug } = useParams();
  const course = COURSES[slug];

  if (!course){
    return (
      <main className="sr-container py-12">
        <h1 className="sr-h1">Curso no encontrado</h1>
        <p className="sr-p">Vuelve a <a className="sr-btn-secondary inline-block" href="/servicios">Servicios</a>.</p>
      </main>
    );
  }

  return (
    <main className="sr-container py-12">
      <h1 className="sr-h1">{course.title}</h1>
      <p className="sr-p">{course.duration}</p>

      <div className="sr-card mt-6">
        <h3 className="sr-h3">Próximas fechas</h3>
        <p className="sr-p">{course.nextDates.join(" · ")}</p>
      </div>

      <div className="sr-card mt-6">
        <h3 className="sr-h3">Temario</h3>
        <ul className="sr-p" style={{marginLeft:"16px", listStyle:"disc"}}>
          {course.syllabus.map((s,i)=>(<li key={i}>{s}</li>))}
        </ul>
      </div>

      <a className="sr-btn-primary mt-6 inline-block" href="/contacto">Solicitar plaza</a>
    </main>
  );
}
