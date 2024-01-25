package com.cbw.art.service.impl;

import java.time.LocalDateTime;
import java.util.List;

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

@Service
public class ReviewServiceImpl implements ReviewService{
	
	private ReviewRepository reviewRepository;
	private LectureRepository lectureRepository;
	private UserRepository userRepository;
	@Autowired
	public ReviewServiceImpl(ReviewRepository reviewRepository, LectureRepository lectureRepository,
			UserRepository userRepository) {
		super();
		this.reviewRepository = reviewRepository;
		this.lectureRepository = lectureRepository;
		this.userRepository = userRepository;
	}

	//후기작성
	@Override
	public BaseResponse<Void> createReview(Authentication authentication, ReviewDto reviewDto) {
		if(authentication == null||!authentication.isAuthenticated()) {
			throw new InvalidRequestException("Invalid Authentication", "인증되지않은 사용자입니다.");
		}
		User user = userRepository.findOneWithAuthoritiesByLoginId(authentication.getName())
				.orElseThrow(() -> new InvalidRequestException("Invalid User", "존재하지 않는 사용자입니다."));
		if (reviewRepository.existsByUserAndLecture(user, lectureRepository.findById(reviewDto.getLecture())
		        .orElseThrow(() -> new InvalidRequestException("Invalid Lecture", "존재하지 않는 강의입니다.")))) {
		    throw new InvalidRequestException("Duplicate Review", "이미 후기를 작성했습니다.");
		}
		Lecture lecture = lectureRepository.findById(reviewDto.getLecture())
				.orElseThrow(() -> new InvalidRequestException("Invalid Lecture","존재하지 않는 강의입니다."));
		Review review = new Review();
		review.setText(reviewDto.getText());
		review.setRating(reviewDto.getRating());
		review.setCreateAt(LocalDateTime.now());
		
		review.setLecture(lecture);
		review.setUser(user);
		reviewRepository.save(review);
		
		return new BaseResponse<>(
				ResultCode.SUCCESS.name(),
				null,
				"후기를 작성했습니다.");
	}
	
	//후기목록
	@Override
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
	@Override
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
