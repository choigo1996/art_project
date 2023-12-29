package com.cbw.art.model;

import java.util.List;

import com.cbw.art.enumstatus.CommentType;

import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

public class Answer {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@ManyToOne
	@JoinColumn(name = "question_id")
	private Question question;
	
	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;
	
	@Column(columnDefinition ="TEXT")
	private String comment;
	
	@Enumerated(EnumType.STRING)
	private CommentType type;
	
	@ManyToOne
	@JoinColumn(name = "question_comment_id")
	private Answer questComment;
	
	@OneToMany(mappedBy = "questionComment")
	private List<Answer> answerComment;

	public Answer() {
		super();
	}

	public Answer(long id, Question question, User user, String comment, CommentType type, Answer questComment,
			List<Answer> answerComment) {
		super();
		this.id = id;
		this.question = question;
		this.user = user;
		this.comment = comment;
		this.type = type;
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
		return type;
	}

	public void setType(CommentType type) {
		this.type = type;
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
