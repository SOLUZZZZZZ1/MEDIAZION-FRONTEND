import React from "react";

export default function QuienesSomos(){
  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-extrabold text-blue-900">Quiénes somos</h1>

      {/* MISIÓN */}
      <section className="mt-6 bg-white border border-gray-200 rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-blue-900 mb-2">Misión</h2>
        <p className="text-gray-700 leading-relaxed">
          Ayudar a las partes en conflicto a resolverlo, acompañándoles y ayudándoles en la
          consecución de acuerdos eficaces y prevenir ulteriores litigios, aportando seguridad,
          trazabilidad y custodia documental.
        </p>
      </section>

      {/* VALORES */}
      <section className="mt-6 bg-white border border-gray-200 rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-blue-900 mb-3">Valores</h2>
        <p className="text-gray-700 leading-relaxed mb-3">
          <strong>Nuestros valores:</strong> MEDIAZION es una herramienta apropiada para abordar
          el cambio de paradigma en el tratamiento de los conflictos civiles y mercantiles.
        </p>
        <ul className="list-disc pl-6 text-gray-700 space-y-1">
          <li><strong>Confidencialidad</strong></li>
          <li>
            <strong>Neutralidad</strong> — principio esencial que rige toda la intervención del Mediador profesional
          </li>
          <li><strong>Diligencia</strong></li>
          <li><strong>Respeto</strong></li>
        </ul>
      </section>

      {/* ACRÓSTICO MEDIAZION */}
      <section className="mt-6 bg-white border border-gray-200 rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-blue-900 mb-4">Acróstico MEDIAZION</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex gap-3 items-start">
            <div className="text-blue-900 font-extrabold text-xl">M</div>
            <p className="text-gray-700"><strong>Modernidad</strong></p>
          </div>
          <div className="flex gap-3 items-start">
            <div className="text-blue-900 font-extrabold text-xl">E</div>
            <p className="text-gray-700"><strong>Equilibrio</strong></p>
          </div>
          <div className="flex gap-3 items-start">
            <div className="text-blue-900 font-extrabold text-xl">D</div>
            <p className="text-gray-700"><strong>Diálogo</strong></p>
          </div>
            <div className="flex gap-3 items-start">
            <div className="text-blue-900 font-extrabold text-xl">I</div>
            <p className="text-gray-700"><strong>Imparcialidad</strong></p>
          </div>
          <div className="flex gap-3 items-start">
            <div className="text-blue-900 font-extrabold text-xl">A</div>
            <p className="text-gray-700"><strong>Acuerdo</strong></p>
          </div>
          <div className="flex gap-3 items-start">
            <div className="text-blue-900 font-extrabold text-xl">Z</div>
            <p className="text-gray-700"><strong>Zona neutra</strong></p>
          </div>
          <div className="flex gap-3 items-start">
            <div className="text-blue-900 font-extrabold text-xl">I</div>
            <p className="text-gray-700"><strong>Integridad</strong></p>
          </div>
          <div className="flex gap-3 items-start">
            <div className="text-blue-900 font-extrabold text-xl">O</div>
            <p className="text-gray-700"><strong>Orientación</strong></p>
          </div>
          <div className="flex gap-3 items-start">
            <div className="text-blue-900 font-extrabold text-xl">N</div>
            <p className="text-gray-700"><strong>Neutralidad</strong> — principio esencial que rige toda la intervención del Mediador profesional</p>
          </div>
        </div>
      </section>

      {/* METODOLOGÍA */}
      <section className="mt-6 bg-white border border-gray-200 rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-blue-900 mb-2">Metodología</h2>
        <p className="text-gray-700 leading-relaxed">
          Sesiones estructuradas, actas numeradas, certificación y custodia tanto de las actas
          como las grabaciones, facilitando a las partes el control de acceso a las mismas.
        </p>
      </section>
    </main>
  );
}
