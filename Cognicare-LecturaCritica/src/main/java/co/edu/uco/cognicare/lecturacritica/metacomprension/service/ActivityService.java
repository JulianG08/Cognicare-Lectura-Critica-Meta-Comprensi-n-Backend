package co.edu.uco.cognicare.lecturacritica.metacomprension.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import co.edu.uco.cognicare.lecturacritica.metacomprension.dto.ActivityAnswerDto;
import co.edu.uco.cognicare.lecturacritica.metacomprension.exception.ResourceNotFoundException;
import co.edu.uco.cognicare.lecturacritica.metacomprension.model.Subquestion;
import co.edu.uco.cognicare.lecturacritica.metacomprension.repository.SubquestionRepository;

@Service
public class ActivityService {

	@Autowired
    private SubquestionRepository subquestionRepository;

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