package com.cbw.art.dto;

import jakarta.validation.constraints.NotBlank;

public class QuestionDto {

	private long id;
	@NotBlank
	private String title;
	@NotBlank
	private String text;
	
	private Long lectureId;
	
	public QuestionDto() {
		super();
	}

	public QuestionDto(long id, @NotBlank String title, @NotBlank String text, Long lectureId) {
		super();
		this.id = id;
		this.title = title;
		this.text = text;
		this.lectureId = lectureId;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
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

	public Long getLectureId() {
		return lectureId;
	}

	public void setLectureId(Long lectureId) {
		this.lectureId = lectureId;
	}

	
}
