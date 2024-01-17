package com.cbw.art.dto;

public class IntroDto {
	
	private String text;
	private Long lectureId;
	
	public IntroDto() {
		super();
	}

	public IntroDto(String text, Long lectureId) {
		super();
		this.text = text;
		this.lectureId = lectureId;
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
