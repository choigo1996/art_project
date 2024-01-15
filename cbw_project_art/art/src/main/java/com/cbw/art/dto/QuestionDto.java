package com.cbw.art.dto;

import java.util.List;

import com.cbw.art.model.Comment;

import jakarta.validation.constraints.NotBlank;

public class QuestionDto {

	private long id;
	@NotBlank
	private String writer;
	@NotBlank
	private String title;
	@NotBlank
	private String text;
	
	private List<Long> commentIds;
	
	private List<Comment> comments;
	
	private Long lectureId;
	
	public QuestionDto() {
		super();
	}

	public QuestionDto(long id, @NotBlank String writer, @NotBlank String title, @NotBlank String text,
			List<Long> commentIds, List<Comment> comments, Long lectureId) {
		super();
		this.id = id;
		this.writer = writer;
		this.title = title;
		this.text = text;
		this.commentIds = commentIds;
		this.comments = comments;
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

	public List<Long> getCommentIds() {
		return commentIds;
	}

	public void setCommentIds(List<Long> commentIds) {
		this.commentIds = commentIds;
	}

	public List<Comment> getComments() {
		return comments;
	}

	public void setComments(List<Comment> comments) {
		this.comments = comments;
	}

	public Long getLectureId() {
		return lectureId;
	}

	public void setLectureId(Long lectureId) {
		this.lectureId = lectureId;
	}	
}