package co.edu.uco.cognicare.lecturacritica.metacomprension.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import co.edu.uco.cognicare.lecturacritica.metacomprension.dto.ActivityAnswerDto;
import co.edu.uco.cognicare.lecturacritica.metacomprension.exception.ResourceNotFoundException;
import co.edu.uco.cognicare.lecturacritica.metacomprension.model.ActivityAnswer;
import co.edu.uco.cognicare.lecturacritica.metacomprension.model.Subquestion;
import co.edu.uco.cognicare.lecturacritica.metacomprension.repository.ActivityAnswerRepository;
import co.edu.uco.cognicare.lecturacritica.metacomprension.repository.SubquestionRepository;

@Service
public class ActivityService {

	@Autowired
    private SubquestionRepository subquestionRepository;
	
	@Autowired
    private ActivityAnswerRepository activityAnswerRepository;
	
    public ActivityService(ActivityAnswerRepository activityAnswerRepository) {
        this.activityAnswerRepository = activityAnswerRepository;
    }

    public boolean submitAnswer(ActivityAnswerDto activityAnswerDto) {
        ActivityAnswer answer = new ActivityAnswer();
        answer.setActivityId(activityAnswerDto.getActivityId());
        answer.setQuestionId(activityAnswerDto.getQuestionId());
        answer.setSubquestionId(activityAnswerDto.getSubquestionId());
        answer.setSelectedAnswer(activityAnswerDto.getSelectedAnswer());
        answer.setResponseTime(activityAnswerDto.getResponseTime());

        // Guarda la respuesta en la base de datos
        activityAnswerRepository.save(answer);

        // Aquí iría la lógica para evaluar la respuesta y determinar si es correcta
        return true; // Ejemplo simplificado
    }
	
    public boolean evaluateAnswer(ActivityAnswerDto activityAnswerDto) {
        // Busca la subpregunta específica
        Optional<Subquestion> optionalSubquestion = subquestionRepository.findByIdAndQuestionId(
                activityAnswerDto.getSubquestionId(), activityAnswerDto.getQuestionId());

        if (optionalSubquestion.isPresent()) {
            Subquestion subquestion = optionalSubquestion.get();
            // Compara la respuesta seleccionada con la respuesta correcta
            return subquestion.getCorrectAnswer().equals(activityAnswerDto.getSelectedAnswer());
        } else {
            throw new ResourceNotFoundException("Subpregunta no encontrada");
        }
    }
}