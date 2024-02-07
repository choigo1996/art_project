package com.cbw.art.dto;


public class LectureDto {
	private long id;
	
	private String title;
	
	private String teacherId;
	
	private int price;
	
	private String image;
	
	public LectureDto() {
		super();
	}

	public LectureDto(long id, String title, String teacherId, int price, String image) {
		super();
		this.id = id;
		this.title = title;
		this.teacherId = teacherId;
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

	public String getTeacherId() {
		return teacherId;
	}

	public void setTeacherId(String teacherId) {
		this.teacherId = teacherId;
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
