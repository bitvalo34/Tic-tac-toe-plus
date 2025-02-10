import React from "react";
import { Button } from "react-bootstrap";

// Componente Square que representa cada casilla del tablero
function Square(props) {
  // Se resalta la casilla si es el último movimiento, de lo contrario se utiliza un fondo claro
  const btnClass = props.isLastMove ? "bg-warning" : "bg-light";

  return (
    <Button
      variant="outline-primary"
      onClick={props.onClick}
      className={`m-1 ${btnClass}`}
      style={{ width: "80px", height: "80px", fontSize: "32px" }}
    >
      {props.value}
    </Button>
  );
}

export default Square;