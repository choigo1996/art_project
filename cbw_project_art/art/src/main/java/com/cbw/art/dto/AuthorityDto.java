package com.cbw.art.dto;

public class AuthorityDto {
	
	private String authorityName;
	private String userId;
	
	public AuthorityDto() {
		super();
	}

	public AuthorityDto(String authorityName, String userId) {
		super();
		this.authorityName = authorityName;
		this.userId = userId;
	}

	public String getAuthorityName() {
		return authorityName;
	}

	public void setAuthorityName(String authorityName) {
		this.authorityName = authorityName;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	
}