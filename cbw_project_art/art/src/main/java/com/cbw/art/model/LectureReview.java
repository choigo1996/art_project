package com.cbw.art.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "LectureReview")
public class LectureReview {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column(nullable = false)
	private String writer;
	
	@Column(nullable = false)
	private String text;
	
	@Column(nullable = false)
	private int rating;
	
	@Column(nullable = false,updatable = false)
	private LocalDateTime createAt;
	
	@ManyToOne
	private Lecture lecture;

	public LectureReview() {
		super();
	}

	public LectureReview(long id, String writer, String text, int rating, LocalDateTime createAt, Lecture lecture) {
		super();
		this.id = id;
		this.writer = writer;
		this.text = text;
		this.rating = rating;
		this.createAt = createAt;
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

	public LocalDateTime getCreateAt() {
		return createAt;
	}

	public void setCreateAt(LocalDateTime createAt) {
		this.createAt = createAt;
	}

	public Lecture getLecture() {
		return lecture;
	}

	public void setLecture(Lecture lecture) {
		this.lecture = lecture;
	}
	
	
}