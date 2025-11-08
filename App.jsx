// src/App.jsx — Rutas estables (sólo lo que existe) + TODOs comentados para evitar errores de build
import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

// Páginas públicas que ya tienes
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

// Panel (existe)
import PanelMediador from "./pages/PanelMediador.jsx";

/* -----------------------------
   OPCIONALES (descomenta cuando pegues los archivos)
--------------------------------

// PRO: IA
// import AiPanel from "./pages/AiPanel.jsx";

// PRO: Plantillas IA
// import Plantillas from "./pages/Plantillas.jsx";

// PRO: Pagos rápidos
// import PagosRapidos from "./pages/PagosRapidos.jsx";

// PRO: Casos y Agenda
// import Casos from "./pages/Casos.jsx";
// import Agenda from "./pages/Agenda.jsx";

// PRO: Perfil Mediador
// import PerfilMediador from "./pages/PerfilMediador.jsx";

// PRO: Actas
// import ActaNueva from "./pages/ActaNueva.jsx";

// Voces (público + PRO)
// import VocesLista from "./pages/VocesLista.jsx";
// import VocesDetalle from "./pages/VocesDetalle.jsx";
// import VocesNuevo from "./pages/VocesNuevo.jsx";
-------------------------------- */

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
        {/* Públicas (YA EXISTEN) */}
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

        {/* Panel Mediador (YA EXISTE) */}
        <Route path="/panel-mediador" element={<PanelMediador />} />

        {/* ----------- PRO (descomenta cuando los archivos existan) ----------- */}

        {/* IA */}
        {/*
        <Route path="/panel-mediador/ai" element={<AiPanel />} />
        */}

        {/* Plantillas IA */}
        {/*
        <Route path="/panel-mediador/plantillas" element={<Plantillas />} />
        */}

        {/* Pagos rápidos */}
        {/*
        <Route path="/panel-mediador/pagos" element={<PagosRapidos />} />
        */}

        {/* Casos / Agenda */}
        {/*
        <Route path="/panel-mediador/casos" element={<Casos />} />
        <Route path="/panel-mediador/agenda" element={<Agenda />} />
        */}

        {/* Perfil */}
        {/*
        <Route path="/panel-mediador/perfil" element={<PerfilMediador />} />
        */}

        {/* Actas */}
        {/*
        <Route path="/panel-mediador/acta" element={<ActaNueva />} />
        */}

        {/* Voces (público y PRO) */}
        {/*
        <Route path="/voces" element={<VocesLista />} />
        <Route path="/voces/:slug" element={<VocesDetalle />} />
        <Route path="/panel-mediador/voces/nuevo" element={<VocesNuevo />} />
        */}

        {/* 404 básico */}
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
