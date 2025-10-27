import React from "react";
import fondo from "/casa-diseno.jpg";
import logo from "/logo.png";

export default function Inicio() {
  return (
    <section
      className="h-screen flex flex-col items-center justify-center text-center bg-cover bg-center"
      style={{ backgroundImage: `url(${fondo})` }}
    >
      <div className="bg-gray-900 bg-opacity-50 p-8 rounded-lg">
        <img src={logo} alt="MEDIAZION" className="mx-auto mb-4 w-48" />
        <h1 className="text-4xl font-bold text-white mb-2">MEDIAZION</h1>
        <h2 className="text-xl text-gray-200 mb-4">Soluciones profesionales, sin conflicto</h2>
        <p className="text-gray-100 text-lg">
          Centro de Mediación y Resolución de Conflictos
        </p>
        <div className="mt-6 flex gap-4 justify-center">
          <a href="/servicios" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Ver servicios</a>
          <a href="/contacto" className="bg-gray-200 text-blue-900 px-4 py-2 rounded-md hover:bg-white">Contacto</a>
        </div>
      </div>
    </section>
  );
}
