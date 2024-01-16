package com.cbw.art.dto;

import java.util.List;

import com.cbw.art.model.Review;

public class LectureDto {
	private long id;
	
	private String title;
	
	private String teacher;
	
	private int price;
	
	private String image;
	
	public LectureDto() {
		super();
	}

	public LectureDto(long id, String title, String teacher, int price, String image) {
		super();
		this.id = id;
		this.title = title;
		this.teacher = teacher;
		this.price = price;
		this.image = image;
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

	public String getTeacher() {
		return teacher;
	}

	public void setTeacher(String teacher) {
		this.teacher = teacher;
	}

	public int getPrice() {
		return price;
	}

	public void setPrice(int price) {
		this.price = price;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}
		
}
