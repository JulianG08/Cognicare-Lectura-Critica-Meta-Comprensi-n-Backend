package co.edu.uco.cognicare.lecturacritica.metacomprension.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Subquestion {
    @Id
    private int id;

    @ManyToOne
    @JoinColumn(name = "question_id", nullable = false)
    private Question question;

    private String correctAnswer;
    private String subquestionText;
	
    public int getId() {
		return id;
	}
	
    public void setId(int id) {
		this.id = id;
	}
	
    public Question getQuestion() {
		return question;
	}
	
    public void setQuestion(Question question) {
		this.question = question;
	}
	
    public String getCorrectAnswer() {
		return correctAnswer;
	}
	
    public void setCorrectAnswer(String correctAnswer) {
		this.correctAnswer = correctAnswer;
	}
	
    public String getSubquestionText() {
		return subquestionText;
	}
	
    public void setSubquestionText(String subquestionText) {
		this.subquestionText = subquestionText;
	}
}