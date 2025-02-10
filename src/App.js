import React from "react";
import { Container } from "react-bootstrap";
import Game from "./Game";

// Componente principal de la aplicación
function App() {
  return (
    // Container para centrar el contenido tanto vertical como horizontalmente
    <Container
      fluid
      className="d-flex align-items-center justify-content-center min-vh-100"
    >
      {/* Limitamos el ancho máximo para que el contenido no se expanda demasiado */}
      <div className="w-100" style={{ maxWidth: "600px" }}>
        <h1 className="text-center mb-4">Tic Tac Toe Plus</h1>
        <Game />
      </div>
    </Container>
  );
}

export default App;