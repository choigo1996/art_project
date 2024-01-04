package com.cbw.art.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.cbw.art.model.User;

public interface UserRepository extends JpaRepository<User, Long>{

	@EntityGraph(attributePaths = "authorities")
	Optional<User> findOneWithAuthoritiesByLoginId(String loginId);
	Optional<User> findOneWithAuthoritiesByEmail(String Email);
	
	@Query("SELECT u FROM User u JOIN FETCH u.authorities WHERE u.loginId = :loginId")
	Optional<User> findAuthoritiesByLoginId(@Param("loginId") String loginId);
	
	User findByLoginId(String loginId);
	
	boolean existsByLoginId(String loginId);
}