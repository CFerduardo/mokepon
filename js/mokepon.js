//PARA USAR EL SCRIPT DESDE EL HEAD EN HTML UNA VEZ HAYA CARGADO TODO EL HTML
window.addEventListener("load", iniciarJuego);

/**
 * Primer Flujo, seleccion de personajes
 */
// PARA USAR EL botonMascotaJugador.addEventListener SE TIENE QUE CREAR UNA FUNCTION QUE SE ESCUCHE DESPUES DEL CLICK
function seleccionarMascotaJugador() {
  HTMLElements.sectionSeleccionarMascota.style.display = "none";
  HTMLElements.sectionSeleccionarAtaque.style.display = "flex";

  if (mascotaSeleccionada == false) {
    alert("Tienes que eleccionar una mascota❌");
    return deshabilitarBotones();
  }

  if (HTMLElements.inputHipodoge.checked) {
    HTMLElements.spanMascotaJugador.innerHTML = inputHipodoge.id;
    mascotaJugador = inputHipodoge.id;
  } else if (HTMLElements.inputCapipepo.checked) {
    HTMLElements.spanMascotaJugador.innerHTML = inputCapipepo.id;
    mascotaJugador = inputCapipepo.id;
  } else if (HTMLElements.inputRatigueya.checked) {
    HTMLElements.spanMascotaJugador.innerHTML = inputRatigueya.id;
    mascotaJugador = inputRatigueya.id;
  }
  extraerAtaques(mascotaJugador);
  habilitarBotones();
  seleccionarMascotaEnemigo();
}

function extraerAtaques(mascotaJugador) {
  let ataques;

  for (let i = 0; i < mokepones.length; i++) {
    if (mascota === mokepones[i].nombre) {
      ataques = mokepones[i].ataques;
    }
  }
  mostrarAtaques(ataques);
}

function mostrarAtaques(ataques) {
  ataques.forEach((ataque) => {
    ataquesMokepon = `
    <button id=${ataque.id} class="boton-de-ataque BAtaque">${ataque.nombre}
    </button>
    `;
    contenedorAtaques.innerHTML += ataquesMokepon;
  });

  botonFuego = document.getElementById("boton-fuego");
  botonAgua = document.getElementById("boton-agua");
  botonPlanta = document.getElementById("boton-planta");
  botones = document.querySelectorAll(".BAtaque");

  HTMLElements.botonPlanta.addEventListener("click", () =>
    ataqueDelJugador("PLANTA")
  );
  HTMLElements.botonFuego.addEventListener("click", () =>
    ataqueDelJugador("FUEGO")
  );
  HTMLElements.botonAgua.addEventListener("click", () =>
    ataqueDelJugador("AGUA")
  );
}

function secuenciaAtaque() {
  botones.forEach((boton) => {
    boton.addEventListener("click", (e) => {
      if (e.target.texContent === "🔥🌱") {
        ataqueJugador.push("FUEGO");
        console.log(ataqueJugador);
        boton.style.background = "#112f58";
      } else if (e.target.texContent === "💧") {
        ataqueJugador.push("AGUA");
        boton.style.background = "#112f58";
      } else {
        ataqueJugador.push("PLANTA");
        boton.style.background = "#112f58";
      }
    });
  });
}

function seleccionarMascotaEnemigo() {
  let mascotaAleatoria = aleatorio(0, mokepones.length - 1);

  HTMLElements.spanMascotaEnemigo.innerHTML =
    mokepones[mascotaAleatoria].nombre;
  secuenciaAtaque();
}

/**
 * Segundo Flujo, Combate
 */
//MasotaJUGADOR
function ataqueDelJugador(tipoDeAtaque) {
  ataqueJugador = tipoDeAtaque;
  ataqueAleatorioEnemigo();
}

//ATAQUE ENEMIGO
function ataqueAleatorioEnemigo() {
  let ataqueAleatorio = aleatorio(1, 3);

  if (ataqueAleatorio == 1) {
    ataqueEnemigo = "FUEGO";
  } else if (ataqueAleatorio == 2) {
    ataqueEnemigo = "AGUA";
  } else {
    ataqueEnemigo = "PLANTA";
  }
  combate();
}

//COMBATE
function combate() {
  console.log({
    ataqueJugador,
    ataqueEnemigo,
    vidasEnemigo,
    vidasJugador,
  });
  if (ataqueJugador == ataqueEnemigo) {
    crearMensaje("EMPATE");
  } else if (ataqueJugador == "FUEGO" && ataqueEnemigo == "PLANTA") {
    vidasEnemigo = vidasEnemigo - 1;
    HTMLElements.spanVidasEnemigo.innerHTML = vidasEnemigo;
    crearMensaje("GANASTE");
  } else if (ataqueJugador == "AGUA" && ataqueEnemigo == "FUEGO") {
    vidasEnemigo = vidasEnemigo - 1;
    HTMLElements.spanVidasEnemigo.innerHTML = vidasEnemigo;
    crearMensaje("GANASTE");
  } else if (ataqueJugador == "PLANTA" && ataqueEnemigo == "AGUA") {
    vidasEnemigo = vidasEnemigo - 1;
    HTMLElements.spanVidasEnemigo.innerHTML = vidasEnemigo;
    crearMensaje("GANASTE");
  } else {
    vidasJugador = vidasJugador - 1;
    HTMLElements.spanVidasJugador.innerHTML = vidasJugador;
    crearMensaje("PERDISTE");
  }

  revisarVidas();
}

//RESULATDO
function revisarVidas() {
  if (vidasEnemigo == 0) {
    crearMensajeFinal("FELICITACIONES! 🥳");
  } else if (vidasJugador == 0) {
    crearMensajeFinal("LO SENTIMOS 😈");
  }
}

//MENSAJES
function crearMensaje(resultado) {
  console.info({ resultado });
  let seccionMensajes = document.getElementById("resultado");
  let ataqueDelJugador = document.getElementById("ataque-Del-Jugador");
  let ataqueDelEnemigo = document.getElementById("ataque-Del-Enemigo");

  let nuevoAtaqueDelJugador = document.createElement("p");
  let nuevoAtaqueDelEnemigo = document.createElement("p");

  seccionMensajes.innerHTML = resultado;
  nuevoAtaqueDelJugador.innerHTML = ataqueJugador;
  nuevoAtaqueDelEnemigo.innerHTML = ataqueEnemigo;

  let parrafo = document.createElement("p");

  const mapaDeAtaques = {
    FUEGO: "FUEGO 🔥",
    PLANTA: "PLANTA 🌱",
    AGUA: "AGUA 💧",
  };

  parrafo.innerHTML =
    "Tu mascota atacó con " +
    mapaDeAtaques[ataqueJugador] +
    ", la mascota del enemigo atacó con " +
    mapaDeAtaques[ataqueEnemigo] +
    ": " +
    resultado;

  ataqueDelJugador.appendChild(nuevoAtaqueDelJugador);
  ataqueDelEnemigo.appendChild(nuevoAtaqueDelEnemigo);
}

//MESAJE FINAL
function crearMensajeFinal(resultadoFinal) {
  let parrafo = document.createElement("p");
  parrafo.innerHTML = resultadoFinal;
  seccionMensajes = document.getElementById("resultado");

  HTMLElements.seccionMensajes.appendChild(parrafo);

  HTMLElements.botonFuego.disabled = true;
  HTMLElements.botonAgua.disabled = true;
  HTMLElements.botonPlanta.disabled = true;

  HTMLElements.sectionReiniciar.style.display = "block";
}
