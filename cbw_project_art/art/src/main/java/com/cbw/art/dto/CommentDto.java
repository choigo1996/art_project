package com.cbw.art.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class CommentDto {
	
	private long id;
	
	@NotBlank
	private String content;
	
	@NotNull
	private Long userId;
	
	@NotNull
	private Long questionId;
	
	private Long parentCommentId;
	
	public CommentDto() {
		super();
	}
	
	public CommentDto(long id, @NotBlank String content, @NotNull Long userId, @NotNull Long questionId,
			Long parentCommentId) {
		super();
		this.id = id;
		this.content = content;
		this.userId = userId;
		this.questionId = questionId;
		this.parentCommentId = parentCommentId;
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
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	public Long getQuestionId() {
		return questionId;
	}
	public void setQuestionId(Long questionId) {
		this.questionId = questionId;
	}
	public Long getParentCommentId() {
		return parentCommentId;
	}
	public void setParentCommentId(Long parentCommentId) {
		this.parentCommentId = parentCommentId;
	}
	
}
