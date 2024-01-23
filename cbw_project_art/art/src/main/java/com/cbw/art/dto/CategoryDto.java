package com.cbw.art.dto;

import com.cbw.art.enumstatus.CategoryType;

public class CategoryDto {
	
	private String categoryName;
	private CategoryType categoryType;
	
	public CategoryDto() {
		super();
	}
	
	public CategoryDto(String categoryName, CategoryType categoryType) {
		super();
		this.categoryName = categoryName;
		this.categoryType = categoryType;
	}
	public String getCategoryName() {
		return categoryName;
	}
	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}
	public CategoryType getCategoryType() {
		return categoryType;
	}
	public void setCategoryType(CategoryType categoryType) {
		this.categoryType = categoryType;
	}

}
