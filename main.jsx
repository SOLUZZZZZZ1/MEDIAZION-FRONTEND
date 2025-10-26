import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'   // en raíz
// Los estilos de tema ya se cargan desde index.html con <link href="/theme.css">

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
