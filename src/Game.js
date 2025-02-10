import React from "react";
import Board from "./Board";
import { Button, ListGroup } from "react-bootstrap";

// Función auxiliar para determinar el ganador
function calculateWinner(squares) {
  // Posibles combinaciones ganadoras
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  // Se recorre cada combinación para verificar si hay tres en línea
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// Componente Game que gestiona el estado del juego
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Historial de jugadas; cada elemento contiene el estado de las casillas y el último movimiento
      history: [
        {
          squares: Array(9).fill(null),
          lastMove: null,
        },
      ],
      stepNumber: 0, // Número del movimiento actual
      xIsNext: true, // Indica si le toca a X
    };
  }

  // Función que se ejecuta al hacer clic en una casilla
  handleClick(i) {
    // Se obtiene el historial hasta el movimiento actual (para poder retroceder en el tiempo)
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    // Se crea una copia del arreglo de casillas
    const squares = current.squares.slice();

    // Si ya hay un ganador o la casilla está ocupada, se ignora el clic
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    // Se asigna "X" u "O" según corresponda
    squares[i] = this.state.xIsNext ? "X" : "O";
    // Se actualiza el estado con la nueva jugada y se marca el último movimiento
    this.setState({
      history: history.concat([
        {
          squares: squares,
          lastMove: i,
        },
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  // Función para retroceder a un movimiento anterior
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    // Se calcula si hay un ganador
    const winner = calculateWinner(current.squares);

    // Se crea la lista de movimientos para poder retroceder
    const moves = history.map((step, move) => {
      const desc =
        move > 0
          ? `Ir al movimiento #${move} (Casilla ${
              step.lastMove !== null ? step.lastMove : ""
            })`
          : "Reiniciar juego";
      return (
        <ListGroup.Item key={move} className="p-1">
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={() => this.jumpTo(move)}
          >
            {desc}
          </Button>
        </ListGroup.Item>
      );
    });

    // Definimos el estado actual del juego: ganador, empate o turno actual
    let status;
    if (winner) {
      status = `Ganador: ${winner}`;
    } else if (this.state.stepNumber === 9) {
      status = "Empate!";
    } else {
      status = `Turno: ${this.state.xIsNext ? "X" : "O"}`;
    }

    return (
      <div className="game">
        <div className="row">
          <div className="col-md-6">
            {/* Se renderiza el tablero, pasando el estado y el turno actual */}
            <Board
              squares={current.squares}
              onClick={(i) => this.handleClick(i)}
              lastMove={current.lastMove}
              turn={this.state.xIsNext ? "X" : "O"} // Se pasa el turno actual para estilizar el tablero
            />
          </div>
          <div className="col-md-6">
            <div className="game-info">
              <h4>{status}</h4>
              {/* Lista de movimientos para poder regresar a jugadas anteriores */}
              <ListGroup>{moves}</ListGroup>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Game;
