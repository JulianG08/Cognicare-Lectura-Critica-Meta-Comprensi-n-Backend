package co.edu.uco.cognicare.lecturacritica.metacomprension.model;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
public class Question {

	 @Id
	 private int id;

	 @ManyToOne
	 @JoinColumn(name = "activity_id", nullable = false)
	 private Activity activity;

	 private String questionText;

	 @OneToMany(mappedBy = "question")
	 private List<Subquestion> subquestions;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Activity getActivity() {
		return activity;
	}

	public void setActivity(Activity activity) {
		this.activity = activity;
	}

	public String getQuestionText() {
		return questionText;
	}

	public void setQuestionText(String questionText) {
		this.questionText = questionText;
	}

	public List<Subquestion> getSubquestions() {
		return subquestions;
	}

	public void setSubquestions(List<Subquestion> subquestions) {
		this.subquestions = subquestions;
	}
}