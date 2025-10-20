// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Inicio from "./pages/Inicio";

const Placeholder = ({ title }) => (
  <main className="sr-container">
    <h1 className="sr-h1">{title}</h1>
    <p className="sr-p">Contenido en preparación.</p>
  </main>
);

export default function App(){
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <Navbar />
      <Routes>
        {/* Home canónica */}
        <Route path="/" element={<Inicio />} />
        {/* Alias alternativos de la misma portada */}
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/home" element={<Inicio />} />

        {/* Páginas públicas */}
        <Route path="/quienes-somos" element={<Placeholder title="Quiénes somos" />} />
        <Route path="/servicios" element={<Placeholder title="Servicios" />} />
        <Route path="/mediadores" element={<Placeholder title="Mediadores" />} />
        <Route path="/tarifas" element={<Placeholder title="Tarifas" />} />
        <Route path="/contacto" element={<Placeholder title="Contacto" />} />
      </Routes>
      <footer className="sr-footer">
        <div className="sr-row">
          <p>© MEDIAZION · Centro Institucional de Mediación y Resolución de Conflictos</p>
          <nav className="sr-footer-links">
            <a href="/legal">Aviso legal</a>
            <a href="/rgpd">RGPD</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
