package com.cbw.art.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
@Table(name = "notification")
public class Notification {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(nullable = false)
	private String writer;
	@Column(nullable = false,length = 50)
	private String title;
	@Column(nullable = false,length = 1500)
	private String text;
	@Column(nullable = false,updatable = false)
	@Temporal(TemporalType.TIMESTAMP)
	private LocalDateTime createAt;
	
	public Notification() {
		super();
	}

	public Notification(Long id, String writer, String title, String text, LocalDateTime createAt) {
		super();
		this.id = id;
		this.writer = writer;
		this.title = title;
		this.text = text;
		this.createAt = createAt;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getWriter() {
		return writer;
	}

	public void setWriter(String writer) {
		this.writer = writer;
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

	public LocalDateTime getCreateAt() {
		return createAt;
	}

	public void setCreateAt(LocalDateTime createAt) {
		this.createAt = createAt;
	}
	
	
}
