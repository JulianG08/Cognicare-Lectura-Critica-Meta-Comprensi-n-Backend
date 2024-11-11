package co.edu.uco.cognicare.lecturacritica.metacomprension.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import co.edu.uco.cognicare.lecturacritica.metacomprension.model.Question;

public interface QuestionRepository extends JpaRepository<Question, Integer> {
	
}