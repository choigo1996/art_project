package com.cbw.art.service;

import com.cbw.art.dto.UserDto;

public interface UserService {
	//회원가입
	public UserDto signUp(UserDto userDto);
	//로그인
	public UserDto getUserWithAuthorities(String username);
	//자기 정보보기
	public UserDto getCurrentUserWithAuthorities();
	//중복체크
	public boolean isLoginTaken(String loginId);
	public boolean isEmailTaken(String email);
}
