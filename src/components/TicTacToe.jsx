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
    if (ganador) return; 
    const nuevaCasilla = tablero[fila][columna];
    if (nuevaCasilla !== '') return; 
    const nuevoTablero = [...tablero];
    nuevoTablero[fila][columna] = jugadorActual;

    setTablero(nuevoTablero);
    setJugadorActual(jugadorActual === 'X' ? 'O' : 'X'); 

    comprobarGanador(nuevoTablero);
  };

  const comprobarGanador = (tablero) => {
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

    if (tablero[0][0] === tablero[1][1] && tablero[1][1] === tablero[2][2] && tablero[0][0] !== '') {
      setGanador(tablero[0][0]);
      return;
    }
    if (tablero[0][2] === tablero[1][1] && tablero[1][1] === tablero[2][0] && tablero[0][2] !== '') {
      setGanador(tablero[0][2]);
      return;
    }

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