import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";

import Inicio from "./pages/Inicio.jsx";
import QuienesSomos from "./pages/QuienesSomos.jsx";
import Servicios from "./pages/Servicios.jsx";
import Mediadores from "./pages/Mediadores.jsx";
import Tarifas from "./pages/Tarifas.jsx";
import Contacto from "./pages/Contacto.jsx";
import Actualidad from "./pages/Actualidad.jsx";
import MediadorAlta from "./pages/MediadorAlta.jsx";
import Success from "./pages/Success.jsx";
import Cancel from "./pages/Cancel.jsx";
import CourseDetail from "./pages/CourseDetail.jsx";
import WebinarDetail from "./pages/WebinarDetail.jsx";

export default function App() {
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

        <Route path="/servicios/curso/:slug" element={<CourseDetail />} />
        <Route path="/servicios/webinar/:slug" element={<WebinarDetail />} />

        <Route path="/suscripcion/ok" element={<Success />} />
        <Route path="/suscripcion/cancel" element={<Cancel />} />
      </Routes>
      <footer className="sr-footer">
        <div className="sr-row sr-container">
          © {new Date().getFullYear()} MEDIAZION · Centro de Mediación y Resolución de Conflictos
        </div>
      </footer>
    </div>
  );
}
