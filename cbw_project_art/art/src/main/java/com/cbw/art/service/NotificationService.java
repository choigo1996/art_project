package com.cbw.art.service;

import java.util.List;

import org.springframework.security.core.Authentication;

import com.cbw.art.dto.BaseResponse;
import com.cbw.art.dto.NotificationDto;
import com.cbw.art.model.Notification;


public interface NotificationService {
	//게시글 생성
	public BaseResponse<Void> createNoti(Authentication authentication,NotificationDto notificationDto);
	//게시글 목록
	public BaseResponse<List<Notification>>getAllNotifi();
	//게시글 삭제
	public BaseResponse<Long> deleteNotifi(Long id);
	//게시글 하나의 정보만을 가져온다.
	Notification getNotiById(long id);
}
