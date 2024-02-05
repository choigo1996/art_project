package com.cbw.art.dto;

public class AuthorityDto {
	
	private String authorityName;
	private Long userId;
	
	public AuthorityDto() {
		super();
	}

	public AuthorityDto(String authorityName, Long userId) {
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

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}
	
	
}
