package com.cbw.art.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cbw.art.dto.BaseResponse;
import com.cbw.art.dto.IntroDto;
import com.cbw.art.enumstatus.ResultCode;
import com.cbw.art.exception.InvalidRequestException;
import com.cbw.art.model.Intro;
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
		//이미 강의 소개글이 존재하는지 확인
		if(introRepository.count() > 0) {
			throw new InvalidRequestException("Duplicate Introduction", "이미 강의 소개글이 생성되었습니다.");
		}
		//강의가 존재하는지 확인
		lectureRepository.findById(introDto.getLectureId())
			.orElseThrow(() -> new InvalidRequestException("Invalid Lecture", "존재하는 강의가 없습니다."));
		
		Intro intro = new Intro();
		intro.setText(introDto.getText());
		intro.setLecture(lectureRepository.getOne(introDto.getLectureId()));
		introRepository.save(intro);
		
		return new BaseResponse<Void>(
				ResultCode.SUCCESS.name(),
				null,
				"강의 소개글이 생성 되었습니다.");
	}

	@Override
	public BaseResponse<IntroDto> getIntro() {
	    Intro intro = introRepository.findById(1L)
	            .orElseThrow(() -> new InvalidRequestException("Invalid Introduction ID", "소개글이 존재하지 않습니다."));

	    IntroDto introDto = new IntroDto();
	    introDto.setText(intro.getText());
	    introDto.setLectureId(intro.getLecture().getId());
	    

	    return new BaseResponse<>(
	            ResultCode.SUCCESS.name(),
	            introDto,
	            "소개글을 가져왔습니다.");
	}


}
