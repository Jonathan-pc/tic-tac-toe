import { useState } from 'react';
import '../style/TicTacToe.css';

function Tablero() {
  const [tablero, setTablero] = useState([
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ]);
  const [jugadorActual, setJugadorActual] = useState('X');
  const [ganador, setGanador] = useState(null);

  const handleClick = (fila, columna) => {
    if (ganador) return; // Si ya hay un ganador, no se puede jugar más

    const nuevaCasilla = tablero[fila][columna];
    if (nuevaCasilla !== '') return; // Si la casilla ya está ocupada, no se puede jugar

    const nuevoTablero = [...tablero];
    nuevoTablero[fila][columna] = jugadorActual;

    setTablero(nuevoTablero);
    setJugadorActual(jugadorActual === 'X' ? 'O' : 'X'); // Cambiar de jugador

    comprobarGanador(nuevoTablero);
  };

  const comprobarGanador = (tablero) => {
    // Comprobar filas y columnas
    for (let i = 0; i < 3; i++) {
      if (tablero[i][0] === tablero[i][1] && tablero[i][1] === tablero[i][2] && tablero[i][0] !== '') {
        setGanador(tablero[i][0]);
        return;
      }
      if (tablero[0][i] === tablero[1][i] && tablero[1][i] === tablero[2][i] && tablero[0][i] !== '') {
        setGanador(tablero[0][i]);
        return;
      }
    }

    // Comprobar diagonales
    if (tablero[0][0] === tablero[1][1] && tablero[1][1] === tablero[2][2] && tablero[0][0] !== '') {
      setGanador(tablero[0][0]);
      return;
    }
    if (tablero[0][2] === tablero[1][1] && tablero[1][1] === tablero[2][0] && tablero[0][2] !== '') {
      setGanador(tablero[0][2]);
      return;
    }

    // Si no hay ganador, comprobar si es un empate
    if (!tablero.flat().includes('')) {
      setGanador('Empate');
    }
  };

  return (
    <div>
      <div className="tablero">
        {tablero.map((fila, indiceFila) => (
          <div key={indiceFila}>
            {fila.map((casilla, indiceColumna) => (
              <div
                key={indiceColumna}
                onClick={() => handleClick(indiceFila, indiceColumna)}
                className={`casilla ${casilla === 'X' ? 'X' : casilla === 'O' ? 'O' : ''}`}
              >
                {casilla}
              </div>
            ))}
          </div>
        ))}
      </div>
      {ganador && (
        <h2 className="ganador">Ganador: {ganador}</h2>
      )}
    </div>
  );
}

export default Tablero