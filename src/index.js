import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css"; // Importamos Bootstrap para los estilos

// Seleccionamos el elemento raíz de la aplicación
const rootElement = document.getElementById("root");
// Creamos el contenedor para renderizar la app usando React 18
const root = createRoot(rootElement);

// Renderizamos el componente principal <App /> dentro del contenedor root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);