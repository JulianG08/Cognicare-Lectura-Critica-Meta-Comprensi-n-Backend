let startTime = new Date();

const draggableItems = document.querySelectorAll('.draggable');
const dropZones = document.querySelectorAll('.drop-zone');
const submitBtn = document.getElementById('submit-btn');

// Hacer que los elementos sean arrastrables
draggableItems.forEach(item => {
    item.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text', e.target.id);
    });
});

// Permitir que las zonas de soltado acepten cualquier elemento arrastrable
dropZones.forEach(zone => {
    zone.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    zone.addEventListener('drop', (e) => {
        e.preventDefault();
        const id = e.dataTransfer.getData('text');
        const draggedItem = document.getElementById(id);

        // Si la zona de soltado ya tiene un valor, regresa ese valor al contenedor de palabras
        if (zone.innerHTML.trim() !== '___') {
            const previousWord = zone.innerHTML.trim();
            const previousItem = document.getElementById(previousWord);

            // Muestra de nuevo el elemento anterior en el contenedor
            if (previousItem) {
                previousItem.style.display = 'block';
            }
        }

        // Coloca el nuevo contenido de la palabra arrastrada en la zona de soltado
        zone.innerHTML = draggedItem.innerHTML;
        draggedItem.style.display = 'none';  // Oculta la palabra en el área de selección
    });
});

// Agregar lógica para mostrar las palabras de nuevo en el contenedor
document.querySelectorAll('.draggable').forEach(draggable => {
    draggable.addEventListener('click', () => {
        draggable.style.display = 'block'; // Vuelve a mostrar el elemento arrastrable en el contenedor
    });
});

// Evento para guardar resultados al hacer clic en el botón
submitBtn.addEventListener('click', () => {
    const endTime = new Date();
    const timeTaken = (endTime - startTime) / 1000; // Tiempo en segundos
    const results = {};

    // Recopila las respuestas de cada zona de soltado
    dropZones.forEach(zone => {
        results[zone.id] = zone.innerHTML.trim();
    });

    // Recopila los valores de sublevel_id y question_id
    const sublevel_id = document.getElementById('sublevel_id').value;
    const question_id = document.getElementById('question_id').value;

    // Enviar los datos al servidor
    fetch('/guardarRespuesta', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            answer: results,
            time_taken: timeTaken,
            sublevel_id: sublevel_id,
            question_id: question_id,
        }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        console.log('sublevel_id:', sublevel_id);
        console.log('question_id:', question_id);
        
        // Redirección según el valor de sublevel_id
        if (sublevel_id == 3) {
            window.location.href = "/question04.html";
        } else if (sublevel_id == 4) {
            window.location.href = "/introJuego.html";
        } else {
            alert('Error: sublevel_id no válido');
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});

