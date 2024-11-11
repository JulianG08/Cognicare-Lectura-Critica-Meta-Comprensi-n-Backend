async function checkQuestionStatus(questionId, button) {
    try {
        
        const responsePreviousQuestionCompleted = await fetch(`/checkIfPreviousQuestionCompleted/${questionId}`);
        const dataPreviousQuestionCompleted = await responsePreviousQuestionCompleted.json();

        if (!dataPreviousQuestionCompleted.completed) {
            alert("Debes completar todos los subniveles de la pregunta anterior antes de proceder.");
            return;
        }

        const responseCompletedAnySublevel = await fetch(`/checkIfCompletedAnySublevel/${questionId}`);
        const dataCompletedAnySublevel = await responseCompletedAnySublevel.json();

        if (!dataCompletedAnySublevel.hasCompleted) {
            alert(`No has completado ningún subnivel de la pregunta ${questionId}. Serás redirigido a la introducción.`);
            window.location.href = `/introLevel0${questionId}.html`;
            return;
        }else if (dataCompletedAnySublevel.hasCompleted) {
            const responseIncompleteSublevel = await fetch(`/getIncompleteSublevel/${questionId}`);
            const dataIncompleteSublevel = await responseIncompleteSublevel.json();
            const sublevel = dataIncompleteSublevel.sublevel;
            if (sublevel == null) {
                alert("ya completaste todos los niveles de esta pregunta");
                return;
            }else{
                alert('tienes un nivel incompleto de la pregunta '+questionId);
                window.location.href = `/question0${sublevel}.html`;
            }
        }else{
            alert("Error al verificar el progreso");
        }

    } catch (error) {
        console.error("Error verificando el progreso:", error);
    }
}


// Asignar el evento de clic a los botones
document.querySelectorAll(".link").forEach(button => {
    button.addEventListener("click", async (event) => {
        event.preventDefault();
        const questionId = button.getAttribute("data-level");
        await checkQuestionStatus(questionId, button);
    });
});
