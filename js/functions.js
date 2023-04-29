//COMO LA VARIABLE ESTA FUERA DE TODAS LAS FUNCIONES, TODAS LAS FUNCIONES PUEDEN ACCEDER A ELLAS
let ataqueEnemigo = [];
let opcionDeMokepones;
let inputHipodoge;
let inputCapipepo;
let inputRatigueya;
let mascotaJugador;
let ataquesMokepon;
let ataquesMokeponEnemigo;
let botonFuego;
let botonAgua;
let botonPlanta;
let botones = [];
let indexAtaqueJugador;
let indexAtaqueEnemigo;
let ataqueJugador = [];
let victoriasJugador = 0;
let victoriasEnemigo = 0;
let vidasJugador = 3;
let vidasEnemigo = 3;
let mascotaSeleccionada = false;
let lienzo = mapa.getContext("2d");

let mokepones = [];

class Mokepon {
  constructor(nombre, foto, vida) {
    this.nombre = nombre;
    this.foto = foto;
    this.vida = vida;
    this.ataques = [];
  }
}

let hipodoge = new Mokepon(
  "Hipodoge",
  "./assets/mokepons_mokepon_hipodoge_attack.webp",
  5
);
let capipepo = new Mokepon(
  "Capipepo",
  "./assets/mokepons_mokepon_capipepo_attack.webp",
  5
);
let ratigueya = new Mokepon(
  "Ratigueya",
  "./assets/mokepons_mokepon_ratigueya_attack.webp",
  5
);

hipodoge.ataques.push(
  { nombre: "💧", id: "boton-agua" },
  { nombre: "💧", id: "boton-agua" },
  { nombre: "💧", id: "boton-agua" },
  { nombre: "🔥", id: "boton-fuego" },
  { nombre: "🌱", id: "boton-planta" }
);

capipepo.ataques.push(
  { nombre: "🌱", id: "boton-planta" },
  { nombre: "🌱", id: "boton-planta" },
  { nombre: "🌱", id: "boton-planta" },
  { nombre: "💧", id: "boton-agua" },
  { nombre: "🔥", id: "boton-fuego" }
);

ratigueya.ataques.push(
  { nombre: "🔥", id: "boton-fuego" },
  { nombre: "🔥", id: "boton-fuego" },
  { nombre: "🔥", id: "boton-fuego" },
  { nombre: "💧", id: "boton-agua" },
  { nombre: "🌱", id: "boton-planta" }
);

mokepones.push(hipodoge, capipepo, ratigueya);

const HTMLElements = {
  // Secciones
  seccionMensajes: document.getElementById("resultado"),
  ataqueDelJugador: document.getElementById("ataque-Del-Jugador"),
  ataqueDelEnemigo: document.getElementById("ataque-Del-Enemigo"),
  sectionSeleccionarAtaque: document.getElementById("seleccionar-ataque"),
  sectionSeleccionarMascota: document.getElementById("seleccionar-mascota"),
  contenedorTarjetas: document.getElementById("contenedorTarjetas"),
  contenedorAtaques: document.getElementById("contenedorAtaques"),

  // Span
  spanMascotaJugador: document.getElementById("mascota-jugador"),
  spanMascotaEnemigo: document.getElementById("mascota-enemigo"),
  spanVidasJugador: document.getElementById("vidas-jugador"),
  spanVidasEnemigo: document.getElementById("vidas-enemigo"),

  // Botones
  botoReiniciar: document.getElementById("boton-reiniciar"),
  botonMascotaJugador: document.getElementById("boton-mascota"),
  botonAgua: null,
  botonFuego: null,
  botonPlanta: null,

  // Dynamic Inputs
  inputHipodoge: null,
  inputCapipepo: null,
  inputRatigueya: null,

  //mapas
  sectionVerMapa: document.getElementById("ver-mapa"),
  mapa: document.getElementById("mapa"),
};

function iniciarJuego() {
  //METODOS PARA LLAMAR DOCUMENTOS DE HTML

  HTMLElements.sectionSeleccionarAtaque.style.display = "none";
  HTMLElements.sectionVerMapa.style.display = "none";

  mokepones.forEach((mokepon) => {
    opcionDeMokepones = `
      <input type="radio" name="mascota" id=${mokepon.nombre} />
      <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
        <p>${mokepon.nombre}</p>
        <img class="mokepon-img" src=${mokepon.foto}
        alt=${mokepon.nombre}/>
      </label>
    `;
    contenedorTarjetas.innerHTML += opcionDeMokepones;

    HTMLElements.inputHipodoge = document.getElementById("Hipodoge");
    HTMLElements.inputCapipepo = document.getElementById("Capipepo");
    HTMLElements.inputRatigueya = document.getElementById("Ratigueya");
  });

  // Seccion de events
  HTMLElements.botoReiniciar.addEventListener("click", reiniciarjuego);

  HTMLElements.botonMascotaJugador.addEventListener(
    "click",
    seleccionarMascotaJugador
  );

  HTMLElements.inputCapipepo.addEventListener(
    "click",
    () => (mascotaSeleccionada = true)
  );
  HTMLElements.inputHipodoge.addEventListener(
    "click",
    () => (mascotaSeleccionada = true)
  );
  HTMLElements.inputRatigueya.addEventListener(
    "click",
    () => (mascotaSeleccionada = true)
  );
}

function habilitarBotones() {
  HTMLElements.botonFuego.disabled = false;
  HTMLElements.botonAgua.disabled = false;
  HTMLElements.botonPlanta.disabled = false;
}

function deshabilitarBotones() {
  HTMLElements.botonFuego.disabled = true;
  HTMLElements.botonAgua.disabled = true;
  HTMLElements.botonPlanta.disabled = true;
}

function reiniciarjuego() {
  location.reload();
}

function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
