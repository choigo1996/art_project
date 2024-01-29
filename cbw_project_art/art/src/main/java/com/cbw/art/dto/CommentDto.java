package com.cbw.art.dto;


import jakarta.validation.constraints.NotBlank;



public class CommentDto {
	private long id;

	@NotBlank
	private String text;
	private Long questionId;


	public CommentDto() {
		super();
	}


	public CommentDto(long id, @NotBlank String text, Long questionId) {
		super();
		this.id = id;
		this.text = text;
		this.questionId = questionId;
	}


	public long getId() {
		return id;
	}


	public void setId(long id) {
		this.id = id;
	}


	public String getText() {
		return text;
	}


	public void setText(String text) {
		this.text = text;
	}


	public Long getQuestionId() {
		return questionId;
	}


	public void setQuestionId(Long questionId) {
		this.questionId = questionId;
	}


	
}
