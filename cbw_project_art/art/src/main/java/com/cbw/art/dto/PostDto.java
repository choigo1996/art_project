package com.cbw.art.dto;

import java.util.List;

public class PostDto {
	private long id;
	private String writer;
	private String title;
	private String text;
	private List<CommentDto> commentDtos;
	
	public PostDto() {
		super();
	}
	
	public PostDto(long id, String writer, String title, String text, List<CommentDto> commentDtos) {
		super();
		this.id = id;
		this.writer = writer;
		this.title = title;
		this.text = text;
		this.commentDtos = commentDtos;
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

	public List<CommentDto> getCommentDtos() {
		return commentDtos;
	}

	public void setCommentDtos(List<CommentDto> commentDtos) {
		this.commentDtos = commentDtos;
	}
	
	
}
