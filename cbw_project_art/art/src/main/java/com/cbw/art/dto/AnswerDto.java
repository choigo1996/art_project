package com.cbw.art.dto;

import java.util.List;

import com.cbw.art.enumstatus.CommentType;
import com.cbw.art.model.Answer;
import com.cbw.art.model.Question;
import com.cbw.art.model.User;

public class AnswerDto {
	private long id;
	private Question question;
	private User user;
	private String comment;
	private CommentType Type;
	private Answer questComment;
	private List<Answer> answerComment;
	
	public AnswerDto() {
		super();
	}

	public AnswerDto(long id, Question question, User user, String comment, CommentType type, Answer questComment,
			List<Answer> answerComment) {
		super();
		this.id = id;
		this.question = question;
		this.user = user;
		this.comment = comment;
		Type = type;
		this.questComment = questComment;
		this.answerComment = answerComment;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public Question getQuestion() {
		return question;
	}

	public void setQuestion(Question question) {
		this.question = question;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public CommentType getType() {
		return Type;
	}

	public void setType(CommentType type) {
		Type = type;
	}

	public Answer getQuestComment() {
		return questComment;
	}

	public void setQuestComment(Answer questComment) {
		this.questComment = questComment;
	}

	public List<Answer> getAnswerComment() {
		return answerComment;
	}

	public void setAnswerComment(List<Answer> answerComment) {
		this.answerComment = answerComment;
	}
	
}
