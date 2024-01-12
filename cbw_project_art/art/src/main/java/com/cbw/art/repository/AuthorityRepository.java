package com.cbw.art.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cbw.art.enumstatus.AuthorityType;
import com.cbw.art.model.Authority;

public interface AuthorityRepository extends JpaRepository<Authority, String>{
	Optional<Authority> findByAuthorityType(AuthorityType authorityType);
}
