package com.cbw.art.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import com.cbw.art.model.User;

public interface UserRepository extends JpaRepository<User, Long>{

	@EntityGraph(attributePaths = "authorities")
	Optional<User> findOneWithAuthoritiesByLoginId(String loginId);
	Optional<User> findOneWithAuthoritiesByEmail(String Email);
	
	Boolean existsByLoginId(String loginId);
	Boolean existsByEmail(String email);
	
	//선생님의 로그인 ID에 해당하는 사용자를 찾는 메서드
	Optional<User> findByLoginId(String loginId); 

}