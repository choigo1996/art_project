package com.cbw.art.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.cbw.art.dto.BaseResponse;
import com.cbw.art.dto.UserDto;
import com.cbw.art.enumstatus.ResultCode;
import com.cbw.art.service.impl.UserServiceImpl;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000",
		methods = {RequestMethod.GET,RequestMethod.POST,RequestMethod.DELETE})
public class UserController {
	private final UserServiceImpl userServiceImpl;

	public UserController(UserServiceImpl userServiceImpl) {
		super();
		this.userServiceImpl = userServiceImpl;
	}
	
	//가입하기
	@PostMapping("/signup")
	public ResponseEntity<BaseResponse<UserDto>> signup(@RequestBody @Valid UserDto userDto){
		return ResponseEntity.ok(new BaseResponse<>(
				ResultCode.SUCCESS.name(),
				userServiceImpl.signUp(userDto),
				ResultCode.SUCCESS.getMsg()));
	}
	//아이디 중복확인
	@GetMapping("/cheackDuplicate/{loginId}")
	public ResponseEntity<Map<String,String>> checkDuplicate(@PathVariable String loginId) {
		Map<String, String> response = new HashMap<>();
		
		//아이디 중복 확인 로직
		boolean isDuplicate = userServiceImpl.isUserIdDuplicate(loginId);
		
		if(isDuplicate) {
			response.put("message", "중복된 아이디입니다.");
		}else {
			response.put("message", "사용가능한 아이디입니다");
		}
		
		return ResponseEntity.ok(response);
	}
	//자신의 정보를 볼 수 있는 것
	@GetMapping("/user")
	@PreAuthorize("hasAnyRole('USER','ADMIN','TEACHER')")
	public ResponseEntity<BaseResponse<UserDto>> getCurrentUserInfo(HttpServletRequest request){
		return ResponseEntity.ok(new BaseResponse<>(
					ResultCode.SUCCESS.name(),
					userServiceImpl.getCurrentUserWithAuthorities(),
					ResultCode.SUCCESS.getMsg()));
	}
	//다른 사람의 정보를 볼 수 있음(관리자)
	@GetMapping("/user/{loginId}")
	@PreAuthorize("hasAnyRole('ADMIN')")
	public ResponseEntity<BaseResponse<UserDto>> getUserInfo(@PathVariable String loginId){
		return ResponseEntity.ok(new BaseResponse<>(
				ResultCode.SUCCESS.name(),
				userServiceImpl.getUserWithAuthorities(loginId), 
				ResultCode.SUCCESS.getMsg()
		));
	}
	
}
