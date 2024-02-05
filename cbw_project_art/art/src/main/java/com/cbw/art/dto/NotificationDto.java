package com.cbw.art.dto;


import jakarta.validation.constraints.NotBlank;

public class NotificationDto {
	
	private long id;

	@NotBlank
	private String title;
	@NotBlank
	private String text;
	
	public NotificationDto() {
		super();
	}

	public NotificationDto(long id, @NotBlank String title, @NotBlank String text) {
		super();
		this.id = id;
		this.title = title;
		this.text = text;
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

	
}
