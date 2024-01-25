package com.cbw.art.dto;


import jakarta.validation.constraints.NotBlank;



public class CommentDto {
	private long id;

	@NotBlank
	private String text;
	private long question;


	public CommentDto() {
		super();
	}


	public CommentDto(long id, @NotBlank String text, long question) {
		super();
		this.id = id;
		this.text = text;
		this.question = question;
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


	public long getQuestion() {
		return question;
	}


	public void setQuestion(long question) {
		this.question = question;
	}

	
}
