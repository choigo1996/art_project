package com.cbw.art.dto;

import jakarta.validation.constraints.NotBlank;

public class ReviewDto {
	
	private long id;
	
	@NotBlank
	private String writer;
	
	@NotBlank
	private String text;
	
	private int rating;
	
	private long lecture;
	
	public ReviewDto() {
		super();
	}

	public ReviewDto(long id, @NotBlank String writer, @NotBlank String text, int rating, long lecture) {
		super();
		this.id = id;
		this.writer = writer;
		this.text = text;
		this.rating = rating;
		this.lecture = lecture;
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

	public int getRating() {
		return rating;
	}

	public void setRating(int rating) {
		this.rating = rating;
	}

	public long getLecture() {
		return lecture;
	}

	public void setLecture(long lecture) {
		this.lecture = lecture;
	}
	
	
	
}
