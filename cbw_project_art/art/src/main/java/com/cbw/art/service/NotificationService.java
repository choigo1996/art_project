package com.cbw.art.service;

import java.util.List;

import com.cbw.art.dto.BaseResponse;
import com.cbw.art.dto.NotificationDto;
import com.cbw.art.model.Notification;


public interface NotificationService {
	//게시글 생성
	public BaseResponse<Void> createNoti(NotificationDto notificationDto);
	//게시글 목록
	public BaseResponse<List<Notification>>getAllNotifi();
	//게시글 삭제
	public BaseResponse<Long> deleteNotifi(Long id);
}
