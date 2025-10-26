export default function Servicios(){
  return (
    <main className="sr-container py-12">
      <h1 className="sr-h1 mb-4">Servicios</h1>
      <p className="sr-p">Intervenimos en ámbitos civiles y mercantiles, tanto preventivos como de resolución.</p>

      <div className="sr-grid-3 mt-6">
        <div className="sr-card">
          <h3 className="sr-h3">Mediación civil</h3>
          <p className="sr-p">Vecinal, familia, herencias, arrendamientos, responsabilidad civil.</p>
        </div>
        <div className="sr-card">
          <h3 className="sr-h3">Mediación mercantil</h3>
          <p className="sr-p">Societaria, contractual, proveedores y clientes, post-contrato.</p>
        </div>
        <div className="sr-card">
          <h3 className="sr-h3">Formación y prevención</h3>
          <p className="sr-p">Cultura del acuerdo, negociación y resolución temprana de conflictos.</p>
        </div>
      </div>
    </main>
  );
}
