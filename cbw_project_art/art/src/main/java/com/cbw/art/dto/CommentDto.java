package com.cbw.art.dto;


public class CommentDto {
	private long id;
	private String writer;
	private String text;
	private PostDto postDto;
	
	public CommentDto() {
		super();
	}

	public CommentDto(long id, String writer, String text, PostDto postDto) {
		super();
		this.id = id;
		this.writer = writer;
		this.text = text;
		this.postDto = postDto;
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

	public PostDto getPostDto() {
		return postDto;
	}

	public void setPostDto(PostDto postDto) {
		this.postDto = postDto;
	}
	
	
}
