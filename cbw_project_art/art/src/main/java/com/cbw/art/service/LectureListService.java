package com.cbw.art.service;

import java.util.List;

import org.springframework.security.core.Authentication;

import com.cbw.art.dto.BaseResponse;
import com.cbw.art.dto.LectureListDto;
import com.cbw.art.model.LectureList;

public interface LectureListService {
	//강의안에 있는 강의 생성
	public BaseResponse<Void> createLeList(Authentication authentication,LectureListDto lectureListDto);
	//목록
	public BaseResponse<List<LectureList>> getAllLeList();
	//삭제
	public BaseResponse<Long> deleteLeList(Long id);
}
