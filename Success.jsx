export default function Success(){
  const p = new URLSearchParams(window.location.search);
  return (
    <main className="sr-container py-12">
      <h1 className="sr-h1">¡Suscripción activada!</h1>
      <p className="sr-p">Gracias. Hemos activado tu suscripción. Recibirás un correo con el comprobante.</p>
      <p className="sr-p">ID de sesión: <strong>{p.get("session_id") || "—"}</strong></p>
      <a className="sr-btn-secondary mt-4 inline-block" href="/">Volver al inicio</a>
    </main>
  );
}
