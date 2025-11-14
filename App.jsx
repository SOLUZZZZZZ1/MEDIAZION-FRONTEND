// src/App.jsx
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
import Success from "./pages/Success.jsx";
import Cancel from "./pages/Cancel.jsx";

import AdminLogin from "./pages/admin/Login.jsx";
import AdminDashboard from "./pages/admin/Dashboard.jsx";

import MediadoresDirectorio from "./pages/MediadoresDirectorio.jsx";
import PanelMediador from "./pages/PanelMediador.jsx";

import CourseDetail from "./pages/CourseDetail.jsx";
import WebinarDetail from "./pages/WebinarDetail.jsx";

// 🔹 NUEVO: login de mediadores
import LoginMediador from "./pages/LoginMediador.jsx";

// 🔹 Panel PRO / IA / Agenda / Pagos / Casos / Perfil / Actas
import AiPanel from "./pages/AiPanel.jsx";
import AiPanelLegal from "./pages/AiPanelLegal.jsx";
import Casos from "./pages/Casos.jsx";
import Pagos from "./pages/Pagos.jsx";
import Agenda from "./pages/Agenda.jsx";
import PerfilMediador from "./pages/PerfilMediador.jsx";
import ActaNueva from "./pages/ActaNueva.jsx";

// 🔹 Voces (blog público + editor PRO)
import VocesPublic from "./pages/VocesPublic.jsx";
import VocesDetalle from "./pages/VocesDetalle.jsx";
import VocesEditor from "./pages/VocesEditor.jsx";

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
        {/* Básicas */}
        <Route path="/" element={<Inicio />} />
        <Route path="/quienes-somos" element={<QuienesSomos />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/tarifas" element={<Tarifas />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/actualidad" element={<Actualidad />} />

        {/* Mediadores */}
        <Route path="/mediadores" element={<Mediadores />} />
        <Route path="/mediadores/directorio" element={<MediadoresDirectorio />} />
        <Route path="/mediadores/alta" element={<MediadorAlta />} />

        {/* Acceso mediadores (login) */}
        <Route path="/acceso" element={<LoginMediador />} />

        {/* Panel mediador (inicio) */}
        <Route path="/panel-mediador" element={<PanelMediador />} />

        {/* Panel mediador · herramientas PRO */}
        <Route path="/panel-mediador/ai" element={<AiPanel />} />
        <Route path="/panel-mediador/ai-legal" element={<AiPanelLegal />} />
        <Route path="/panel-mediador/acta" element={<ActaNueva />} />
        <Route path="/panel-mediador/casos" element={<Casos />} />
        <Route path="/panel-mediador/pagos" element={<Pagos />} />
        <Route path="/panel-mediador/agenda" element={<Agenda />} />
        <Route path="/panel-mediador/perfil" element={<PerfilMediador />} />
        <Route path="/panel-mediador/voces" element={<VocesEditor />} />

        {/* Voces público */}
        <Route path="/voces" element={<VocesPublic />} />
        <Route path="/voces/:slug" element={<VocesDetalle />} />

        {/* Detalle formativo */}
        <Route path="/servicios/curso/:slug" element={<CourseDetail />} />
        <Route path="/servicios/webinar/:slug" element={<WebinarDetail />} />

        {/* Suscripción */}
        <Route path="/suscripcion/ok" element={<Success />} />
        <Route path="/suscripcion/cancel" element={<Cancel />} />

        {/* Admin */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/panel" element={<AdminDashboard />} />
      </Routes>
      <Footer />
    </div>
  );
}
