package com.cbw.art.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cbw.art.dto.LectureDto;
import com.cbw.art.model.Lecture;
import com.cbw.art.model.LectureList;
import com.cbw.art.repository.LectureListRepository;
import com.cbw.art.repository.LectureRepository;
import com.cbw.art.service.LectureService;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class LectureServiceImpl implements LectureService{
	
	private LectureRepository lectureRepository;
	private LectureListRepository leListRepository;
	
	@Autowired
	public LectureServiceImpl(LectureRepository lectureRepository, LectureListRepository leListRepository) {
		super();
		this.lectureRepository = lectureRepository;
		this.leListRepository = leListRepository;
	}
	//DB저장
	public Lecture saveLecture(Lecture lecture) {
		return lectureRepository.save(lecture);
	}
	//모든 정보 가져오기
	public List<LectureDto> getAllLectuer() {
		List<Lecture> lectures = lectureRepository.findAll();
		List<LectureDto> lectureDtos = new ArrayList<>();
		
	    //강의리스트를 for문을 통해서 가져온다음,아래의 부분처럼 lectureDto를 활용해서 lectureList를 땡겨옴.
		for(Lecture lecture : lectures) {
			LectureDto lectureDto = new LectureDto();
			lectureDto.setId(lecture.getId());
			lectureDto.setCategory(lecture.getCategory());
			lectureDto.setImage(lecture.getImage());
			lectureDto.setPrice(lecture.getPrice());
			lectureDto.setTeacher(lecture.getTeacher());
			lectureDto.setTitle(lecture.getTitle());
			
			List<LectureList> lectureLists = leListRepository.findByLectureId(lecture.getId());
			lectureDto.setLectureLists(lectureLists);
			
			lectureDtos.add(lectureDto);
		}
		return lectureDtos;
	}

	public Lecture getLectureById(long id) {
		return lectureRepository.findById(id).orElseThrow(()->null);
	}

	public Lecture updateLectureById(Lecture lecture, long id) {
		Lecture existingLecture = lectureRepository.findById(id).orElseThrow(()->null);
		existingLecture.setCategory(lecture.getCategory());
		existingLecture.setImage(lecture.getImage());
		existingLecture.setPrice(lecture.getPrice());
		existingLecture.setTeacher(lecture.getTeacher());
		existingLecture.setTitle(lecture.getTitle());
		lectureRepository.save(existingLecture);
		return existingLecture;
	}

	public void deleteLectureById(long id) {
		lectureRepository.findById(id).orElseThrow(() ->null);
		lectureRepository.deleteById(id);
	}

	@Override
	public List<LectureList> getListsByLectureId(long lectureId) {

		return leListRepository.findByLectureId(lectureId);
	}
	

}
