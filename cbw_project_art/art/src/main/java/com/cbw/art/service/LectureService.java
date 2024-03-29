package com.cbw.art.service;

import java.util.List;


import com.cbw.art.dto.BaseResponse;
import com.cbw.art.dto.CategoryDto;
import com.cbw.art.dto.LectureDto;
import com.cbw.art.model.Lecture;
import com.cbw.art.model.User;

public interface LectureService {
	//강의 생성
	public BaseResponse<Void> createLecture(LectureDto lectureDto);
	//강의 목록
	public BaseResponse<List<Lecture>> getAllLecture();
	//강의 삭제
	public BaseResponse<Long> deleteLecture(Long id);
	//강의 하나의 정보만을 가져옴
	Lecture getLectureById(long id);
	//카테고리 추가
	public BaseResponse<Void> addCategory(CategoryDto categoryDto);
	//선생님별 강의 목록
	public BaseResponse<List<Lecture>> getLecturesByTeacher(Long teacherId);
}
