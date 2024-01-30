package com.cbw.art.dto;

import jakarta.validation.constraints.NotBlank;

public class ReviewDto {
	
	private long id;
	
	@NotBlank
	private String text;
	
	private int rating;
	
	private Long lectureId;
	
	public ReviewDto() {
		super();
	}

	public ReviewDto(long id, @NotBlank String text, int rating, Long lectureId) {
		super();
		this.id = id;
		this.text = text;
		this.rating = rating;
		this.lectureId = lectureId;
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

	public int getRating() {
		return rating;
	}

	public void setRating(int rating) {
		this.rating = rating;
	}

	public Long getLectureId() {
		return lectureId;
	}

	public void setLectureId(Long lectureId) {
		this.lectureId = lectureId;
	}
}
