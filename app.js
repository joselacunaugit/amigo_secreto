// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.
// app.js

const inputAmigo = document.getElementById("amigo");
const listaAmigos = document.getElementById("listaAmigos");
const resultado = document.getElementById("resultado");

let amigos = [];

function agregarAmigo() {
    const nombre = inputAmigo.value.trim();

    // Validación de nombre vacío
    if (nombre === "") {
        alert("Por favor, ingresa un nombre.");
        return;
    }

    // Validación de duplicados
    if (amigos.includes(nombre)) {
        alert("Este nombre ya fue agregado.");
        return;
    }

    amigos.push(nombre);

    const li = document.createElement("li");
    li.textContent = nombre;
    listaAmigos.appendChild(li);

    inputAmigo.value = "";
    inputAmigo.focus();
}

function sortearAmigo() {
    if (amigos.length < 2) {
        alert("Debes ingresar al menos 2 amigos para realizar el sorteo.");
        return;
    }

    const indiceAleatorio = Math.floor(Math.random() * amigos.length);
    const nombreSorteado = amigos[indiceAleatorio];

    resultado.innerHTML = `<li>El nombre sorteado es: <strong>${nombreSorteado}</strong></li>`;
}

function asignarAmigoSecreto() {
    if (amigos.length < 2) {
        alert("Debes ingresar al menos 2 amigos para hacer el emparejamiento.");
        return;
    }

    // Crear una copia mezclada aleatoriamente
    const sorteados = [...amigos];
    let intentos = 0;

    do {
        shuffleArray(sorteados);
        intentos++;
    } while (!validarAsignacion(amigos, sorteados) && intentos < 100);

    if (intentos >= 100) {
        alert("No se pudo generar una asignación válida. Intenta de nuevo.");
        return;
    }

    // Mostrar asignaciones
    resultado.innerHTML = "<li>Asignaciones de amigo secreto:</li>";
    for (let i = 0; i < amigos.length; i++) {
        resultado.innerHTML += `<li>${amigos[i]} → ${sorteados[i]}</li>`;
    }
}

// Mezcla aleatoria usando Fisher-Yates
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Verifica que nadie se regale a sí mismo
function validarAsignacion(originales, mezclados) {
    for (let i = 0; i < originales.length; i++) {
        if (originales[i] === mezclados[i]) return false;
    }
    return true;
}


function reiniciar() {
    amigos = [];
    listaAmigos.innerHTML = "";
    resultado.innerHTML = "";
    inputAmigo.value = "";
    inputAmigo.focus();
}

