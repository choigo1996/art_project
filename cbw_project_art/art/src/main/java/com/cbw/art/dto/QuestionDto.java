package com.cbw.art.dto;

import java.util.List;

import jakarta.validation.constraints.NotBlank;

public class QuestionDto {

	private long id;
	@NotBlank
	private String writer;
	@NotBlank
	private String title;
	@NotBlank
	private String text;
	private Long userId;
	
	private List<Long> commentIds;
	
	public QuestionDto() {
		super();
	}

	public QuestionDto(long id, @NotBlank String writer, @NotBlank String title, @NotBlank String text,
			@NotBlank Long userId, @NotBlank List<Long> commentIds) {
		super();
		this.id = id;
		this.writer = writer;
		this.title = title;
		this.text = text;
		this.userId = userId;
		this.commentIds = commentIds;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getWriter() {
		return writer;
	}

	public void setWriter(String writer) {
		this.writer = writer;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public List<Long> getCommentIds() {
		return commentIds;
	}

	public void setCommentIds(List<Long> commentIds) {
		this.commentIds = commentIds;
	}
	
	
}
