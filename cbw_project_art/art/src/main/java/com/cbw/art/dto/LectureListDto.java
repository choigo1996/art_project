package com.cbw.art.dto;

import jakarta.validation.constraints.NotBlank;

public class LectureListDto {
	
	@NotBlank
	private String title;
	
	@NotBlank
	private String video;
		
	private String duration;
	
	private long lecture;
	
	public LectureListDto() {
		super();
	}

	public LectureListDto(@NotBlank String title, @NotBlank String video, String duration, long lecture) {
		super();
		this.title = title;
		this.video = video;
		this.duration = duration;
		this.lecture = lecture;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getVideo() {
		return video;
	}

	public void setVideo(String video) {
		this.video = video;
	}

	public String getDuration() {
		return duration;
	}

	public void setDuration(String duration) {
		this.duration = duration;
	}

	public long getLecture() {
		return lecture;
	}

	public void setLecture(long lecture) {
		this.lecture = lecture;
	}

	
	
}
