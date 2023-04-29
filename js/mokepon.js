//PARA USAR EL SCRIPT DESDE EL HEAD EN HTML UNA VEZ HAYA CARGADO TODO EL HTML
window.addEventListener("load", iniciarJuego);

/**
 * Primer Flujo, seleccion de personajes
 */
// PARA USAR EL botonMascotaJugador.addEventListener SE TIENE QUE CREAR UNA FUNCTION QUE SE ESCUCHE DESPUES DEL CLICK
function seleccionarMascotaJugador() {
  HTMLElements.sectionSeleccionarMascota.style.display = "none";
  //HTMLElements.sectionSeleccionarAtaque.style.display = "flex";
  HTMLElements.sectionVerMapa.style.display = "flex";
  let imagenDeCapipepo = new Image();
  imagenDeCapipepo.src = capipepo.foto;
  lienzo.drawImage(imagenDeCapipepo, 20, 40, 100, 100);

  if (mascotaSeleccionada == false) {
    alert("Tienes que eleccionar una mascota❌");
    return deshabilitarBotones();
  }

  if (HTMLElements.inputHipodoge.checked) {
    HTMLElements.spanMascotaJugador.innerHTML = HTMLElements.inputHipodoge.id;
    mascotaJugador = HTMLElements.inputHipodoge.id;
  } else if (HTMLElements.inputCapipepo.checked) {
    HTMLElements.spanMascotaJugador.innerHTML = HTMLElements.inputCapipepo.id;
    mascotaJugador = HTMLElements.inputCapipepo.id;
  } else if (HTMLElements.inputRatigueya.checked) {
    HTMLElements.spanMascotaJugador.innerHTML = HTMLElements.inputRatigueya.id;
    mascotaJugador = HTMLElements.inputRatigueya.id;
  }
  extraerAtaques(mascotaJugador);
  habilitarBotones();
  seleccionarMascotaEnemigo();
}

function extraerAtaques(mascotaJugador) {
  let ataques;

  for (let i = 0; i < mokepones.length; i++) {
    if (mascotaJugador === mokepones[i].nombre) {
      ataques = mokepones[i].ataques;
    }
  }
  mostrarAtaques(ataques);
}

function mostrarAtaques(ataques) {
  ataques.forEach((ataque) => {
    ataquesMokepon = `<button id=${ataque.id} class="boton-de-ataque BAtaque">${ataque.nombre}</button>`;
    contenedorAtaques.innerHTML += ataquesMokepon;
  });

  HTMLElements.botonFuego = document.getElementById("boton-fuego");
  HTMLElements.botonAgua = document.getElementById("boton-agua");
  HTMLElements.botonPlanta = document.getElementById("boton-planta");

  botones = document.querySelectorAll(".BAtaque");
}

function secuenciaAtaque() {
  botones.forEach((boton) => {
    boton.addEventListener("click", (e) => {
      console.info("HOLA", { e, textContent: e.target.textContent });
      if (e.target.textContent === "🔥") {
        ataqueJugador.push("FUEGO");
        console.log(ataqueJugador);
        boton.style.background = "#112f58";
        boton.disable = true;
      } else if (e.target.textContent === "💧") {
        ataqueJugador.push("AGUA");
        console.log(ataqueJugador);
        boton.style.background = "#112f58";
        boton.disable = true;
      } else {
        ataqueJugador.push("PLANTA");
        console.log(ataqueJugador);
        boton.style.background = "#112f58";
        boton.disable = true;
      }
      ataqueAleatorioEnemigo();
    });
  });
}

function seleccionarMascotaEnemigo() {
  let mascotaAleatoria = aleatorio(0, mokepones.length - 1);

  HTMLElements.spanMascotaEnemigo.innerHTML =
    mokepones[mascotaAleatoria].nombre;
  ataquesMokeponEnemigo = mokepones[mascotaAleatoria].ataques;
  secuenciaAtaque();
}

/**
 * Segundo Flujo, Combate
 */
//ATAQUE ENEMIGO
function ataqueAleatorioEnemigo() {
  let ataqueAleatorio = aleatorio(0, ataquesMokeponEnemigo.length - 1);

  if (ataqueAleatorio == 0 || ataqueAleatorio == 1) {
    ataqueEnemigo.push("FUEGO");
  } else if (ataqueAleatorio == 3 || ataqueAleatorio == 4) {
    ataqueEnemigo.push("AGUA");
  } else {
    ataqueEnemigo.push("PLANTA");
  }
  console.log(ataqueEnemigo);
  iniciarPelea();
}

function iniciarPelea() {
  if (ataqueJugador.length === 5) {
    combate();
  }
}

function indexAmbosOponentes(jugador, enemigo) {
  indexAtaqueJugador = ataqueJugador[jugador];
  indexAtaqueEnemigo = ataqueEnemigo[enemigo];
}

//COMBATE
function combate() {
  for (let index = 0; index < ataqueJugador.length; index++) {
    if (ataqueJugador[index] === ataqueEnemigo[index]) {
      indexAmbosOponentes(index, index);
      crearMensaje("EMPATE");
    } else if (
      ataqueJugador[index] === "FUEGO" &&
      ataqueEnemigo[index] === "PLANTA"
    ) {
      indexAmbosOponentes(index, index);
      crearMensaje("GANASTE");
      victoriasJugador++;
      spanVidasJugador.innerHTML = victoriasJugador;
    } else if (
      ataqueJugador[index] === "AGUA" &&
      ataqueEnemigo[index] === "FUEGO"
    ) {
      indexAmbosOponentes(index, index);
      crearMensaje("GANASTE");
      victoriasJugador++;
      spanVidasJugador.innerHTML = victoriasJugador;
    } else if (
      ataqueJugador[index] === "PLANTA" &&
      ataqueEnemigo[index] === "AGUA"
    ) {
      indexAmbosOponentes(index, index);
      crearMensaje("GANASTE");
      victoriasJugador++;
      spanVidasJugador.innerHTML = victoriasJugador;
    } else {
      indexAmbosOponentes(index, index);
      crearMensaje("PERDISTE");
      victoriasEnemigo++;
      spanVidasEnemigo.innerHTML = victoriasEnemigo;
    }
  }

  revisarVidas();
}

//RESULATDO
function revisarVidas() {
  if (victoriasJugador === victoriasEnemigo) {
    crearMensajeFinal("Esto fue un empate! -.-");
  } else if (victoriasJugador > victoriasEnemigo) {
    crearMensajeFinal("GANASTE!!! :)");
  } else {
    crearMensajeFinal("PERDISTE, FRACASADO!! :(");
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
  nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador;
  nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo;

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

  HTMLElements.sectionReiniciar.style.display = "block";
}
