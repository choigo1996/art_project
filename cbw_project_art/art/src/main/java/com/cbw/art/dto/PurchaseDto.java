package com.cbw.art.dto;


public class PurchaseDto {
	
	private Long lectureId;
	private Long userId;
	
	public PurchaseDto() {
		super();
	}

	public PurchaseDto(Long lectureId, Long userId) {
		super();
		this.lectureId = lectureId;
		this.userId = userId;
	}

	public Long getLectureId() {
		return lectureId;
	}

	public void setLectureId(Long lectureId) {
		this.lectureId = lectureId;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

}