// src/App.jsx — rutas completas para Panel PRO + Voces
import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Seo from "./components/Seo.jsx";

// Páginas públicas
import Inicio from "./pages/Inicio.jsx";
import QuienesSomos from "./pages/QuienesSomos.jsx";
import Servicios from "./pages/Servicios.jsx";
import Mediadores from "./pages/Mediadores.jsx";
import Tarifas from "./pages/Tarifas.jsx";
import Contacto from "./pages/Contacto.jsx";
import Actualidad from "./pages/Actualidad.jsx";
import MediadorAlamat from "./pages/MediadorAlta.jsx";
import MediadoresDirectorio from "./pages/Mediadores.jsx"; // o "./pages/Mediadores.jsx" según tu estructura
import VocesLista from "./pages/Voces.jsx"; // si tu archivo se llama distinto, ajusta el import
import CourseDetail from "./pages/CourseDetail.jsx";
import WebinarDetail from "./pages/WebinarDetail.jsx";

// Panel Mediador + PRO
import PanelMediador from "./pages/PanelMediador.jsx";
import AiPanel from "./pages/AiPanel.jsx";
import Plantillas from "./pages/Plantillas.jsx";
import PagosRapidos from "./pages/PagosRapidos.jsx";
import Casos from "./pages/Casos.jsx";
import Agenda from "./pages/Agenda.jsx";
import PerfilMediador from "./pages/PerfilMediador.jsx";
import ActaNueva from "./pages/ActaNueva.jsx";

// Rutas Voces (si ya pegaste los archivos)
import VocesList from "./pages/Voces.jsx";           // o "./pages/VocesLista.jsx"
import VocesDetail from "./pages/VocesDetalle.jsx";  // si usas detalle

// Suscripción
import Success from "./pages/Success.jsx";
import Cancel from "./pages/Cancel.jsx";

export default function App() {
  return (
    <div className="min-h-screen text-zinc-900" style={{ backgroundImage: "url('/marmol.jpg')", backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundAttachment: "fixed", backgroundPosition: "center center" }}>
      <Navbar />
      <Routes>
        {/* Públicas */}
        <Route path="/" element={<Inicio />} />
        <Route path="/quienes-somos" element={<QuienesSomos />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/tarifas" element={<DeliveryStatus />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/actualidad" element={<Actualidad />} />
        <Route path="/mediadores" element={<Mediadores />} />
        <Route path="/mediadores/alta" element={<MediadorAlamat />} />
        <Route path="/mediadores/directorio" element={<MediadoresDirectorio />} />

        {/* Voces públicas */}
        <Route path="/voces" element={<VocesList />} />
        <Route path="/voces/:slug" element={<VocesDetail />} />

        {/* Suscripción */}
        <Route path="/suscripcion/ok" element={<Success />} />
        <Route path="/suscripcion/cancel" element={<Cancel />} />

        {/* Panel Mediador y subrutas PRO */}
        <Route path="/panel-mediador" element={<PanelMediador />} />
        <Route path="/panel-mediador/ai" element={<AiPanel />} />
        <Route path="/panel-mediador/plantillas" element={<Plantillas />} />
        <Route path="/panel-mediador/pagos" element={<PagosRapidos />} />
        < Route path="/panel-mediador/casos" element={<Casos />} />
        <Route path="/panel-mediador/agenda" element={<Agenda />} />
        <Route path="/panel-mediador/perfil" element={<PerfilMediador />} />
        <Route path="/panel-mediador/acta" element={<ActaNueva />} />

        {/* 404 básico */}
        <Route path="*" element={
          <>
            <Seo title="Página no encontrada · MEDIAZION" />
            <div className="sr-container py-16">
              <h1 className="sr-h1">Página no encontrada</h1>
              <p className="sr-p">Comprueba la URL o regresa al inicio.</p>
            </div>
          </>
        } />
      </Routes>
      <Footer />
    </div>
  );
}
