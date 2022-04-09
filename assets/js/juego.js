/**
 * 2C = Two of clubs
 * 2D = Diamonds of clubs
 * 2H = Two of Hearts
 * 2S = Two of Spades
 */
const modulo = (() => {
  "use strict";

  let deck = [];
  const types = ["C", "D", "H", "S"],
    specials = ["A", "J", "Q", "K"];
  
  let puntosJugadores = []
  
  const btnPedir = document.querySelector("#btnPedir"),
    btnNuevo = document.querySelector("#btnNuevo"),
    btnDetener = document.querySelector("#btnDetener");

  const divCartasJugador = document.querySelectorAll('.divCartas'),
    smalls = document.querySelectorAll("small");

  const inicializarJuego = (numJugadores = 2) => {
    deck = createDeck();
    
    puntosJugadores= [];
    for (let i = 0; i < numJugadores; i++) {
      puntosJugadores.push(0);
      
    }
    smalls.forEach(( elemento )=>{
      elemento.innerText = 0
    })

    divCartasJugador.forEach(elem => elem.innerHTML = '')

    btnDetener.disabled = false;
    btnPedir.disabled = false;

    
  };

  const createDeck = () => {
    deck = [];
    for (let index = 2; index <= 10; index++) {
      for (const type of types) {
        deck.push(index + type);
      }
    }

    for (const type of types) {
      for (const special of specials) {
        deck.push(special + type);
      }
    }

    return deck.sort(() => Math.random() - 0.5);
  };

  //Funcion para pedir carta
  const pedirCarta = () => {
    if (deck.length === 0) {
      throw "No hay cartas en el deck";
    }
    return deck.pop();
  };

  const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    return isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1;
  };

  //turno 0 = primer jugador y el ultimo es la computadora
  const acumularPuntos = (carta, turno) =>{
    puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
    smalls[turno].innerText = puntosJugadores[turno];
    return puntosJugadores[turno]
  }
  const crearCarta = (carta, turno)=>{
    const imgCarta = document.createElement("img");
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add("carta");
    divCartasJugador[turno].append(imgCarta);
  }

  const determinarGanador = () => {
    const [puntosComputadora, puntosMinimos] = puntosJugadores;

    setTimeout(() => {
      if (puntosComputadora === puntosMinimos) {
        alert("Nadie gana :(");
      } else if (puntosMinimos > 21) {
        alert("Computadora gana");
      } else if (puntosComputadora > 21) {
        alert("Jugador Gana");
      } else {
        alert("Computadora Gana");
      }
    }, 100);
  }
  const turnoComputadora = (puntosMinimos) => {
    let puntosComputadora = 0 
    do {
      const carta = pedirCarta();
      puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1)
      crearCarta(carta, puntosJugadores.length - 1)

    } while (puntosComputadora < puntosMinimos && puntosMinimos <= 21);
    determinarGanador();
  };

  //eventos
  btnPedir.addEventListener("click", () => {
    
    const carta = pedirCarta();
    const  puntosJugador = acumularPuntos(carta, 0)
    crearCarta(carta, 0)

    setTimeout(() => {
      if (puntosJugador > 21) {
        alert("Perdiste");
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
      } else if (puntosJugador === 21) {
        console.warn("21, ganaste");
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
      }
    }, 100);
    
  });

  btnDetener.addEventListener("click", () => {
    
    btnDetener.disabled = true;
    btnPedir.disabled = true;
    turnoComputadora(puntosJugadores[0]);
  });

  btnNuevo.addEventListener("click", () => {
    
    inicializarJuego();
    
  });

  return {
      nuevoJuego: inicializarJuego
  }

})();

// turnoComputadora(22);
