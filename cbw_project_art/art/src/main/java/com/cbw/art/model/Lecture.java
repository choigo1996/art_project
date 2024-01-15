package com.cbw.art.model;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "lecture")
public class Lecture {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column
	private String title;
	
	@Column
	private String category;
	
	@Column
	private String teacher;
	
	@Column
	private String image;
	
	@Column
	private int price;
	
	@OneToMany(mappedBy = "lecture")
	private List<LectureReview> reviews;
	
	public Lecture() {
		super();
	}

	public Lecture(long id, String title, String category, String teacher, String image, int price,
			List<LectureReview> reviews) {
		super();
		this.id = id;
		this.title = title;
		this.category = category;
		this.teacher = teacher;
		this.image = image;
		this.price = price;
		this.reviews = reviews;
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

	public String getTeacher() {
		return teacher;
	}

	public void setTeacher(String teacher) {
		this.teacher = teacher;
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

	public List<LectureReview> getReviews() {
		return reviews;
	}

	public void setReviews(List<LectureReview> reviews) {
		this.reviews = reviews;
	}

	

}
