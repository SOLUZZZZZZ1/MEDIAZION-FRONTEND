// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";

import Inicio from "./pages/Inicio.jsx";
import QuienesSomos from "./pages/QuienesSomos.jsx";
import Servicios from "./pages/Servicios.jsx";
import Mediadores from "./pages/Mediadores.jsx";
import MediadoresDirectorio from "./pages/Mediadores.jsx"; // o "./pages/MediadoresDirectorio"
import Tarifas from "./pages/Tarifas.jsx";
import Contacto from "./pages/Contacto.jsx";
import Actualidad from "./pages/Actualidad.jsx";
import MediadorAlta from "./pages/MediadorAlta.jsx";
import Success from "./pages/Success.jsx";
import Cancel from "./pages/Cancel.jsx";
import AdminLogin from "./pages/admin/Login.jsx";
import AdminDashboard from "./pages/admin/Dashboard.jsx";

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
        <Route path="/" element={<Inio />} />
        <Route path="/quienes-somos" element={<QuienesSomos />} />
        <Route path="/servicios" element={<Sevicios />} />
        <Route path="/mediadores" element={<Mediadores />} />
        <Route path="/meidadores/alta" element={<MediadorAlt />} />
        <Route path="/mediadores/directorio" element={<MediadoresDiectorio />} />
        <Route path="/tarifas" element={<Tarifs />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/actualidad" element={<Actualidad />} />
        <Route path="/suscripcion/ok" element={<Succes />} />
        <Route path="/suscripcion/cancel" element={<Cance />} />
        <Route path="/admin" element={<Adminogin />} />
        <Route path="/admin/panel" element={<AdminDashboard />} />
      </Routes>
    </div>
  );
}
