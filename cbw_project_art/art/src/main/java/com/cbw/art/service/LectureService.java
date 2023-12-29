package com.cbw.art.service;

import java.util.List;

import com.cbw.art.dto.LectureDto;
import com.cbw.art.model.Lecture;
import com.cbw.art.model.LectureList;

public interface LectureService{
	
	//강의 목록 DB에 저장
	Lecture saveLecture(Lecture lecture);
	//강의의 모든 정보를 가져옴.
	List<LectureDto> getAllLectuer();
	//강의 하나의 정보만을 가져옴.
	Lecture getLectureById(long id);
	//id로 해당 강의 정보를 업데이트
	Lecture updateLectureById(Lecture lecture,long id);
	//강의의 정보를 삭제
	void deleteLectureById(long id);
	//강의 목록들을 강의안에 모두 DB로 저장
	List<LectureList> getListsByLectureId(long lectureId);
}
