package co.edu.uco.cognicare.lecturacritica.metacomprension.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import co.edu.uco.cognicare.lecturacritica.metacomprension.model.Subquestion;

public interface SubquestionRepository extends JpaRepository<Subquestion, Integer> {
    Optional<Subquestion> findByIdAndQuestionId(Integer subquestionId, Integer questionId);
}