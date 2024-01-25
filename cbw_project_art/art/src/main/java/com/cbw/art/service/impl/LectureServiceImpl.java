package com.cbw.art.service.impl;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cbw.art.dto.BaseResponse;
import com.cbw.art.dto.CategoryDto;
import com.cbw.art.dto.LectureDto;
import com.cbw.art.enumstatus.CategoryType;
import com.cbw.art.enumstatus.ResultCode;
import com.cbw.art.exception.InvalidRequestException;
import com.cbw.art.model.Category;
import com.cbw.art.model.Lecture;
import com.cbw.art.repository.CategoryRepository;
import com.cbw.art.repository.LectureRepository;
import com.cbw.art.repository.ReviewRepository;
import com.cbw.art.service.LectureService;
import com.fasterxml.jackson.annotation.JacksonInject.Value;

@Service
@Transactional
public class LectureServiceImpl implements LectureService{
	
	private final LectureRepository lectureRepository;
	private final ReviewRepository reviewRepository;
	private final CategoryRepository categoryRepository;

	@Autowired
	public LectureServiceImpl(LectureRepository lectureRepository, ReviewRepository reviewRepository,
			CategoryRepository categoryRepository) {
		super();
		this.lectureRepository = lectureRepository;
		this.reviewRepository = reviewRepository;
		this.categoryRepository = categoryRepository;
	}	
	
	//강의 생성
	@Override
	public BaseResponse<Void> createLecture(LectureDto lectureDto) {
	    Category category = categoryRepository.findByCategoryType(CategoryType.ALL)
	            .orElseThrow(() -> new InvalidRequestException("Default category not found", "전체항목에 없음."));
	    Lecture lecture = new Lecture();
	    lecture.setTitle(lectureDto.getTitle());
	    lecture.setTeacher(lectureDto.getTeacher());
	    lecture.setPrice(lectureDto.getPrice());
	    lecture.setImage(lectureDto.getImage());
		lecture.setCategorys(Collections.singleton(category));

	    lectureRepository.save(lecture);
	    return new BaseResponse<>(
	            ResultCode.SUCCESS.name(),
	            null,
	            "강의생성 완료!");
	}

	//강의 목록
	@Override
	public BaseResponse<List<Lecture>> getAllLecture() {
		List<Lecture> lectures = lectureRepository.findAll();
		if(lectures.isEmpty()) {
			throw new InvalidRequestException("lecture empty", "존재하지 않는 강의 입니다.");
		}
		return new BaseResponse<>(
				ResultCode.SUCCESS.name(),
				lectures,
				ResultCode.SUCCESS.getMsg());
	}
	
	//강의 삭제
	@Override
	public BaseResponse<Long> deleteLecture(Long id) {
		Optional<Lecture> lecture = lectureRepository.findById(id);
		if(lecture.isEmpty()) {
			throw new InvalidRequestException(Long.toString(id), "해당 강의는 존재하지 않습니다.");
		}
		
		lectureRepository.deleteById(id);
		reviewRepository.deleteById(id);
		
		return new BaseResponse<>(
				ResultCode.SUCCESS.name(),
				id,
				"강의와 리뷰가 삭제되었습니다.");
	}
	
	//강의 하나의 정보를 불러옴
	@Override
	public Lecture getLectureById(long id) {
		return lectureRepository.findById(id)
				.orElseThrow(() -> new InvalidRequestException(String.valueOf(id), "해당 ID의 강의는 존재하지 않습니다."));
	}
	
	//카테고리 추가(Enum에 있는 CategoryType중에 있는 것을 자유롭게 추가)
	@Override
	public BaseResponse<Void> addCategory(CategoryDto categoryDto) {
		//강의 ID로 강의를 찾음
		Lecture lecture = lectureRepository.findById(categoryDto.getLectureId())
				.orElseThrow(() -> new InvalidRequestException("Invalid Lecture", "존재하지 않는 강의입니다."));
				
	    // 모든 카테고리를 가져와서 CategoryDto를 생성하여 리스트에 추가
		List<Category> categories = categoryRepository.findAll();
		List<CategoryDto> categoryDtos = new ArrayList<>();
		
		for(Category category : categories) {
			CategoryDto categoryDto1 = new CategoryDto();
			categoryDto1.setCategoryType(Collections.singletonList(category.getCategoryType().name()));
			categoryDtos.add(categoryDto1);
			List<String> categoryTypes = categoryDto.getCategoryType();
		}
		
		
		lectureRepository.save(lecture);
		return new BaseResponse<>(
				ResultCode.SUCCESS.name(),
				null,
				"카테고리 추가완료!");
	}
}
