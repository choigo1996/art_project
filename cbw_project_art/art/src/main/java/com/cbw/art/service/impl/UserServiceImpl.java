package com.cbw.art.service.impl;


import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cbw.art.dto.UserDto;
import com.cbw.art.enumstatus.AuthorityType;
import com.cbw.art.exception.InvalidRequestException;
import com.cbw.art.model.Authority;
import com.cbw.art.model.User;
import com.cbw.art.repository.AuthorityRepository;
import com.cbw.art.repository.UserRepository;
import com.cbw.art.securityUtil.SecurityUtil;
import com.cbw.art.service.UserService;


@Service
public class UserServiceImpl implements UserService{
	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	private final AuthorityRepository authorityRepository;
	
	@Autowired
	public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder,
			AuthorityRepository authorityRepository) {
		super();
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
		this.authorityRepository = authorityRepository;
	}
	
	//회원가입
	@Transactional
	public UserDto signUp(UserDto userDto) {
		if(userRepository.findOneWithAuthoritiesByLoginId(userDto.getLoginId())
				.orElse(null) != null) {
			throw new InvalidRequestException("Duplicated member","중복되는 아이디입니다.");
		}
		else if(userRepository.findOneWithAuthoritiesByEmail(userDto.getEmail())
				.orElse(null) != null) {
			throw new InvalidRequestException("Duplicated member","중복되는 이메일 입니다.");
		}
		
		Authority userAuthority = authorityRepository.findByAuthorityType(AuthorityType.ROLE_USER)
				.orElseThrow(() -> new InvalidRequestException("Default authority not found", "기본 권한을 찾을 수 없습니다."));		
		//새로운 사용자에게 기본 권한 부여
		User user = new User();
		user.setLoginId(userDto.getLoginId());
		user.setPassword(passwordEncoder.encode(userDto.getPassword()));
		user.setName(userDto.getName());
		user.setBirthDate(userDto.getBirthDate());
		user.setEmail(userDto.getEmail());
	    user.setAuthorities(Collections.singleton(userAuthority));
		user.setActivated(true);
		return UserDto.from(userRepository.save(user));
	}
	//자신의 정보를 볼 수 있는 것
	@Transactional(readOnly = true)
	public UserDto getUserWithAuthorities(String username) {
		return UserDto.from(userRepository.findOneWithAuthoritiesByLoginId(username)
				.orElseThrow(() -> new InvalidRequestException(username,"member not found")));
	}
	//다른 사람의 정보를 볼 수 있음(관리자)
	@Transactional(readOnly = true)
	public UserDto getCurrentUserWithAuthorities() {
		return UserDto.from(
				SecurityUtil.getCurrentUsername()
				.flatMap(userRepository::findOneWithAuthoritiesByLoginId)
				.orElseThrow(() -> new InvalidRequestException("No current user","Current member not found")));
	}
	//중복체크 
	@Override
	public boolean isUserIdDuplicate(String loginId) {
		return userRepository.existsByLoginId(loginId);
	}
	@Override
	public boolean isEmailTaken(String email) {
		return userRepository.existsByEmail(email);
	}

	@Override
	@Transactional
	public void updateUserRole(long userId, AuthorityType authorityType) {
	    User user = userRepository.findById(userId)
	            .orElseThrow(() -> new InvalidRequestException("User not found", "해당 아이디를 찾을 수 없습니다."));

	    // 기존 권한 목록을 모두 제거
	    user.getAuthorities().clear();

	    // 새로운 권한을 생성하고 부여
	    Authority authority = new Authority(authorityType);
	    user.getAuthorities().add(authority);

	    // 업데이트된 권한 목록을 설정
	    userRepository.save(user);
	}
	
}
