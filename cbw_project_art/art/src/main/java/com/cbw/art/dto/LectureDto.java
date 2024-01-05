package com.cbw.art.dto;

import java.util.List;

import com.cbw.art.model.LectureList;

public class LectureDto {

	private long id;
	
	private String title;
	
	private String category;
	
	private String image;
	
	private int price;
	
	private String teacher;

	private List<LectureList> lectureLists;
	
	public LectureDto() {
		super();
	}

	public LectureDto(long id, String title, String category, String image, int price, String teacher,
			List<LectureList> lectureLists) {
		super();
		this.id = id;
		this.title = title;
		this.category = category;
		this.image = image;
		this.price = price;
		this.teacher = teacher;
		this.lectureLists = lectureLists;
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

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public int getPrice() {
		return price;
	}

	public void setPrice(int price) {
		this.price = price;
	}

	public String getTeacher() {
		return teacher;
	}

	public void setTeacher(String teacher) {
		this.teacher = teacher;
	}

	public List<LectureList> getLectureLists() {
		return lectureLists;
	}

	public void setLectureLists(List<LectureList> lectureLists) {
		this.lectureLists = lectureLists;
	}	
	
}
