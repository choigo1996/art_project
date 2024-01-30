package com.cbw.art.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.cbw.art.dto.BaseResponse;
import com.cbw.art.dto.ReviewDto;
import com.cbw.art.enumstatus.ResultCode;
import com.cbw.art.exception.InvalidRequestException;
import com.cbw.art.model.Lecture;
import com.cbw.art.model.Review;
import com.cbw.art.model.User;
import com.cbw.art.repository.LectureRepository;
import com.cbw.art.repository.ReviewRepository;
import com.cbw.art.repository.UserRepository;
import com.cbw.art.service.ReviewService;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class ReviewServiceImpl implements ReviewService{
	
	private final ReviewRepository reviewRepository;
	private final LectureRepository lectureRepository;
	private final UserRepository userRepository;
	
	@Autowired
	public ReviewServiceImpl(ReviewRepository reviewRepository, LectureRepository lectureRepository,
			UserRepository userRepository) {
		super();
		this.reviewRepository = reviewRepository;
		this.lectureRepository = lectureRepository;
		this.userRepository = userRepository;
	}

	//후기작성
	public BaseResponse<Void> createReview(Authentication authentication, ReviewDto reviewDto) {
		//사용자 정보가 null이거나 인증되지 않은 경우 예외처리
		if(authentication == null||!authentication.isAuthenticated()) {
			throw new InvalidRequestException("Invalid Authentication", "인증되지 않은 사용자");
		}
		//사용자 정보 가져오기
		String loginId = authentication.getName();
		Optional<User> user = userRepository.findOneWithAuthoritiesByLoginId(loginId);
		if(!user.isPresent()) {
			throw new InvalidRequestException("Invalid Writer", "글쓰기 권한이 없습니다.");
		}
		//강의 정보가져오기
		Optional<Lecture> lecture = lectureRepository.findById(reviewDto.getLectureId());
		if(lecture == null) {
			throw new InvalidRequestException("Invalid lecture", "존재하지 않는 강의입니다.");
		}
		//중복 후기 체크
		if(reviewRepository.existsByUserAndLectureId(user.get(),reviewDto.getLectureId())) {
			throw new InvalidRequestException("Duplicate Review", "이미 해당 강의에 후기를 작성했습니다.");
		}
		Review review = new Review();
		review.setCreateAt(LocalDateTime.now());
		review.setRating(reviewDto.getRating());
		review.setText(reviewDto.getText());
		
		review.setUser(user.get());
		review.setLecture(lecture.get());
		reviewRepository.save(review);
		
		return new BaseResponse<>(
				ResultCode.SUCCESS.name(),
				null,
				"후기를 작성했습니다.");
	}
	
	//후기목록
	
	public BaseResponse<List<Review>> getAllReview() {
		List<Review> reviews = reviewRepository.findAll();
		if(reviews.isEmpty()) {
			throw new InvalidRequestException("Not Found", "등록되어있는 후기가 없음");
		}
		return new BaseResponse<>(
				ResultCode.SUCCESS.name(),
				reviews,
				ResultCode.SUCCESS.getMsg());
	}
	//후기삭제
	public BaseResponse<Long> deleteReview(Long id) {
		Review review = reviewRepository.findById(id)
				.orElseThrow(() -> new InvalidRequestException("Invalid Review", "존재하지 않는 후기입니다."));
		reviewRepository.deleteById(id);
		return new BaseResponse<>(
				ResultCode.SUCCESS.name(),
				id,
				"후기가 성공적으로 삭제되었습니다.");
	}


}
