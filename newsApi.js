// src/lib/newsApi.js — usa el proxy /api por defecto
export async function fetchNews({ source = "", tag = "", q = "", limit = 50 } = {}) {
  const params = new URLSearchParams();
  if (source) params.set("source", source);
  if (tag) params.set("tag", tag);
  if (q) params.set("q", q);
  params.set("breakCache", String(Date.now())); // para evitar cacheo agresivo
  params.set("limit", String(limit));

  const res = await fetch(`/api/news?${params.toString()}`);
  if (!res.ok) throw new Error(`Error ${res.status}: ${await res.text()}`);
  return res.json();
}
