const resultado = document.getElementById("resultado");
const generar = document.getElementById("generar");
const caja = document.querySelector(".caja"); // Selecciona la caja
const historial = document.getElementById("historial"); // Nuevo elemento para mostrar el historial
const minimo = document.getElementById("minimo");
const maximo = document.getElementById("maximo");

let isGenerating = false;
let ultimoNumero = null; // Variable para almacenar el último número generado
let numerosGenerados = []; // Array para almacenar los números generados
generar.addEventListener("click", generarNumeroAleatorio);


function obtenerValores() {
    return {
        minimo: minimo.value,
        maximo: maximo.value
    }
}

function generarNumeroAleatorio() {
    try {
        if (!isGenerating) {
            isGenerating = true;
            reproducirAudioDrums();

            setTimeout(() => {

                cambiarEstadoBoton();
                limpiarResultado();
                const { minimo, maximo } = obtenerValores()
                caja.style.display = "flex";

                const interval = setInterval(() => {
                    const numero = Math.floor(Math.random() * (maximo - minimo) + minimo);
                    mostrarResultado(numero);
                    ultimoNumero = numero;
                }, 70)

                setTimeout(() => {
                    clearInterval(interval)
                    reproducirAudioSuccess()
                    mostrarUltimoNumero()
                    restaurarEstado()
                    isGenerating = false
                    confetti({
                        particleCount: 3000,
                        spread: 600,
                        origin: { y: 0.5 },
                        colors: ['#ff0', '#0f0', '#00f', '#f00'],
                    })
                }, 3000)

            }, 900);

        }
    } catch (error) {
        console.error("Error al generar número aleatorio: ", error);
    }
}

function mostrarUltimoNumero() {
    resultado.textContent = ultimoNumero; // Mostrar el último número generado
    resultado.style.fontSize = "8rem"; // Mantener el tamaño grande del texto
    numerosGenerados.push(ultimoNumero); // Agregar el número al array
    mostrarHistorial(); // Mostrar el historial actualizado
}

function mostrarHistorial() {
    historial.innerHTML = ""
    for (let numero of numerosGenerados) {
        const p = document.createElement("p");
        p.textContent = numero; // Mostrar cada número en el historial
        historial.appendChild(p);
    }
}

function mostrarResultado(numero) {
    resultado.textContent = numero; // Mostrar el número actual
    resultado.classList.add("resultado-generado");
    resultado.style.fontSize = "8rem"; // Ajustar el tamaño del texto
}

function cambiarEstadoBoton() {
    generar.classList.add("pressed");
}

function limpiarResultado() {
    resultado.textContent = "";
}

function reproducirAudioDrums() {
    const audio = new Audio("./audios/drums.mp3");
    audio.play();
}

function reproducirAudioSuccess() {
    new Audio("./audios/success.mp3").play();
}

function restaurarEstado() {
    generar.classList.remove("pressed");
    resultado.classList.remove("resultado-generada");
    caja.classList.remove("expandida");
}