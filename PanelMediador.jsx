// src/pages/PanelMediador.jsx
import React from "react";
import Seo from "../components/Seo.jsx";

export default function PanelMediador() {
  return (
    <>
      <Seo
        title="Área privada del mediador · MEDIAZION"
        description="Accede a tu perfil profesional, documentación y estado de validación."
        canonical="https://mediazion.eu/panel-mediador"
      />
      <main
        className="sr-container py-12"
        style={{
          backgroundImage: "url('/marmol.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="sr-h1">Área privada del mediador</h1>
        <p className="sr-p">
          Espacio para completar tu perfil (foto, especialidad, provincia, bio) y consultar el estado de
          validación y suscripción. Próximamente, podrás descargar facturas y gestionar tu disponibilidad.
        </p>

        <section className="sr-card mt-6" style={{ maxWidth: 860 }}>
          <h2 className="sr-h2">En desarrollo</h2>
          <p className="sr-p">
            Hemos creado esta sección para que no veas una página en blanco al pulsar “Acceder al área privada”.
            En la siguiente iteración conectamos con el backend para que puedas editar tu perfil y ver tu estado.
          </p>
        </section>
      </main>
    </>
  );
}
