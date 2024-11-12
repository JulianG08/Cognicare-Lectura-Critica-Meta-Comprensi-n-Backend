let startTime;
let timeLimit;
let currentDisplayedTime;
let countdown; // Se mueve fuera de la función para poder acceder desde otros lugares

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("questionForm");
    const sublevel_id = parseInt(form.querySelector('input[name="sublevel"]').value);

    // Asignar tiempo límite basado en el subnivel
    setTimeLimit(sublevel_id);

    // Inicia el temporizador de cuenta regresiva
    startTimer(sublevel_id, form);
});

function setTimeLimit(sublevel_id) {
    switch (sublevel_id) {
        case 1:
            timeLimit = 80;
            break;
        case 2:
            timeLimit = 60;
            break;
        default:
            alert("Error: Subnivel no válido.");
            break;
    }
}

function startTimer(sublevel_id, form) {
    startTime = new Date();
    currentDisplayedTime = timeLimit;
    const timerDisplay = document.getElementById("timer");

    countdown = setInterval(() => {
        const now = new Date();
        const elapsedTime = Math.floor((now - startTime) / 1000);
        currentDisplayedTime = timeLimit - elapsedTime;
        timerDisplay.textContent = currentDisplayedTime;

        if (currentDisplayedTime <= 0) {
            clearInterval(countdown);
            submitTimeoutResponse(form, sublevel_id);
        }
    }, 1000);

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        clearInterval(countdown); // Detiene el temporizador

        const selectedOption = form.querySelector('input[name="option"]:checked');
        if (!selectedOption) {
            alert("Selecciona una opción antes de continuar.");
            actualTime = timeLimit - currentDisplayedTime;
            
            // Reanudar el temporizador después de que el usuario cierre la alerta
            startTime = new Date(new Date().getTime() - (timeLimit - currentDisplayedTime) * 1000);
            countdown = setInterval(() => {
                const now = new Date();
                const elapsedTime = Math.floor((now - startTime) / 1000);
                currentDisplayedTime = timeLimit - elapsedTime;
                timerDisplay.textContent = currentDisplayedTime;

                if (currentDisplayedTime <= 0) {
                    clearInterval(countdown);
                    submitTimeoutResponse(form, sublevel_id);
                }
            }, 1000);

            return;
        }

        const answer = selectedOption.value;
        await submitResponse(form, sublevel_id, answer);
    });
}

async function submitTimeoutResponse(form, sublevel_id) {
    const question_id = form.querySelector('input[name="question"]').value;
    const timeTaken = timeLimit - currentDisplayedTime;

    try {
        const response = await sendAnswerToServer("Tiempo agotado", timeTaken, sublevel_id, question_id);
        if (response.ok) {
            alert("Tiempo agotado. Respuesta guardada.");
            redirectToNextPage(sublevel_id);
        } else {
            alert("Hubo un problema al guardar la respuesta.");
        }
    } catch (error) {
        console.error("Error al enviar los datos:", error);
        alert("No se pudo enviar la respuesta.");
    }
}

async function submitResponse(form, sublevel_id, answer) {
    const question_id = form.querySelector('input[name="question"]').value;
    const timeTaken = timeLimit - currentDisplayedTime;

    try {
        const response = await sendAnswerToServer(answer, timeTaken, sublevel_id, question_id);
        if (response.ok) {
            alert("Respuesta guardada exitosamente.");
            redirectToNextPage(sublevel_id);
        } else {
            alert("Hubo un problema al guardar la respuesta.");
        }
    } catch (error) {
        console.error("Error al enviar los datos:", error);
        alert("No se pudo enviar la respuesta.");
    }
}

async function sendAnswerToServer(answer, timeTaken, sublevel_id, question_id) {
    const response = await fetch("/saveAnswers", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ answer, time_taken: timeTaken, sublevel_id, question_id })
    });
    return response;
}

function redirectToNextPage(sublevel_id) {
    if (sublevel_id === 1) {
        window.location.href = "/question02.html";
    } else if (sublevel_id === 2) {
        window.location.href = "/IntroJuego.html";
    }
}

function exitPage() {
    window.location.href = "/IntroJuego.html";
}