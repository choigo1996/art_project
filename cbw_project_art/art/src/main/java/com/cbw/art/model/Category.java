package com.cbw.art.model;



import com.cbw.art.enumstatus.CategoryType;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "category")
public class Category {
	
	@Id
	@Enumerated(EnumType.STRING)
	@Column(name = "category_type")
	private CategoryType categoryType;
	
	public Category() {
		super();
	}

	public Category(CategoryType categoryType) {
		super();
		this.categoryType = categoryType;
	}

	public CategoryType getCategoryType() {
		return categoryType;
	}

	public void setCategoryType(CategoryType categoryType) {
		this.categoryType = categoryType;
	}
	
	

}
