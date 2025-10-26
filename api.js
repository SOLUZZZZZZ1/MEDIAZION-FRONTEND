export function getApiBase() {
  const fromEnv = import.meta.env.VITE_API_BASE;
  if (fromEnv && fromEnv.trim().length > 0) return fromEnv.trim();
  return "https://backend-api-mediazion-1.onrender.com";
}
