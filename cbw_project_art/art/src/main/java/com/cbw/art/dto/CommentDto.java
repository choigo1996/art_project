package com.cbw.art.dto;

import java.time.LocalDateTime;

import jakarta.validation.constraints.NotBlank;



public class CommentDto {
	private long id;
	@NotBlank
	private String writer;
	@NotBlank
	private String text;
	private long question;


	public CommentDto() {
		super();
	}


	public CommentDto(long id, String writer, String text,long question) {
		super();
		this.id = id;
		this.writer = writer;
		this.text = text;
		this.question = question;
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
