package com.cbw.art.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "authority")
public class Authority {
	@Id
	@Column(name = "authority_name", length = 50)
	private String authorityName;

	public Authority(String authorityName) {
		super();
		this.authorityName = authorityName;
	}

	public Authority() {
		super();
	}

	public String getAuthorityName() {
		return authorityName;
	}

	public void setAuthorityName(String authorityName) {
		this.authorityName = authorityName;
	}
	
	
}
