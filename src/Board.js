import React from "react";
import Square from "./Square";

// Componente Board que renderiza el tablero de 3x3
function Board(props) {
  // Estilos dinámicos para el tablero según el turno actual:
  // Azul suave para X y rojo suave para O
  const boardStyle = {
    backgroundColor: props.turn === "X" ? "#e9f7fd" : "#fdecea",
    padding: "10px",
    borderRadius: "8px",
    border: props.turn === "X" ? "3px solid #007bff" : "3px solid #dc3545",
  };

  // Función para renderizar una casilla individual
  const renderSquare = (i) => {
    return (
      <Square
        key={i}
        value={props.squares[i]}
        onClick={() => props.onClick(i)}
        isLastMove={props.lastMove === i} // Indica si esta casilla es la del último movimiento
      />
    );
  };

  // Se crean las filas del tablero (3 filas de 3 casillas cada una)
  const boardRows = [];
  for (let row = 0; row < 3; row++) {
    const rowSquares = [];
    for (let col = 0; col < 3; col++) {
      const index = row * 3 + col;
      rowSquares.push(renderSquare(index));
    }
    boardRows.push(
      <div key={row} className="d-flex justify-content-center mb-2">
        {rowSquares}
      </div>
    );
  }

  return <div style={boardStyle}>{boardRows}</div>;
}

export default Board;