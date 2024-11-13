import axios from 'axios';

// URL base del backend
const BASE_URL = 'http://localhost:8080/api';

// Función para guardar la respuesta (POST /submit)
async function saveAnswers(req, res) {
    const { selectedAnswer, responseTime, subquestionId, questionId, activityId } = req.body;

    if (!selectedAnswer) {
        return res.status(400).json({ error: "La respuesta no está definida" });
    }

    try {
        // Envía los datos al backend
        const response = await axios.post(`${BASE_URL}/submit`, {
            selectedAnswer,
            responseTime,
            subquestionId,
            questionId,
            activityId
        });

        // Retorna la respuesta del backend al frontend
        return res.status(200).json({ message: "Respuesta guardada correctamente", data: response.data });
    } catch (error) {
        console.error("Error al guardar la respuesta:", error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
}

// Función para evaluar la respuesta (POST /evaluate)
async function evaluateAnswer(req, res) {
    const { activityId, questionId, subquestionId, selectedAnswer, responseTime } = req.body;

    try {
        const response = await axios.post(`${BASE_URL}/evaluate`, {
            activityId, 
            questionId,
            subquestionId,
            selectedAnswer,
            responseTime
        });

        res.json({ isCorrect: response.data });
    } catch (error) {
        console.error("Error al evaluar la respuesta:", error);
        res.status(500).json({ error: "Error al evaluar la respuesta" });
    }
}

export { saveAnswers, evaluateAnswer };