// src/components/StripeButton.jsx — Suscripción PRO real (Stripe)
import React, { useState } from "react";

export default function StripeButton() {
  const [loading, setLoading] = useState(false);

  async function subscribe() {
    try {
      const email = localStorage.getItem("mediador_email");
      if (!email) {
        alert("Accede al panel antes de suscribirte.");
        return;
      }

      setLoading(true);

      const r = await fetch("/api/stripe/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await r.json();

      if (!r.ok || !data?.url) throw new Error(data.detail || "Error en Stripe");

      window.location.href = data.url;
    } catch (e) {
      alert(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button className="sr-btn-primary" onClick={subscribe} disabled={loading}>
      {loading ? "Conectando con Stripe…" : "Hazte PRO (49,50 €/mes)"}
    </button>
  );
}
