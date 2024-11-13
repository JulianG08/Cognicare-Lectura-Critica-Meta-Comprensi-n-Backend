import axios from 'axios';

// URL base del backend
const BASE_URL = 'http://localhost:8080/api';  // Asegúrate de que esta URL sea la correcta

// Función para guardar la respuesta (POST /submit)
async function saveAnswers(req, res) {
    // Verifica si se pasó la respuesta y extrae los parámetros correctamente
    const { selectedAnswer, responseTime, subquestionId, questionId, activityId } = req.body;

    // Verifica si la respuesta está presente
    if (!selectedAnswer) {
        return res.status(400).json({ error: "La respuesta no está definida" });
    }

    // Procesa y guarda la respuesta en la base de datos (suponiendo que tienes un modelo de respuesta en tu backend)
    try {
        // Aquí deberías tener el código para guardar en la base de datos
        const newAnswer = await AnswerModel.create({
            selectedAnswer: selectedAnswer,
            responseTime: responseTime,
            subquestionId: subquestionId,
            questionId: questionId,
            activityId: activityId
        });

        return res.status(200).json({ message: "Respuesta guardada correctamente", data: newAnswer });
    } catch (error) {
        console.error("Error al guardar la respuesta:", error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
}

// Función para evaluar la respuesta (POST /evaluate)
async function evaluateAnswer(req, res) {
    const { activityId, questionId, subquestionId, selectedAnswer, responseTime } = req.body;

    try {
        const response = await axios.post(`localhost:8080/api/evaluate`, {
            activityId, 
            questionId,
            subquestionId,
            selectedAnswer,
            responseTime
        });

        const isCorrect = response.data;
        res.json({ isCorrect });
    } catch (error) {
        console.error("Error al evaluar la respuesta:", error);
        res.status(500).json({ error: "Error al evaluar la respuesta" });
    }
}

export { saveAnswers, evaluateAnswer };