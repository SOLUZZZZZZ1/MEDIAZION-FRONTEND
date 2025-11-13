// App.jsx — Mediazion 2025 (Web pública + Panel Mediador PRO en una sola app)

import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";

// ---- COMPONENTES GLOBALES ----
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

// ---- PÁGINAS PÚBLICAS ----
import Inicio from "./pages/Inicio.jsx";
import QuienesSomos from "./pages/QuienesSomos.jsx";
import Servicios from "./pages/Servicios.jsx";
import Tarifas from "./pages/Tarifas.jsx";
import Contacto from "./pages/Contacto.jsx";
import Actualidad from "./pages/Actualidad.jsx";
import Mediadores from "./pages/Mediadores.jsx";
import MediadorAlta from "./pages/MediadorAlta.jsx";
import MediadoresDirectorio from "./pages/MediadoresDirectorio.jsx";
import Success from "./pages/Success.jsx";
import Cancel from "./pages/Cancel.jsx";
import CourseDetail from "./pages/CourseDetail.jsx";
import WebinarDetail from "./pages/WebinarDetail.jsx";

// ---- VOCES (PÚBLICO Y PRO) ----
import VocesPublic from "./pages/VocesPublic.jsx";
import VocesDetalle from "./pages/VocesDetalle.jsx";
import VocesEditor from "./pages/VocesEditor.jsx";

// ---- PANEL MEDIADOR PRO ----
import PanelMediador from "./pages/PanelMediador.jsx";
import PerfilMediador from "./pages/PerfilMediador.jsx";
import AiPanel from "./pages/AiPanel.jsx";
import AiPanelLegal from "./pages/AiPanelLegal.jsx";

// ---- PLANTILLAS / ACTAS ----
import Plantillas from "../Plantillas.jsx";
import ActaNueva from "./pages/ActaNueva.jsx";

// ---- ADMIN ----
import LoginAdmin from "./pages/admin/Login.jsx";
import DashboardAdmin from "./pages/admin/Dashboard.jsx";

// ---- EXTRAS ----
import Casos from "./pages/Casos.jsx";
import Agenda from "./pages/Agenda.jsx";
import Pagos from "./pages/Pagos.jsx";


// -------------------------------------------
//     ⛔ SOLO UNA APLICACIÓN — NO DUPLICAR
// -------------------------------------------

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
      <HashRouter>
        <Navbar />

        <Routes>

          {/* ---------------- PÚBLICA ---------------- */}

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

          {/* Voces público */}
          <Route path="/voces" element={<VocesPublic />} />
          <Route path="/voces/:slug" element={<VocesDetalle />} />


          {/* ---------------- PANEL MEDIADOR PRO ---------------- */}

          <Route path="/panel-mediador" element={<PanelMediador />} />
          <Route path="/panel-mediador/perfil" element={<PerfilMediador />} />
          <Route path="/panel-mediador/ai" element={<AiPanel />} />
          <Route path="/panel-mediador/ai-legal" element={<AiPanelLegal />} />

          <Route path="/panel-mediador/voces" element={<VocesPublic />} />
          <Route path="/panel-mediador/voces/nuevo" element={<VocesEditor />} />
          <Route path="/panel-mediador/voces/:slug" element={<VocesDetalle />} />

          <Route path="/panel-mediador/plantillas" element={<Plantillas />} />
          <Route path="/panel-mediador/acta" element={<ActaNueva />} />
          <Route path="/panel-mediador/casos" element={<Casos />} />
          <Route path="/panel-mediador/agenda" element={<Agenda />} />
          <Route path="/panel-mediador/pagos" element={<Pagos />} />

          {/* ---------------- ADMIN ---------------- */}

          <Route path="/admin" element={<LoginAdmin />} />
          <Route path="/admin/dashboard" element={<DashboardAdmin />} />

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
      </HashRouter>
    </div>
  );
}
