import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

import Inicio from "./pages/Inicio.jsx";
import QuienesSomos from "./pages/QuienesSomos.jsx";
import Servicios from "./pages/Servicios.jsx";
import Mediadores from "./pages/Mediadores.jsx";
import Tarifas from "./pages/Tarifas.jsx";
import Contacto from "./pages/Contacto.jsx";
import Actualidad from "./pages/Actualidad.jsx";
import MediadorAlta from "./pages/MediadorAlta.jsx";
import MediadoresDirectorio from "./pages/MediadoresDirectorio.jsx";
import Success from "./pages/Success.jsx";
import Cancel from "./pages/Cancel.jsx";
import CourseDetail from "./pages/CourseDetail.jsx";
import WebinarDetail from "./pages/WebinarDetail.jsx";

import PanelMediador from "./pages/PanelMediador.jsx";
import AiPanel from "./pages/AiPanel.jsx";
import Plantillas from "./pages/Plantillas.jsx";

export default function App() {
  return (
    <div
      className="min-h-screen text-zinc-900"
      style={{
        backgroundImage: "url('/marmol.jpg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundPosition: "center center",
      }}
    >
      <Navbar />
      <Routes>
        {/* Públicas */}
        <Route path="/" element={<Inicio />} />
        <Route path="/quienes-somos" element={<QuienesSomos />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/tarifas" element={<Tarifas />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/actualidad" element={<Actualidad />} />
        <Route path="/mediadores" element={<Mediadores />} />
        <Route path="/mediadores/alta" element={<MediadorAlta />} />
        <Route path="/mediadores/directorio" element={<MediadoresDirectorio />} />

        {/* Formación */}
        <Route path="/servicios/curso/:slug" element={<CourseDetail />} />
        <Route path="/servicios/webinar/:slug" element={<WebinarDetail />} />

        {/* Suscripción */}
        <Route path="/suscripcion/ok" element={<Success />} />
        <Route path="/suscripcion/cancel" element={<Cancel />} />

        {/* Panel Mediador */}
        <Route path="/panel-mediador" element={<PanelMediador />} />
        <Route path="/panel-mediador/ai" element={<AiPanel />} />
        <Route path="/panel-mediador/plantillas" element={<Plantillas />} />

        {/* 404 */}
        <Route
          path="*"
          element={
            <div className="sr-container py-16">
              <h1 className="sr-h1">Página no encontrada</h1>
              <p className="sr-p">Comprueba la URL o regresa al inicio.</p>
            </div>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}
