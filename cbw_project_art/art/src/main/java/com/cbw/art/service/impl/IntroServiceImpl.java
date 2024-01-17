package com.cbw.art.service.impl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cbw.art.dto.BaseResponse;
import com.cbw.art.dto.IntroDto;
import com.cbw.art.enumstatus.ResultCode;
import com.cbw.art.exception.InvalidRequestException;
import com.cbw.art.model.Intro;
import com.cbw.art.model.Lecture;
import com.cbw.art.repository.IntroRepository;
import com.cbw.art.repository.LectureRepository;
import com.cbw.art.service.IntroService;

@Service
public class IntroServiceImpl implements IntroService{
	
	private final IntroRepository introRepository;
	private final LectureRepository lectureRepository;
	
	@Autowired
	public IntroServiceImpl(IntroRepository introRepository, LectureRepository lectureRepository) {
		super();
		this.introRepository = introRepository;
		this.lectureRepository = lectureRepository;
	}

	@Override
	public BaseResponse<Void> createIntro(IntroDto introDto) {
		//강의가 존재하는지 확인
		Optional<Lecture> lecture = lectureRepository.findById(introDto.getLectureId());
		if(lecture.isEmpty()) {
			throw new InvalidRequestException("Invalid Lecture", "존재하는 강의가 없습니다.");
		}
		//이미 강의 소개글이 존재하는지 확인
		Optional<Intro> introTemp = introRepository.findByLecture(lecture.get());
		if(introTemp.isPresent()) {
			throw new InvalidRequestException("Duplicate Introduction", "이미 강의 소개글이 생성되었습니다.");
		}
		//강의가 존재하는지 확인
			
		Intro intro = new Intro();
		intro.setText(introDto.getText());
		intro.setLecture(lecture.get());
		introRepository.save(intro);
		
		return new BaseResponse<Void>(
				ResultCode.SUCCESS.name(),
				null,
				"강의 소개글이 생성 되었습니다.");
	}

	@Override
	public Intro getIntro(long id) {
		return introRepository.findById(id)
				.orElseThrow(() -> new InvalidRequestException(String.valueOf(id), "해당 아이디의 강의소개글은 존재하지않습니다."));
	}

}
