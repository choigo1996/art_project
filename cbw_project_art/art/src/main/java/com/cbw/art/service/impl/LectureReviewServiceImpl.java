package com.cbw.art.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cbw.art.dto.BaseResponse;
import com.cbw.art.dto.LectureReviewDto;
import com.cbw.art.enumstatus.ResultCode;
import com.cbw.art.exception.InvalidRequestException;
import com.cbw.art.model.Lecture;
import com.cbw.art.model.LectureReview;
import com.cbw.art.repository.LectureRepository;
import com.cbw.art.repository.LectureReviewRepository;
import com.cbw.art.service.LectureReviewService;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class LectureReviewServiceImpl implements LectureReviewService{
	
	private final LectureRepository lectureRepository;
	private final LectureReviewRepository lectureReviewRepository;
	
	@Autowired
	public LectureReviewServiceImpl(LectureRepository lectureRepository,
			LectureReviewRepository lectureReviewRepository) {
		super();
		this.lectureRepository = lectureRepository;
		this.lectureReviewRepository = lectureReviewRepository;
	}
	
	//후기 생성
	@Override
	public BaseResponse<Void> createReview(LectureReviewDto lectureReviewDto) {
		LectureReview lectureReview = new LectureReview();
		lectureReview.setWriter(lectureReviewDto.getWriter());
		lectureReview.setText(lectureReviewDto.getText());
		lectureReview.setRating(lectureReviewDto.getRating());
		
		long letureId = lectureReviewDto.getLectureId();
		Lecture lecture = lectureRepository.findById(letureId)
				.orElseThrow(() ->  new InvalidRequestException("Not lectureId", "해당 ID의 강의를 찾을 수 없음"));
//        lectureReview.setLecture(lecture);
		lectureReviewRepository.save(lectureReview);
		return new BaseResponse<>(
				ResultCode.SUCCESS.name(),
				null,
				"후기가 작성되었습니다.");
	}
	//후기 불러오기
	@Override
	public BaseResponse<List<LectureReview>> getAllReview() {
		List<LectureReview> lectureReviews = lectureReviewRepository.findAll();
		if(lectureReviews.isEmpty()) {
			throw new InvalidRequestException("Review Empty", "존재하지 않는 후기입니다.");
		}
		return new BaseResponse<>(
				ResultCode.SUCCESS.name(),
				lectureReviews,
				ResultCode.SUCCESS.getMsg());
	}
	//후기 삭제
	@Override
	public BaseResponse<Long> deleteReview(Long id) {
		Optional<LectureReview> lectureReview = lectureReviewRepository.findById(id);
		if(lectureReview.isEmpty()) {
			throw new InvalidRequestException(Long.toString(id),"후기가 존재하지 않습니다.");
		}
		lectureReviewRepository.deleteById(id);
		return new BaseResponse<>(
				ResultCode.SUCCESS.name(),
				id,
				"후기가 삭제되었습니다.");
	}

	@Override
	public LectureReview getReviewById(long id) {
		return lectureReviewRepository.findById(id)
				.orElseThrow(() -> new InvalidRequestException(String.valueOf(id), "해당 ID는 존재하지않습니다."));
	}

}