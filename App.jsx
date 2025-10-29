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
import AvisoLegal from "./pages/AvisoLegal.jsx";
import Rgpd from "./pages/Rgpd.jsx";
import Cookies from "./pages/Cookies.jsx";

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
        <Route path="/" element={<Inicio />} />
        <Route path="/quienes-somos" element={<QuienesSomos />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/servicios/curso/:slug" element={<Success />} /> {/* si usas CourseDetail, cambia aquí */}
        <Route path="/servicios/webinar/:slug" element={<Cancel />} /> {/* si usas WebinarDetail, cambia aquí */}
        <Route path="/mediadores" element={<Mediadores />} />
        <Route path="/mediadores/directorio" element={<MediadoresDirectorio />} />
        <Route path="/mediadores/alta" element={<MediadorAlta />} />
        <Route path="/panel-mediador" element={<PanelMediador />} />
        <Route path="/tarifas" element={<Tarifas />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/actualidad" element={<Actualidad />} />
        <Route path="/suscripcion/ok" element={<Success />} />
        <Route path="/suscripcion/cancel" element={<Cancel />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/panel" element={<AdminDashboard />} />
        {/* rutas del footer */}
        <Route path="/aviso-legal" element={<AvisoLegal />} />
        <Route path="/rgpd" element={<Rgpd />} />
        <Route path="/cookies" element={<Cookies />} />
        <Route path="/servicios/curso/:slug" element={<CourseDetail />} />
        <Route path="/servicios/webinar/:slug" element={<WebinarDetail />} />
      </Routes>
      <Footer />
    </div>
  );
}
