// Configuración del temporizador
let startTime;
let timeLimit;
let currentDisplayedTime;

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("questionForm");
    const sublevel_id = parseInt(document.getElementById("sublevel_id").value);

    // Asignar tiempo límite basado en el subnivel
    setTimeLimit(sublevel_id);

    // Inicia el temporizador de cuenta regresiva
    startTimer();
});

function setTimeLimit(sublevel_id) {
    switch (sublevel_id) {
        case 3:
            timeLimit = 80;
            break;
        case 4:
            timeLimit = 60;
            break;
        default:
            alert("Error: Subnivel no válido.");
            break;
    }
}

function startTimer() {
    startTime = new Date();
    currentDisplayedTime = timeLimit;
    const timerDisplay = document.getElementById("timer");

    const countdown = setInterval(() => {
        currentDisplayedTime--;
        timerDisplay.textContent = currentDisplayedTime;

        if (currentDisplayedTime <= 0) {
            clearInterval(countdown);
            submitTimeoutResponse();
        }
    }, 1000);
}

// Configuración de arrastrar y soltar
const draggableItems = document.querySelectorAll('.draggable');
const dropZones = document.querySelectorAll('.drop-zone');
const submitBtn = document.getElementById('submit-btn');

draggableItems.forEach(item => {
    item.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text', e.target.id);
    });
});

dropZones.forEach(zone => {
    zone.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    zone.addEventListener('drop', (e) => {
        e.preventDefault();
        const draggedId = e.dataTransfer.getData('text');
        const draggedItem = document.getElementById(draggedId);

        // Verifica si la zona de soltado ya tiene un contenido
        if (!zone.classList.contains('occupied')) {
            zone.classList.add('occupied');
            zone.innerText = ''; // Limpia cualquier texto placeholder
            zone.appendChild(draggedItem);
            draggedItem.classList.add('hidden');
        } else {
            const previousItem = zone.querySelector('.draggable');
            if (previousItem) {
                previousItem.classList.remove('hidden');
                document.getElementById('word-container').appendChild(previousItem);
            }
            zone.appendChild(draggedItem);
            draggedItem.classList.add('hidden');
        }
    });
});

// Evento para guardar resultados al hacer clic en el botón
submitBtn.addEventListener('click', () => {
    const endTime = new Date();
    const timeTaken = Math.round((endTime - startTime) / 1000);
    const results = {};

    dropZones.forEach(zone => {
        results[zone.id] = zone.innerText.trim();
    });
    
    const sublevel_id = parseInt(document.getElementById('sublevel_id').value);
    const question_id = parseInt(document.getElementById('question_id').value);

    fetch('/saveAnswers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            activityId: "a619a174-1d7f-437b-bd30-ffaf4206c2c6",
            questionId: question_id,
            subquestionId: sublevel_id,
            selectedAnswer: Object.values(results).join('-'),
            responseTime: timeTaken,
        }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        if (sublevel_id === 3) {
            window.location.href = "/question04.html";
        } else if (sublevel_id === 4) {
            window.location.href = "/introJuego.html";
        } else {
            alert('Error: sublevel_id no válido');
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});

async function submitTimeoutResponse() {
    const sublevel_id = parseInt(document.getElementById("sublevel_id").value);
    const question_id = parseInt(document.getElementById("question_id").value);
    const timeTaken = timeLimit - currentDisplayedTime;

    try {
        const response = await fetch("/saveAnswers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                activityId: "a619a174-1d7f-437b-bd30-ffaf4206c2c6",
                questionId: question_id,
                subquestionId: sublevel_id,
                selectedAnswer: "Tiempo agotado",
                responseTime: timeTaken,
            }),
        });

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

function redirectToNextPage(sublevel_id) {
    if (sublevel_id === 3) {
        window.location.href = "/question04.html";
    } else if (sublevel_id === 4) {
        window.location.href = "/introJuego.html";
    }
}