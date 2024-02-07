package com.cbw.art.model;



import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "lecture_list")
public class LectureList {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column
	private String title;
	
	@Column
	private String video;
		
	@Column
	private String duration;
	
	@ManyToOne
	@JoinColumn(name = "lecture_id")
	private Lecture lecture;
	
	@ManyToOne
	@JoinColumn
	private User teacher;
	
	public LectureList() {
		super();
	}

	public LectureList(long id, String title, String video, String duration, Lecture lecture, User teacher) {
		super();
		this.id = id;
		this.title = title;
		this.video = video;
		this.duration = duration;
		this.lecture = lecture;
		this.teacher = teacher;
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

	public Lecture getLecture() {
		return lecture;
	}

	public void setLecture(Lecture lecture) {
		this.lecture = lecture;
	}

	public User getTeacher() {
		return teacher;
	}

	public void setTeacher(User teacher) {
		this.teacher = teacher;
	}

	
}
