package com.cbw.art.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.cbw.art.dto.BaseResponse;
import com.cbw.art.dto.NotificationDto;
import com.cbw.art.model.Notification;
import com.cbw.art.service.impl.NotificationServiceImpl;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/board")
@CrossOrigin(origins="http://localhost:3000",
methods= {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE})
public class NotificationController {
	private final NotificationServiceImpl notificationServiceImpl;
	
	@Autowired
	public NotificationController(NotificationServiceImpl notificationServiceImpl) {
		super();
		this.notificationServiceImpl = notificationServiceImpl;
	}
	
	//공지사항 생성
	@PostMapping
	@PreAuthorize("hasAnyRole('ADMIN')")
	public ResponseEntity<BaseResponse<Void>> createNoti(@RequestBody @Valid NotificationDto notificationDto,Authentication authentication){
		return new ResponseEntity<>(
				notificationServiceImpl.createNoti(authentication, notificationDto),
				HttpStatus.CREATED);
	}
	//공지사항 목록
	@GetMapping("/list")
	public ResponseEntity<BaseResponse<List<Notification>>> getAllNotifi()
	{
		return new ResponseEntity<>(
				notificationServiceImpl.getAllNotifi(),
				HttpStatus.OK); 
	}

	//공지사항 삭제
	@DeleteMapping("/delete/{id}")
	@PreAuthorize("hasAnyRole('ADMIN')")
	public ResponseEntity<BaseResponse<Long>> deleteNotifi (@PathVariable Long id) {
		return new ResponseEntity<>(
				notificationServiceImpl.deleteNotifi(id),
				HttpStatus.OK);
	}
	//공지사항 하나만 가져옴
	@GetMapping("/list/{id}")
	public ResponseEntity<Notification> getNotiById (@PathVariable long id) {
		return new ResponseEntity<Notification>(
				notificationServiceImpl.getNotiById(id),HttpStatus.OK);
	}
}
