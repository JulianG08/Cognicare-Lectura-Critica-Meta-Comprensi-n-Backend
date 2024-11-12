import pool from '../data/connection.js';

async function getIncompleteSublevel(req, res) {
    const { questionId } = req.params;
    const userId = 1;  
    
    try {
        const result = await pool.query(`
            SELECT sublevels.id AS sublevel_id
            FROM sublevels
            LEFT JOIN user_sublevel_progress usp
                ON usp.sublevel_id = sublevels.id
                AND usp.user_id = $2
            WHERE sublevels.question_id = $1
            AND (usp.completed IS NULL OR usp.completed = FALSE)
            ORDER BY sublevels.id;
        `, [questionId, userId]);

        if (result.rows.length) {
            const sublevel = result.rows[0].sublevel_id;
            res.json({ sublevel });
        } else {
            res.json({ sublevel: null });
        }
    } catch (error) {
        console.error("Error al obtener el primer subnivel incompleto:", error);
        res.status(500).send("Error al obtener el subnivel incompleto");
    }
}

async function checkQuestionStatus(req, res) {
    const { questionId } = req.body;
    const userId = 1;

    try {
        const result = await pool.query(`
            SELECT 
                COUNT(*) FILTER (WHERE usp.completed = TRUE) AS completed_sublevels,
                COUNT(*) AS total_sublevels
            FROM sublevels sl
            LEFT JOIN user_sublevel_progress usp 
                ON usp.sublevel_id = sl.id AND usp.user_id = $1
            WHERE sl.question_id = $2;
        `, [userId, questionId]);

        const { completed_sublevels, total_sublevels } = result.rows[0];

        const isCompleted = parseInt(completed_sublevels, 10) === parseInt(total_sublevels, 10);

        res.json({ completed: isCompleted });

    } catch (error) {
        console.error("Error al verificar el progreso de la pregunta:", error);
        res.status(500).send("Error al verificar el progreso de la pregunta");
    }
}

async function saveAnswers(req, res) {
    const userId = 1; 
    const { sublevel_id, time_taken, answer, question_id } = req.body;

    try {
        const query = `
            INSERT INTO user_sublevel_progress(user_id, sublevel_id, completed, time_taken, answer, question_id)
            VALUES ($1, $2, TRUE, $3, $4, $5)
            ON CONFLICT (user_id, sublevel_id) 
            DO UPDATE SET completed = TRUE, time_taken = $3, answer = $4;
        `;
        
        await pool.query(query, [userId, sublevel_id, time_taken, answer, question_id]);
        res.json({ message: "Progreso guardado exitosamente" });
    } catch (error) {
        console.error("Error al guardar el progreso:", error);
        res.status(500).json({ error: "Error al guardar el progreso" });
    }
}

// Verifica si el usuario ha completado al menos un subnivel de la pregunta
async function checkIfCompletedAnySublevel(req, res) {
    const userId = 1;
    const { questionId } = req.params;

    try {
        const result = await pool.query(`
            SELECT COUNT(*) 
            FROM user_sublevel_progress usp
            JOIN sublevels sl ON usp.sublevel_id = sl.id
            WHERE sl.question_id = $1 AND usp.user_id = $2 AND usp.completed = TRUE;
        `, [questionId, userId]);

        const completedSublevels = parseInt(result.rows[0].count, 10);

        res.json({ hasCompleted: completedSublevels > 0 });

    } catch (error) {
        console.error("Error al verificar si el usuario completó algún subnivel:", error);
        res.status(500).send("Error al verificar el progreso");
    }
}

// Verifica si el usuario ha completado todos los subniveles de la pregunta anterior
async function checkIfPreviousQuestionCompleted(req, res) {
    const userId = 1;
    const { questionId } = req.params;

    try {
        // Obtiene el ID de la pregunta anterior
        const previousQuestionResult = await pool.query(`
            SELECT id 
            FROM questions
            WHERE id = $1 - 1;
        `, [questionId]);

        if (previousQuestionResult.rows.length === 0) {
            return res.json({ completed: true });
        }

        const previousQuestionId = previousQuestionResult.rows[0].id;

        // Verifica si todos los subniveles de la pregunta anterior están completos
        const result = await pool.query(`
            SELECT COUNT(*) FILTER (WHERE usp.completed = TRUE) AS completed_sublevels,
                   COUNT(*) AS total_sublevels
            FROM sublevels sl
            LEFT JOIN user_sublevel_progress usp 
                ON usp.sublevel_id = sl.id AND usp.user_id = $1
            WHERE sl.question_id = $2;
        `, [userId, previousQuestionId]);

        const { completed_sublevels, total_sublevels } = result.rows[0];

        const isCompleted = parseInt(completed_sublevels, 10) === parseInt(total_sublevels, 10);

        res.json({ completed: isCompleted });

    } catch (error) {
        console.error("Error al verificar el progreso de la pregunta anterior:", error);
        res.status(500).json({ error: "Error al verificar el progreso" });
    }
}


export { getIncompleteSublevel, checkQuestionStatus, saveAnswers, checkIfCompletedAnySublevel,checkIfPreviousQuestionCompleted };
