package com.cbw.art.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.cbw.art.dto.BaseResponse;
import com.cbw.art.dto.NotificationDto;
import com.cbw.art.enumstatus.ResultCode;
import com.cbw.art.exception.InvalidRequestException;
import com.cbw.art.model.Notification;
import com.cbw.art.model.User;
import com.cbw.art.repository.NotificationRepository;
import com.cbw.art.repository.UserRepository;
import com.cbw.art.service.NotificationService;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class NotificationServiceImpl implements NotificationService{
	
	private final NotificationRepository notificationRepository;
	private final UserRepository userRepository;
	
	@Autowired
	public NotificationServiceImpl(NotificationRepository notificationRepository, UserRepository userRepository) {
		super();
		this.notificationRepository = notificationRepository;
		this.userRepository = userRepository;
	}

	//공지사항 생성
	public BaseResponse<Void> createNoti(Authentication authentication, NotificationDto notificationDto) {
		//사용자 정보가 null이거나 인증되지 않은 경우
		if(authentication == null || !authentication.isAuthenticated()) {
			throw new InvalidRequestException("Invalid Authentication", "인증되지않은 사용자입니다.");
		}
		//사용자 정보 가져오기
		String loginId = authentication.getName();
		Optional<User> user = userRepository.findOneWithAuthoritiesByLoginId(loginId);
		if(!user.isPresent()) {
			throw new InvalidRequestException("Invalid Writer", "글쓰기 권한이 없습니다");
		}
		Notification notification = new Notification();
		notification.setCreateAt(LocalDateTime.now());
		notification.setTitle(notificationDto.getTitle());
		notification.setText(notificationDto.getText());
		notification.setUser(user.get());
		notificationRepository.save(notification);
		 return new BaseResponse<>(
	                ResultCode.SUCCESS.name(),
	                null,
	                "공지사항이 생성 완료되었습니다");	
	}


	//공지목록 읽어오기
	public BaseResponse<List<Notification>> getAllNotifi() {
		List<Notification> notifications = notificationRepository.findAll();
		if(notifications.isEmpty()) {
			throw new InvalidRequestException("noti empty", "존재하지 않는 공지사항입니다.");
		}
		return new BaseResponse<>(
				ResultCode.SUCCESS.name(),
				notifications,
				ResultCode.SUCCESS.getMsg());
	}

	//공지사항 삭제
	public BaseResponse<Long> deleteNotifi(Long id) {
		Optional<Notification> notification = notificationRepository.findById(id);
		if(notification.isEmpty()) {
			throw new InvalidRequestException(Long.toString(id), "해당 공지사항은 존재하지 않습니다.");
		}
		notificationRepository.deleteById(id);
		return new BaseResponse<>(
				ResultCode.SUCCESS.name(),
				id,
				"공지사항이 삭제되었습니다.");
	}
	
	//공지하나만 가져옴
	@Override
	public Notification getNotiById(long id) {
		return notificationRepository.findById(id).orElseThrow(() -> null);
	}

	
	
	

	
}
