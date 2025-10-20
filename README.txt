# MEDIAZION FE Pack (drop-in)
Archivos para adaptar rápidamente el frontend SpainRoom a MEDIAZION.

## Qué incluye
- `src/components/Navbar.jsx` (menú y marca MEDIAZION)
- `src/App.jsx` (rutas públicas: Inicio, Quiénes somos, Servicios, Mediadores, Tarifas, Contacto)
- `src/pages/Inicio.jsx` (hero mármol + claim)
- `src/index.css` (estilos sr-* extendidos + fondo mármol)
- `public/logo.png` (logo MEDIAZION)
- `public/marmol.jpg` (fondo mármol suave)
- `public/favicon-16/32.png`
- `vercel.json` (SPA)

## Cómo aplicar (seguro, sin romper)
1. Haz copia de seguridad de tu proyecto actual.
2. Copia **solo** los archivos de este pack en las mismas rutas de tu frontend.
3. Asegúrate de importar `src/index.css` en tu `main.jsx` o equivalente.
4. Ejecuta `npm run dev` para ver el resultado.
5. Despliegue en Vercel: `vercel build` + `vercel deploy --prebuilt --prod`.

> Nota: se mantienen las clases `sr-*` para compatibilidad con tu CSS actual.
