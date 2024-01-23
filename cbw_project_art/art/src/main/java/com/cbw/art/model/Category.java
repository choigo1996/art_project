package com.cbw.art.model;

import java.util.HashSet;
import java.util.Set;

import com.cbw.art.enumstatus.CategoryType;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "category")
public class Category {
	
	@Id
	@Enumerated(EnumType.STRING)
	@Column(name = "category_type")
	private CategoryType categoryType;

	@ManyToOne
	@JoinColumn(name = "lecture_id")
	private Lecture lecture;
	
	public Category() {
		super();
	}

	public Category(CategoryType categoryType, Lecture lecture) {
		super();
		this.categoryType = categoryType;
		this.lecture = lecture;
	}

	public CategoryType getCategoryType() {
		return categoryType;
	}

	public void setCategoryType(CategoryType categoryType) {
		this.categoryType = categoryType;
	}

	public Lecture getLecture() {
		return lecture;
	}

	public void setLecture(Lecture lecture) {
		this.lecture = lecture;
	}

	

}
