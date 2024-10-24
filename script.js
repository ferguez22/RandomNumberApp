const resultado = document.getElementById("resultado");
const generar = document.getElementById("generar");
const caja = document.querySelector(".caja"); // Selecciona la caja
const historial = document.getElementById("historial"); // Nuevo elemento para mostrar el historial


let isGenerating = false;
let ultimoNumero = null; // Variable para almacenar el último número generado
let numerosGenerados = []; // Array para almacenar los números generados


generar.addEventListener("click", generarNumeroAleatorio);

function generarNumeroAleatorio() {
    try {
        console.log("click");
        if (!isGenerating) {
            isGenerating = true;
            reproducirAudioDrums();
            setTimeout(() => {
                cambiarEstadoBoton();
                limpiarResultado();

                // Mostrar la caja
                caja.style.display = "flex"; // Cambiar a visible

                // Generar número cada 70 milisegundos
                const interval = setInterval(() => {
                    const numero = Math.floor(Math.random() * 300);
                    mostrarResultado(numero);
                    ultimoNumero = numero; // Guardar el último número generado
                }, 70);

                // Detener el intervalo después de 6 segundos, mostrar el resultado final y reproducir audio de éxito
                setTimeout(() => {
                    clearInterval(interval);
                    reproducirAudioSuccess();
                    mostrarUltimoNumero(); // Mostrar el último número generado
                    restaurarEstado(); // Restaurar el estado al final
                    isGenerating = false; // Permitir nuevos clics
                    confetti({
                        particleCount: 3000, // Aumentar la cantidad de confetti
                        spread: 900, // Ajustar la dispersión
                        origin: { y: 0.6 }, // Ajustar la posición de origen
                        colors: ['#ff0', '#0f0', '#00f', '#f00'], // Colores del confetti
                    });
                }, 3000); // Cambiar a 6000 para que coincida con el tiempo total
            }, 900); // Esperar 1 segundo antes de generar números
        }
    } catch (error) {
        console.error("Error al generar número aleatorio: ", error);
    }
}

function mostrarUltimoNumero() {
    try {
        resultado.textContent = ultimoNumero; // Mostrar el último número generado
        resultado.style.fontSize = "6rem"; // Mantener el tamaño grande del texto
        numerosGenerados.push(ultimoNumero); // Agregar el número al array
        mostrarHistorial(); // Mostrar el historial actualizado
    } catch (error) {
        console.error("Error al mostrar el último número: ", error);
    }
}

function mostrarHistorial() {
    try {
        historial.innerHTML = ""
        numerosGenerados.forEach(numero => {
            const p = document.createElement("p");
            p.textContent = numero; // Mostrar cada número en el historial
            historial.appendChild(p);
        });
    } catch (error) {
        console.error("Error al mostrar el historial: ", error);
    }
}

function mostrarResultado(numero) {
    try {
        resultado.textContent = numero; // Mostrar el número actual
        resultado.classList.add("resultado-generado");
        resultado.style.fontSize = "8rem"; // Ajustar el tamaño del texto
    } catch (error) {
        console.error("Error al mostrar el resultado: ", error);
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
        resultado.textContent = ""; // Limpiar el resultado antes de mostrar nuevos números
    } catch (error) {
        console.error("Error al limpiar el resultado: ", error);
    }
}

function reproducirAudioDrums() {
    try {
        const audio = new Audio("./audios/drums.mp3");
        audio.play();
    } catch (error) {
        console.error("Error al reproducir el audio de tambores: ", error);
    }
}

function reproducirAudioSuccess() {
    try {
        new Audio("./audios/success.mp3").play();
    } catch (error) {
        console.error("Error al reproducir el audio de éxito: ", error);
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
