package com.cbw.art.model;


import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "lecture")
public class Lecture {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column(nullable = false)
	private String title;
	
	@JoinColumn(name="teacher_id",nullable = false)
	@ManyToOne
	private User teacher;
	
	@Column(nullable = false)
	private int price;
	
	@Column(nullable = false,length = 1500)
	private String image;
	
	@ManyToMany
	@JoinTable(
			name = "lecture_category",
			joinColumns = @JoinColumn(name = "lecture_id"),
			inverseJoinColumns = @JoinColumn(name = "category_type"))
	private Set<Category> categorys = new HashSet<>();

	
	public Lecture() {
		super();
	}


	public Lecture(long id, String title, User teacher, int price, String image, Set<Category> categorys) {
		super();
		this.id = id;
		this.title = title;
		this.teacher = teacher;
		this.price = price;
		this.image = image;
		this.categorys = categorys;
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


	public User getTeacher() {
		return teacher;
	}


	public void setTeacher(User teacher) {
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


	public Set<Category> getCategorys() {
		return categorys;
	}


	public void setCategorys(Set<Category> categorys) {
		this.categorys = categorys;
	}


	
}
