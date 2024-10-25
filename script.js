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
    try {
        numerosGenerados.push(ultimoNumero);
        mostrarHistorial();
    } catch (error) {
        console.error("Error al mostrar el último número: ", error);
    }
}

function mostrarHistorial() {
    try {
        historial.innerHTML = ""
        for (let numero of numerosGenerados) {
            const p = document.createElement("p");
            p.textContent = numero; // Mostrar cada número en el historial
            historial.appendChild(p);
        }
    } catch (error) {
        console.error("Error al mostrar el historial: ", error);
    }
}

function mostrarResultado(numero) {
    try {
        resultado.textContent = numero;
        resultado.classList.add("resultado-generado");
        resultado.style.fontSize = "5rem";
    } catch (error) {

    }
}

function cambiarEstadoBoton() {
    try {
        generar.classList.add("pressed");

    } catch (error) {
        console.error("Error al cambiar el estado del botón: ", error);
    }
}

function limpiarResultado() {
    try {
        resultado.textContent = "";

    } catch (error) {
        console.error("Error al limpiar el resultado: ", error);
    }
}

function reproducirAudioDrums() {
    try {
        const audio = new Audio("./audios/drums.mp3");
        audio.play();
    } catch (error) {
        console.error("Error al reproducir audio de drums: ", error);
    }
}

function reproducirAudioSuccess() {
    try {
        new Audio("./audios/success.mp3").play();

    } catch (error) {
        console.error("Error al reproducir audio de éxito: ", error);
    }
}

function restaurarEstado() {
    try {
        generar.classList.remove("pressed");
        resultado.classList.remove("resultado-generada");
        caja.classList.remove("expandida");
    } catch (error) {
        console.error("Error al restaurar el estado: ", error);
    }
}