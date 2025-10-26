// src/lib/newsApi.js
export function getNewsApiBase(){
  const fromEnv = import.meta.env.VITE_NEWS_API;
  if (fromEnv && fromEnv.trim().length) return fromEnv.trim();
  // Fallback al backend de Render si no hay variable
  return "https://backend-api-mediazion-1.onrender.com";
}

export async function fetchNews({ source = "", tag = "", q = "", limit = 50 } = {}){
  const base = getNewsApiBase();
  const url = new URL(base.replace(/\/$/,'') + "/news");
  if (source) url.searchParams.set("source", source);
  if (tag) url.searchParams.set("tag", tag);
  if (q) url.searchParams.set("q", q);
  url.searchParams.set("limit", String(limit));
  const r = await fetch(url.toString());
  if (!r.ok) throw new Error("Error al cargar noticias");
  return r.json();
}
