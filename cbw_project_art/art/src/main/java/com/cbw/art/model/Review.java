package com.cbw.art.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
@Table(name = "review")
public class Review {
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
	@Temporal(TemporalType.TIMESTAMP)
	private LocalDateTime createAt;
	
	@ManyToOne
	@JoinColumn(name = "lecture_id")
	private Lecture lecture;

	public Review() {
		super();
	}

	public Review(long id, String writer, String text, int rating, LocalDateTime createAt, Lecture lecture) {
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