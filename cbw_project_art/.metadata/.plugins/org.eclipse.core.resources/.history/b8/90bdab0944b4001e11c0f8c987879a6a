package com.cbw.art.service;

import java.util.List;

import com.cbw.art.dto.BaseResponse;
import com.cbw.art.dto.ReviewDto;
import com.cbw.art.model.Review;


public interface ReviewService {
	//후기작성
	public BaseResponse<Void> createReview(ReviewDto reviewDto);
	//후기목록
	public BaseResponse<List<Review>> getAllReview();
	//후기삭제
	public BaseResponse<Long> deleteReview(Long id);
}
