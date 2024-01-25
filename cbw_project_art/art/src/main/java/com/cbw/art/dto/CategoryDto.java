package com.cbw.art.dto;

import java.util.List;


import jakarta.validation.constraints.NotBlank;

public class CategoryDto {
	
	private List<String> categoryType;
	private Long lectureId;
	
	public CategoryDto() {
		super();
	}

	public CategoryDto(@NotBlank List<String> categoryType, Long lectureId) {
		super();
		this.categoryType = categoryType;
		this.lectureId = lectureId;
	}

	public List<String> getCategoryType() {
		return categoryType;
	}

	public void setCategoryType(List<String> categoryType) {
		this.categoryType = categoryType;
	}

	public Long getLectureId() {
		return lectureId;
	}

	public void setLectureId(Long lectureId) {
		this.lectureId = lectureId;
	}

	
	
}
