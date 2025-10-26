import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar.jsx";

import Inicio from "./Inicio.jsx";
import QuienesSomos from "./QuienesSomos.jsx";
import Servicios from "./Servicios.jsx";
import Mediadores from "./Mediadores.jsx";
import Tarifas from "./Tarifas.jsx";
import Contacto from "./Contacto.jsx";
import Actualidad from "./Actualidad.jsx";

import MediadorAlta from "./MediadorAlta.jsx";
import Success from "./Success.jsx";
import Cancel from "./Cancel.jsx";

export default function App(){
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <Navbar />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/quienes-somos" element={<QuienesSomos />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/mediadores" element={<Mediadores />} />
        <Route path="/mediadores/alta" element={<MediadorAlta />} />
        <Route path="/tarifas" element={<Tarifas />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/actualidad" element={<Actualidad />} />
        <Route path="/suscripcion/ok" element={<Success />} />
        <Route path="/suscripcion/cancel" element={<Cancel />} />
      </Routes>
    </div>
  );
}
