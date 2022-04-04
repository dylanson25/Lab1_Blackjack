/**
 * 2C = Two of clubs
 * 2D = Diamonds of clubs
 * 2H = Two of Hearts
 * 2S = Two of Spades
 */

let deck = [];
const types = ["C", "D", "H", "S"];
const specials = ["A", "J", "Q", "K"];

let puntosJugador = 0;
let puntosComputadora = 0;
//Referencias html
const btnPedir = document.querySelector("#btnPedir");
const btnNuevo = document.querySelector("#btnNuevo");
const btnDetener = document.querySelector("#btnDetener");

const smalls = document.querySelectorAll("small");
const divCartasJugador = document.querySelector("#jugador-cartas");
const divCartasComputadora = document.querySelector("#computadora-cartas");

const createDeck = () => {
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
  deck.sort(() => Math.random() - 0.5);
  console.log(deck);

  return deck;
};

createDeck();

//Funcion para pedir carta
const pedirCarta = () => {
  if (deck.length === 0) {
    throw "No hay cartas en el deck";
  }
  const carta = deck.pop();
  return carta;
};

const valorCarta = (carta) => {
  const valor = carta.substring(0, carta.length - 1);
  return isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1;
};
const valor = valorCarta(pedirCarta());

//turno de la computadora
const turnoComputadora = (puntosMinimos) => {
  do {
    const carta = pedirCarta();

    puntosComputadora = puntosComputadora + valorCarta(carta);
    smalls[1].innerText = puntosComputadora;

    const imgCarta = document.createElement("img");
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add("carta");
    divCartasComputadora.append(imgCarta);
    if (puntosMinimos > 21) {
      break;
    }
  } while (puntosComputadora < puntosMinimos && puntosMinimos <= 21);

  setTimeout(() => {
    if (puntosComputadora === puntosMinimos) {
      alert("Nadie gano");
    } else if (puntosMinimos > 21) {
      alert("Computadora gana");
    } else if (puntosComputadora > 21) {
      alert("Jugador Gana");
    }else{
        alert('Computadora Gana')
    }
  }, 10);
};

//eventos
btnPedir.addEventListener("click", () => {
  const carta = pedirCarta();

  puntosJugador = puntosJugador + valorCarta(carta);
  smalls[0].innerText = puntosJugador;

  const imgCarta = document.createElement("img");
  imgCarta.src = `assets/cartas/${carta}.png`;
  imgCarta.classList.add("carta");

  divCartasJugador.append(imgCarta);

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
});

btnDetener.addEventListener("click", () => {
  btnDetener.disabled = true;
  btnPedir.disabled = true;
  turnoComputadora(puntosJugador);
});

btnNuevo.addEventListener('click', ()=>{
    console.clear();

    deck = [];  
    createDeck();
    
    puntosComputadora = 0;
    puntosJugador = 0;
    
    smalls[0].innerText = 0;
    smalls[1].innerText = 0;
    
    btnDetener.disabled = false;
    btnPedir.disabled = false;

    divCartasComputadora.innerHTML = '';
    divCartasJugador.innerHTML = '';
})
// turnoComputadora(22);
