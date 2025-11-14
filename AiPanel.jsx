// src/pages/AiPanel.jsx — versión completa y funcional (IA + token + upload + DOCX)

import React, { useEffect, useMemo, useRef, useState } from "react";
import Seo from "../components/Seo.jsx";

const PRESETS = [
  { tag: "Acta estándar", prompt: "Redacta un acta formal..." },
  { tag: "Resumen ejecutivo", prompt: "Resume la sesión..." },
  { tag: "Correo de seguimiento", prompt: "Redacta un correo formal..." },
  { tag: "Cláusula confidencialidad", prompt: "Escribe una cláusula..." },
];

export default function AiPanel() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "¡Hola! Soy tu asistente de mediación. Pulsa un preset o escribe tu encargo.",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [docUrl, setDocUrl] = useState("");
  const [useDoc, setUseDoc] = useState(false);
  const fileRef = useRef(null);

  const listRef = useRef(null);
  const token = localStorage.getItem("jwt_token") || "";
  const email = localStorage.getItem("mediador_email") || "";

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight + 200;
    }
  }, [messages, loading]);

  const lastAssistantText = useMemo(() => {
    const last = [...messages].reverse().find((m) => m.role === "assistant");
    return last ? last.content : "";
  }, [messages]);

  async function handleSend(customPrompt) {
    const prompt = (customPrompt ?? input).trim();
    if (!prompt) return;

    if (!token) {
      setErrorMsg("No hay sesión activa. Entra por /acceso.");
      return;
    }

    setMessages((prev) => [...prev, { role: "user", content: prompt }]);
    setInput("");
    setErrorMsg("");
    setLoading(true);

    try {
      let bodyData = { prompt };

      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      };

      let resp;

      if (useDoc && docUrl) {
        bodyData = { doc_url: docUrl, prompt };
        resp = await fetch("/api/ai/assist_with", {
          method: "POST",
          headers,
          body: JSON.stringify(bodyData),
        });
      } else {
        resp = await fetch("/api/ai/assist", {
          method: "POST",
          headers,
          body: JSON.stringify(bodyData),
        });
      }

      const data = await resp.json().catch(() => ({}));
      if (!resp.ok || !data?.ok) {
        throw new Error(data?.detail || data?.message || "Error en IA");
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.text || "(Respuesta vacía)" },
      ]);
    } catch (e) {
      setErrorMsg(e.message);
    } finally {
