// src/pages/PanelMediador.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import { getApiBase } from "../api.js";

const API = getApiBase();
const url = (path) => `${API}${path}`;

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

function useAuthToken() {
  const KEY = "mediador_token";
  const [token, setToken] = useState(() => localStorage.getItem(KEY) || "");
  const save = (t) => { if (t) localStorage.setItem(KEY, t); else localStorage.removeItem(KEY); setToken(t||""); };
  return [token, save];
}

export default function PanelMediador() {
  const q = useQuery();
  const demo = q.get("demo") === "1";
  const [token, setToken] = useAuthToken();

  const [view, setView] = useState(demo ? "dashboard" : (token ? "loading" : "login"));
  const [me, setMe] = useState(null);
  const [profile, setProfile] = useState(null);
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  // IA
  const [aiInput, setAiInput] = useState("");
  const [aiBusy, setAiBusy] = useState(false);
  const [aiReply, setAiReply] = useState("");

  // Datos demo (… el resto del componente queda igual …)

  // Bootstrap real (si no es demo)
  useEffect(() => {
    if (demo) return;
    const boot = async () => {
      if (!token) { setView("login"); return; }
      try {
        const r = await fetch(url("/me"), { headers: { Authorization: `Bearer ${token}` } });
        if (!r.ok) throw new Error("Sesión no válida");
        const data = await r.json();
        setMe(data);
        const r2 = await fetch(url("/panel/profile"), { headers: { Authorization: `Bearer ${token}` } });
        setProfile(r2.ok ? await r2.json() : null);
        setView("dashboard");
      } catch {
        setView("login");
        setMsg("La sesión no es válida. Inicia sesión de nuevo.");
      }
    };
    if (view === "loading") boot();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  // … y el resto del archivo tal como lo tienes …
}
