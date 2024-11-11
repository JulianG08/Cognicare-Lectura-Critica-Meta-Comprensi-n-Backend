package co.edu.uco.cognicare.lecturacritica.metacomprension.dto;

import java.util.UUID;

public class ActivityAnswerDto {

	private UUID activityId;
	private int questionId;
	private int subquestionId;
	private String selectedAnswer;
	private Long responseTime;
	
	public ActivityAnswerDto() {
		this.activityId = UUID.randomUUID();
	}
	
	public ActivityAnswerDto(UUID activityId, int questionId, int subquestionId, String selectedAnswer, Long responseTime) {
		this.activityId = UUID.randomUUID();
		this.questionId = questionId;
		this.subquestionId = subquestionId;
		this.selectedAnswer = selectedAnswer;
		this.responseTime = responseTime;
	}
	
	public UUID getActivityId() {
		return activityId;
	}

	public void setActivityId(UUID activityId) {
		this.activityId = activityId;
	}

	public int getQuestionId() {
		return questionId;
	}

	public void setQuestionId(int questionId) {
		this.questionId = questionId;
	}

	public int getSubquestionId() {
		return subquestionId;
	}

	public void setSubquestionId(int subquestionId) {
		this.subquestionId = subquestionId;
	}

	public String getSelectedAnswer() {
		return selectedAnswer;
	}

	public void setSelectedAnswer(String selectedAnswer) {
		this.selectedAnswer = selectedAnswer;
	}

	public Long getResponseTime() {
		return responseTime;
	}

	public void setResponseTime(Long responseTime) {
		this.responseTime = responseTime;
	}
}