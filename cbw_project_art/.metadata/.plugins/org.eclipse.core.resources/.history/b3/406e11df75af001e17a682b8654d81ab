package com.cbw.art.model;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "comment")
public class Comment {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@NotBlank
	private String content;
	
	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;
	
	@ManyToOne
	@JoinColumn(name = "question_id")
	private Question question;
	
	@ManyToOne
	@JoinColumn(name = "parent_comment_id")
	private Comment parentComment;
	
	@OneToMany(mappedBy = "parentComment", cascade = CascadeType.ALL)
	private List<Comment> childComments = new ArrayList<>();

	public Comment() {
		super();
	}

	public Comment(long id, @NotBlank String content, User user, Question question, Comment parentComment,
			List<Comment> childComments) {
		super();
		this.id = id;
		this.content = content;
		this.user = user;
		this.question = question;
		this.parentComment = parentComment;
		this.childComments = childComments;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Question getQuestion() {
		return question;
	}

	public void setQuestion(Question question) {
		this.question = question;
	}

	public Comment getParentComment() {
		return parentComment;
	}

	public void setParentComment(Comment parentComment) {
		this.parentComment = parentComment;
	}

	public List<Comment> getChildComments() {
		return childComments;
	}

	public void setChildComments(List<Comment> childComments) {
		this.childComments = childComments;
	}
	
	
}
