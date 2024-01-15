package com.cbw.art.dto;

public class LectureReviewDto {
	
	private long id;
	
	private String writer;
	
	private String text;
	
	private int rating;

	private long lectureId;

	public LectureReviewDto() {
		super();
	}

	public LectureReviewDto(long id, String writer, String text, int rating, long lectureId) {
		super();
		this.id = id;
		this.writer = writer;
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

	public long getLectureId() {
		return lectureId;
	}

	public void setLectureId(long lectureId) {
		this.lectureId = lectureId;
	}
	
}