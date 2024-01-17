package com.cbw.art.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.cbw.art.dto.BaseResponse;
import com.cbw.art.dto.LectureListDto;
import com.cbw.art.enumstatus.ResultCode;
import com.cbw.art.exception.InvalidRequestException;
import com.cbw.art.model.Lecture;
import com.cbw.art.model.LectureList;
import com.cbw.art.repository.LectureListRepository;
import com.cbw.art.repository.LectureRepository;
import com.cbw.art.service.LectureListService;

@Service
public class LectureListServiceImpl implements LectureListService{
	
	private final LectureListRepository lectureListRepository;
	private final LectureRepository lectureRepository;
	
	public LectureListServiceImpl(LectureListRepository lectureListRepository, LectureRepository lectureRepository) {
		super();
		this.lectureListRepository = lectureListRepository;
		this.lectureRepository = lectureRepository;
	}

	@Override
	public BaseResponse<Void> createLeList(LectureListDto lectureListDto) {
		if (lectureListDto.getTeacher() == null || lectureListDto.getTeacher().isEmpty()) {
			throw new InvalidRequestException("Invalid Teacher", "강의를 등록할 선생님이 없습니다.");
		}
		Lecture lecture = lectureRepository.findById(lectureListDto.getLecture())
				.orElseThrow(() -> new InvalidRequestException("Invalid LectureList", "존재하지않는 강의목록입니다."));
		LectureList lectureList = new LectureList();
		lectureList.setTeacher(lectureListDto.getTeacher());
		lectureList.setTitle(lectureListDto.getTitle());
		lectureList.setDuration(lectureListDto.getDuration());
		lectureList.setVideo(lectureListDto.getVideo());
		
		lectureList.setLecture(lecture);
		
		lectureListRepository.save(lectureList);
		return new BaseResponse<>(
				ResultCode.SUCCESS.name(),
				null,
				"강의 목록이 추가되었습니다.");
	}

	@Override
	public BaseResponse<List<LectureList>> getAllLeList() {
		List<LectureList> lectureLists = lectureListRepository.findAll();
		if(lectureLists.isEmpty()) {
				throw new InvalidRequestException("Not Found", "등록된 강의가 없음");
		}
		return new BaseResponse<>(
				ResultCode.SUCCESS.name(),
				lectureLists,
				ResultCode.SUCCESS.getMsg());
	}

	@Override
	public BaseResponse<Long> deleteLeList(Long id) {
		LectureList lectureList = lectureListRepository.findById(id)
				.orElseThrow(() ->new InvalidRequestException("Invalid Lelist", "존재하지 않는 강의"));
		return new BaseResponse<>(
				ResultCode.SUCCESS.name(),
				id,
				"강의목록의 강의가 삭제되었습니다.");
	}

	
		
}