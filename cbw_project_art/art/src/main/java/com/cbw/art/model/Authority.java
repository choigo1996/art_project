package com.cbw.art.model;

import com.cbw.art.enumstatus.AuthorityType;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "authority")
public class Authority {
	@Id
	@Enumerated(EnumType.STRING)
	@Column(name = "authority_type")
	private AuthorityType authorityType;

	public Authority() {
		super();
	}

	public Authority(AuthorityType authorityType) {
		super();
		this.authorityType = authorityType;
	}

	public AuthorityType getAuthorityType() {
		return authorityType;
	}

	public void setAuthorityType(AuthorityType authorityType) {
		this.authorityType = authorityType;
	}
	
}
